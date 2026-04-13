/**
 * Refreshes the access token by calling the backend /auth/refresh endpoint.
 * The refreshToken cookie is automatically sent by the browser (path: /auth/refresh).
 * Returns true if refresh succeeded, false otherwise.
 */
export const refreshAccessToken = async (): Promise<boolean> => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';
		const baseUrl = apiUrl.replace('/graphql', '');
		
		const response = await fetch(`${baseUrl}/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			if (import.meta.env.DEV) {
				console.warn('[Token Refresh] Failed:', response.status);
			}
			return false;
		}

		const data = await response.json();
		
		if (import.meta.env.DEV) {
			console.log('[Token Refresh] Success:', data);
		}

		return true;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error('[Token Refresh] Error:', error);
		}
		return false;
	}
};
