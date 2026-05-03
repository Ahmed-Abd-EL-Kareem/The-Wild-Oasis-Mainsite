const RAW_API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.GRAPHQL_URL ||
  process.env.API_URL;

function getGraphqlEndpoint() {
  if (!RAW_API_URL) {
    throw new Error(
      "Missing API URL. Set NEXT_PUBLIC_GRAPHQL_URL or NEXT_PUBLIC_API_URL."
    );
  }

  return RAW_API_URL.endsWith("/graphql")
    ? RAW_API_URL
    : `${RAW_API_URL}/graphql`;
}

/** Exchange a refresh token for new pair; no Bearer header (per integration guide). */
export async function refreshAccessToken(refreshToken) {
  if (!refreshToken) throw new Error("Missing refresh token");

  const graphqlEndpoint = getGraphqlEndpoint();
  const response = await fetch(graphqlEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation RefreshToken($refreshTokenInput: RefreshTokenDto!) {
          refreshToken(refreshTokenInput: $refreshTokenInput) {
            accessToken
            refreshToken
            user {
              id
              email
              role
            }
          }
        }
      `,
      variables: { refreshTokenInput: { refreshToken } },
    }),
    cache: "no-store",
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const serverMessage =
      payload?.errors?.[0]?.message ||
      payload?.message ||
      `GraphQL request failed with status ${response.status}`;
    throw new Error(serverMessage);
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "Refresh token mutation failed");
  }

  const next = payload.data?.refreshToken;
  if (!next?.accessToken) {
    throw new Error("Refresh response missing accessToken");
  }
  return next;
}

export async function executeGraphQL({ query, variables = {}, accessToken }) {
  const graphqlEndpoint = getGraphqlEndpoint();
  const response = await fetch(graphqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const serverMessage =
      payload?.errors?.[0]?.message ||
      payload?.message ||
      `GraphQL request failed with status ${response.status}`;
    throw new Error(serverMessage);
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "GraphQL operation failed");
  }

  return payload.data;
}
