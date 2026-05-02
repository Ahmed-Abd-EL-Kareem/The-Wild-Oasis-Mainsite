const RAW_API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://cabins-nest-js-back-end-production.up.railway.app/graphql";

const GRAPHQL_ENDPOINT = RAW_API_URL.endsWith("/graphql")
  ? RAW_API_URL
  : `${RAW_API_URL}/graphql`;

export async function executeGraphQL({ query, variables = {}, accessToken }) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
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
