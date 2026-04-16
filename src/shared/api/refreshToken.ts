const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL?.replace('/graphql', '') ||
  'http://localhost:4000';

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (import.meta.env.DEV) console.warn('[Token Refresh] Failed:', response.status);
      return false;
    }

    if (import.meta.env.DEV) console.log('[Token Refresh] Success');
    return true;
  } catch (error) {
    if (import.meta.env.DEV) console.error('[Token Refresh] Error:', error);
    return false;
  }
};
