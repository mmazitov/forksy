import { useCallback, useEffect, useMemo, useState } from 'react';

import { client } from '@/lib/apollo';
import { useMeQuery } from '@/lib/graphql';
import { type User } from '@/lib/providers/AuthContext';

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const {
		data,
		loading: meLoading,
		refetch,
		error,
	} = useMeQuery({
		skip: !token,
		fetchPolicy: 'cache-first',
		notifyOnNetworkStatusChange: true,
		context: {
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		},
	});

	const logout = useCallback(async () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);

		try {
			await client.clearStore();
			if (typeof window !== 'undefined' && window.localStorage) {
				Object.keys(localStorage).forEach((key) => {
					if (key.startsWith('apollo-cache-persist')) {
						localStorage.removeItem(key);
					}
				});
			}
		} catch (error) {
			console.error('Error clearing cache:', error);
		}
	}, []);

	const login = useCallback(
		async (newToken: string, newUser: Omit<User, '__typename'>) => {
			localStorage.setItem('token', newToken);
			setUser(newUser as User);
			setToken(newToken);

			try {
				await client.refetchQueries({
					include: ['FavoriteProducts', 'FavoriteDishes', 'Me'],
				});
			} catch (error) {
				console.error('Error refetching queries after login:', error);
			}
		},
		[],
	);

	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		if (savedToken) {
			setToken(savedToken);
			setShouldRefetch(true);
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (!token) {
			setIsLoading(false);
			setUser(null);
			return;
		}

		if (meLoading) {
			setIsLoading(true);
			return;
		}

		if (error) {
			console.error('Me query error:', error.message);
			setIsLoading(false);
			return;
		}

		if (data?.me) {
			const { __typename, ...userData } = data.me;
			setUser(userData as User);
			setIsLoading(false);
			setShouldRefetch(false);
		} else {
			if (!shouldRefetch) {
				logout();
			}
		}
	}, [meLoading, data, token, logout, shouldRefetch, error]);

	useEffect(() => {
		if (token && refetch && shouldRefetch) {
			refetch();
		}
	}, [token, refetch, shouldRefetch]);

	const isAuthenticated = !!token && !!user;
	const isAdmin = user?.role === 'admin';
	const isLoggedIn = !!user;
	const userName = user?.name || user?.email?.split('@')[0] || '';

	const handleLogout = useCallback(() => {
		logout();
	}, [logout]);

	return useMemo(
		() => ({
			user,
			token,
			login,
			logout,
			isLoading,
			isAuthenticated,
			isAdmin,
			isLoggedIn,
			userName,
			handleLogout,
		}),
		[
			user,
			token,
			login,
			logout,
			isLoading,
			isAuthenticated,
			isAdmin,
			isLoggedIn,
			userName,
			handleLogout,
		],
	);
};
