const API_BASE = "/api";
const TOKEN_KEY = "ideaforge-token";

/**
 * Get the stored JWT token.
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Store a JWT token.
 */
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove the stored JWT token.
 */
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Centralized fetch wrapper that attaches the JWT token and handles errors.
 */
export async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 — token expired or invalid
  if (response.status === 401) {
    clearToken();
    // Don't redirect here — let the context handle it
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || data.message || "Something went wrong.");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ── Convenience methods ───────────────────────────────────────────────────

export const api = {
  get: (endpoint) => apiFetch(endpoint),
  post: (endpoint, body) =>
    apiFetch(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    apiFetch(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  patch: (endpoint, body) =>
    apiFetch(endpoint, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (endpoint) => apiFetch(endpoint, { method: "DELETE" }),
};
