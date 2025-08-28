export default async function fetchURL(
  url,
  method,
  headers = {},
  data = {},
  options = {}
) {
  const { timeout = null } = options;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const finalHeaders = { ...defaultHeaders, ...headers };

  // Configure fetch options
  const fetchOptions = {
    method: method.toUpperCase(),
    headers: finalHeaders,
    ...options,
  };

  // Handle GET requests (append query parameters to URL)
  if (fetchOptions.method === "GET") {
    const params = new URLSearchParams(data);
    url = `${url}?${params.toString()}`;
  } else {
    fetchOptions.body = JSON.stringify(data);
  }

  // Add timeout support (if provided)
  const controller = timeout ? new AbortController() : null;
  const timeoutId = timeout
    ? setTimeout(() => controller.abort(), timeout)
    : null;
  if (controller) fetchOptions.signal = controller.signal;

  const response = await fetch(url, fetchOptions);
  if (timeoutId) clearTimeout(timeoutId);

  // Check if the response was successful
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errors = errorData?.errors || [errorData?.message || "Unknown error"];
    return {
      response: null,
      code: response.status,
      errors,
    };
  }

  const responseData = await response.json();
  return {
    response: responseData,
    code: response.status,
    errors: [],
  };
}
