/**
 * Auth API helpers: authenticated fetch that clears session and redirects to login on 401.
 */

const STORAGE_TOKEN = 'remiro_token';
const STORAGE_USER = 'remiro_user';

export function getBackendUrl(): string {
  return import.meta.env.VITE_BACKEND_URL || 'https://remiro-land-back.onrender.com';
}

/**
 * Clears auth data from localStorage and redirects to login.
 * Call this on 401 or when the user logs out.
 */
export function clearSessionAndRedirectToLogin(): void {
  localStorage.removeItem(STORAGE_TOKEN);
  localStorage.removeItem(STORAGE_USER);
  // Full replace so app re-mounts and RequireAuth sees no token
  window.location.replace('/');
}

/**
 * Fetch with Bearer token. On 401 (e.g. expired JWT), clears storage and redirects to login.
 * Use for all authenticated API requests.
 */
export async function fetchWithAuth(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const token = localStorage.getItem(STORAGE_TOKEN);
  const headers = new Headers(init?.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    clearSessionAndRedirectToLogin();
    // Redirect is in progress; throw so callers don't use the response
    throw new Error('Session expired');
  }

  return response;
}
