import { Buffer } from "node:buffer";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { executeGraphQL, refreshAccessToken } from "./graphql";

/** Serialize concurrent refresh mutations for the same refresh token string. */
const refreshInFlight = new Map();

function scheduleRefreshBackendTokens(refreshToken) {
  if (!refreshToken) return Promise.reject(new Error("Missing refresh token"));
  const pending = refreshInFlight.get(refreshToken);
  if (pending) return pending;
  const started = refreshAccessToken(refreshToken).finally(() => {
    refreshInFlight.delete(refreshToken);
  });
  refreshInFlight.set(refreshToken, started);
  return started;
}

function getJwtExpiryMs(accessToken) {
  if (!accessToken || typeof accessToken !== "string") {
    return Date.now() + 3_600_000;
  }
  const [, payloadSegment] = accessToken.split(".");
  if (!payloadSegment) return Date.now() + 3_600_000;
  try {
    const payload = JSON.parse(
      Buffer.from(payloadSegment, "base64url").toString("utf8")
    );
    return typeof payload.exp === "number"
      ? payload.exp * 1000
      : Date.now() + 3_600_000;
  } catch {
    return Date.now() + 3_600_000;
  }
}

/** Build canonical site origin for post-OAuth redirects (signIn returning a URL string). */
function getAuthDeploymentOrigin() {
  const explicit = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  if (explicit?.trim()) return explicit.trim().replace(/\/$/, "");
  const vercelHost = process.env.VERCEL_URL?.trim();
  if (vercelHost)
    return `https://${vercelHost.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  return "";
}

const GOOGLE_ERRORS = Object.freeze({
  verify: "google_verify",
  tokenMissing: "google_no_id_token",
  backend: "google_backend",
});

const authConfig = {
  // Vercel / Auth.js: set AUTH_SECRET (preferred) or NEXTAUTH_SECRET — same value locally and in prod.
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  // Required on Vercel (and other hosts behind a proxy) so the OAuth redirect URL
  // matches your public site URL instead of an internal host.
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const data = await executeGraphQL({
            query: `
              mutation Login($loginInput: LoginDto!) {
                login(loginInput: $loginInput) {
                  accessToken
                  refreshToken
                  user {
                    id
                    fullName
                    email
                    role
                    avatar
                    nationalID
                    nationality
                    createdAt
                  }
                }
              }
            `,
            variables: {
              loginInput: {
                email: credentials.email,
                password: credentials.password,
              },
            },
          });

          if (data?.login?.user) {
            return {
              id: data.login.user.id,
              name: data.login.user.fullName,
              email: data.login.user.email,
              image: data.login.user.avatar,
              role: data.login.user.role,
              nationality: data.login.user.nationality,
              nationalID: data.login.user.nationalID,
              accessToken: data.login.accessToken,
              refreshToken: data.login.refreshToken,
            };
          }

          return null;
        } catch {
          // Returning null avoids CallbackRouteError and maps to invalid credentials.
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    /**
     * Per integration guide: send `account.id_token` to `googleLogin` here (not only in jwt).
     * Mutate `user` with API tokens + profile so the first `jwt` call can persist them.
     */
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      const idToken = account.id_token;
      if (!idToken) {
        console.error(
          "[auth] Google signIn missing id_token; account keys:",
          account ? Object.keys(account) : []
        );
        const base = getAuthDeploymentOrigin();
        return base ? `${base}/login?error=${GOOGLE_ERRORS.tokenMissing}` : false;
      }

      try {
        const data = await executeGraphQL({
          query: `
            mutation GoogleLogin($googleTokenInput: GoogleTokenDto!) {
              googleLogin(googleTokenInput: $googleTokenInput) {
                accessToken
                refreshToken
                user {
                  id
                  fullName
                  email
                  role
                  avatar
                  nationalID
                  nationality
                  createdAt
                }
              }
            }
          `,
          variables: {
            googleTokenInput: { token: idToken },
          },
        });

        const bu = data.googleLogin.user;
        user.id = String(bu.id);
        user.name = bu.fullName ?? user.name;
        user.email = bu.email ?? user.email;
        user.image = bu.avatar ?? user.image;
        user.role = bu.role;
        user.nationality = bu.nationality ?? "";
        user.nationalID = bu.nationalID ?? "";
        user.accessToken = data.googleLogin.accessToken;
        user.refreshToken = data.googleLogin.refreshToken;
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Google backend login failed";
        console.error("[auth] googleLogin (signIn) failed:", message);
        const base = getAuthDeploymentOrigin();
        if (!base) return false;

        const code = message.includes("verification failed")
          ? GOOGLE_ERRORS.verify
          : GOOGLE_ERRORS.backend;
        return `${base}/login?error=${encodeURIComponent(code)}`;
      }
    },
    async jwt({ token, account, trigger, session, user }) {
      if (account?.provider === "google" && user) {
        token.backendAccessToken = user.accessToken;
        token.backendRefreshToken = user.refreshToken;
        token.accessTokenExpires = getJwtExpiryMs(user.accessToken);
        token.backendUser = {
          id: user.id,
          fullName: user.name,
          email: user.email,
          role: user.role,
          avatar: user.image,
          nationality: user.nationality ?? "",
          nationalID: user.nationalID ?? "",
        };
      }

      if (account?.provider === "credentials" && user) {
        token.backendAccessToken = user.accessToken;
        token.backendRefreshToken = user.refreshToken;
        token.accessTokenExpires = getJwtExpiryMs(user.accessToken);
        token.backendUser = {
          id: user.id,
          fullName: user.name,
          email: user.email,
          role: user.role,
          avatar: user.image,
          nationality: user.nationality || "",
          nationalID: user.nationalID || "",
        };
      }

      if (trigger === "update" && session?.user) {
        token.backendUser = {
          ...token.backendUser,
          id: session.user.id ?? token.backendUser?.id,
          fullName: session.user.name ?? token.backendUser?.fullName,
          email: session.user.email ?? token.backendUser?.email,
          role: session.user.role ?? token.backendUser?.role,
          avatar: session.user.image ?? token.backendUser?.avatar,
          nationality:
            session.user.nationality ?? token.backendUser?.nationality ?? "",
          nationalID:
            session.user.nationalID ?? token.backendUser?.nationalID ?? "",
        };
      }

      if (
        token.backendAccessToken &&
        token.backendRefreshToken &&
        token.accessTokenExpires == null &&
        !account
      ) {
        token.accessTokenExpires = getJwtExpiryMs(token.backendAccessToken);
      }

      if (
        !account &&
        token.backendRefreshToken &&
        token.backendAccessToken &&
        token.accessTokenExpires != null
      ) {
        const expiresMs = Number(token.accessTokenExpires);
        if (
          Number.isFinite(expiresMs) &&
          Date.now() >= expiresMs - 60_000
        ) {
          try {
            const data = await scheduleRefreshBackendTokens(
              token.backendRefreshToken
            );
            token.backendAccessToken = data.accessToken;
            if (data.refreshToken) token.backendRefreshToken = data.refreshToken;
            token.accessTokenExpires = getJwtExpiryMs(data.accessToken);
            delete token.error;
            if (data.user && token.backendUser) {
              token.backendUser = {
                ...token.backendUser,
                id: String(data.user.id ?? token.backendUser.id ?? ""),
                email: data.user.email ?? token.backendUser.email,
                role: data.user.role ?? token.backendUser.role,
              };
            }
          } catch (err) {
            console.error("[auth] refreshToken failed:", err);
            token.error = "RefreshAccessTokenError";
            delete token.backendAccessToken;
            delete token.backendRefreshToken;
            delete token.accessTokenExpires;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      const backendUser = token.backendUser || {};
      session.user.id = backendUser.id;
      session.user.name = backendUser.fullName || session.user.name;
      session.user.email = backendUser.email || session.user.email;
      session.user.image = backendUser.avatar || session.user.image;
      session.user.role = backendUser.role;
      session.user.nationality = backendUser.nationality || "";
      session.user.nationalID = backendUser.nationalID || "";
      session.accessToken = token.backendAccessToken;
      session.refreshToken = token.backendRefreshToken;
      if (token.error) session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  unstable_update,
  handlers: { GET, POST },
} = NextAuth(authConfig);
