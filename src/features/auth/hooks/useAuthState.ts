import { jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';

import { useAuthStorage } from './useAuthStorage';

import { User } from '@/app/providers/AuthContext';
import { useRefreshTokenMutation } from '@/shared/api/graphql';

interface JwtPayload {
	exp: number;
	userId: string;
}

export const useAuthState = () => {
	const [token, setTokenState] = useState<string | null>(null);
	const [user, setUserState] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [refreshMutation] = useRefreshTokenMutation();
	const { getStorage, setStorageItem, removeStorageItem } = useAuthStorage();

	const logout = useCallback(() => {
		setTokenState(null);
		setUserState(null);
		removeStorageItem('token');
		removeStorageItem('refreshToken');
		removeStorageItem('user');
	}, [removeStorageItem]);

	const login = useCallback(
		(
			newToken: string,
			newRefreshToken: string,
			newUser: Omit<User, '__typename'>,
			rememberMe: boolean,
		) => {
			setTokenState(newToken);
			setUserState(newUser as User);
			setStorageItem('token', newToken, rememberMe);
			setStorageItem('refreshToken', newRefreshToken, rememberMe);
			setStorageItem('user', JSON.stringify(newUser), rememberMe);
		},
		[setStorageItem],
	);

	useEffect(() => {
		const storedToken = getStorage('token');
		const storedRefreshToken = getStorage('refreshToken');
		const storedUserStr = getStorage('user');

		if (storedToken && storedUserStr) {
			try {
				const decoded = jwtDecode<JwtPayload>(storedToken);
				const isExpired = decoded.exp * 1000 < Date.now();

				if (isExpired && storedRefreshToken) {
					refreshMutation({ variables: { token: storedRefreshToken } })
						.then((result) => {
							if (result.data?.refreshToken) {
								const {
									token: newToken,
									refreshToken: newRefreshToken,
									user: newUser,
								} = result.data.refreshToken;
								const rememberMe =
									window.localStorage.getItem('token') !== null;
								login(newToken, newRefreshToken, newUser, rememberMe);
							} else {
								logout();
							}
						})
						.catch(() => logout())
						.finally(() => setIsLoading(false));
					return;
				} else if (!isExpired) {
					setTokenState(storedToken);
					setUserState(JSON.parse(storedUserStr));
				} else {
					logout();
				}
			} catch {
				logout();
			}
		}
		setIsLoading(false);
	}, [login, logout, refreshMutation, getStorage]);

	const isAuthenticated = !!token && !!user;
	const isAdmin = user?.role === 'admin';

	return {
		user,
		token,
		login,
		logout,
		isLoading,
		isAuthenticated,
		isAdmin,
	};
};
