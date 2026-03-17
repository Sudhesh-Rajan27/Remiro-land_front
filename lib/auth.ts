import { useEffect, useState } from 'react';
import { fetchWithAuth, getBackendUrl } from './api';

const STORAGE_TOKEN = 'remiro_token';

/**
 * Requests the logged-in user's display name from the backend.
 * Backend endpoint: GET /api/user/name
 * - Only fetches when a token exists, so the home page can render for guests without a 401 redirect.
 * - If token is invalid/expired, fetchWithAuth handles 401 (clears and redirects).
 */
export function useAuthUser() {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN);
    if (!token) {
      return; // Guest: don't call API, avoid 401 and redirect; name stays null
    }

    let cancelled = false;

    async function loadName() {
      try {
        const res = await fetchWithAuth(`${getBackendUrl()}/api/user/name`);
        if (!res.ok) return;
        const data = (await res.json()) as { name?: string };
        if (cancelled) return;
        setName(data.name ?? null);
      } catch {
        // 401 is handled inside fetchWithAuth (clear + redirect)
      }
    }

    loadName();

    return () => {
      cancelled = true;
    };
  }, []);

  return { name };
}

