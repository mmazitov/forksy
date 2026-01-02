import { client } from '@/lib/apollo';
import { useMeQuery } from '@/lib/graphql';
import {
	AuthContext,
	type AuthContextType,
	type User,
} from '@/lib/providers/AuthContext';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface UseAuthReturn extends AuthContextType {
	isLoggedIn: boolean;
	userName: string;
	handleLogout: () => void;
}

export const useAuth = (): UseAuthReturn => {
	const contextValue = useContext(AuthContext);

	if (contextValue !== undefined) {
		const isLoggedIn = !!contextValue.user;
		const userName =
			contextValue.user?.name || contextValue.user?.email?.split('@')[0] || '';
		const handleLogout = () => contextValue.logout();

		return {
			...contextValue,
			isLoggedIn,
			userName,
			handleLogout,
		};
	}

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
		fetchPolicy: 'network-only',
		context: {
			headers: {
				authorization: token ? `Bearer ${token}` : '',
			},
		},
	});

	const logout = useCallback(() => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
		client.clearStore();
	}, []);

	const login = useCallback(
		(newToken: string, newUser: Omit<User, '__typename'>) => {
			localStorage.setItem('token', newToken);
			setUser(newUser as User);
			setToken(newToken);

			client.cache.modify({
				fields: {
					me(existing) {
						return {
							...newUser,
							__typename: 'User',
						};
					},
				},
			});
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
