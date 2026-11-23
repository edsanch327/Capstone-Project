//this function is a reusable helper for making API requests. it adds the same login token when available 
paresed the response to json and throws and error if the server reports a failure//
export async function request(path, options = {}) {
  const token = localStorage.getItem("beauty_calendar_token");
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || "Something went wrong. Please try again later.",
    );
  }

  return data;
}
