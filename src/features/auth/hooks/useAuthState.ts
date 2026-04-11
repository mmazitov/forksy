import { useCallback, useEffect, useState } from 'react';

import { User } from '@/features/auth/model/AuthContext';
import { setUnauthenticatedHandler } from '@/shared/api/apollo';

const getApiUrl = () => {
	return (
		import.meta.env.VITE_API_URL?.replace('/graphql', '') ||
		'http://localhost:4000'
	);
};

export const useAuthState = () => {
	const [user, setUserState] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const logout = useCallback(() => {
		const apiUrl = getApiUrl();
		fetch(`${apiUrl}/graphql`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: JSON.stringify({
				query: 'mutation { logout }',
			}),
		})
			.catch(() => {
				// Ignore errors
			})
			.finally(() => {
				setUserState(null);
				window.localStorage.removeItem('user');
			});
	}, []);

	useEffect(() => {
		setUnauthenticatedHandler(logout);
		return () => setUnauthenticatedHandler(null);
	}, [logout]);

	const login = useCallback((newUser: Omit<User, '__typename'>) => {
		setUserState(newUser as User);
		window.localStorage.setItem('user', JSON.stringify(newUser));
	}, []);

	useEffect(() => {
		const storedUserStr = window.localStorage.getItem('user');

		if (storedUserStr) {
			try {
				const apiUrl = getApiUrl();
				fetch(`${apiUrl}/auth/refresh`, {
					method: 'POST',
					credentials: 'include',
				})
					.then((res) => {
						if (res.ok) {
							setUserState(JSON.parse(storedUserStr));
						} else {
							logout();
						}
					})
					.catch(() => {
						logout();
					})
					.finally(() => setIsLoading(false));
				return;
			} catch {
				logout();
			}
		}
		setIsLoading(false);
	}, [login, logout]);

	const isAuthenticated = !!user;
	const isAdmin = user?.role === 'ADMIN';

	return {
		user,
		login,
		logout,
		isLoading,
		isAuthenticated,
		isAdmin,
	};
};
