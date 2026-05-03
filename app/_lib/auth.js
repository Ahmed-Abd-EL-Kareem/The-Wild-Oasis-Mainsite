import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { executeGraphQL } from "./graphql";

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
        return false;
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
        return false;
      }
    },
    async jwt({ token, account, trigger, session, user }) {
      if (account?.provider === "google" && user) {
        token.backendAccessToken = user.accessToken;
        token.backendRefreshToken = user.refreshToken;
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
