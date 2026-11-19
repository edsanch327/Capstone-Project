const BASE = "/api";

/** Send a request to the salon backend. */
export async function api(path, options = {}) {
  const token = localStorage.getItem("salon_token");
  const response = await fetch(BASE + path, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Something went wrong.");
  return result;
}
