import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

import { User } from '@/app/providers/AuthContext';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

interface JwtPayload {
	exp: number;
	userId: string;
}

export const useAuthState = () => {
	const [token, setToken] = useLocalStorage<string | null>('token', null);
	const [user, setUser] = useLocalStorage<User | null>('user', null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (token) {
			try {
				const decoded = jwtDecode<JwtPayload>(token);
				const isExpired = decoded.exp * 1000 < Date.now();
				if (isExpired) {
					setToken(null);
					setUser(null);
				}
			} catch {
				setToken(null);
				setUser(null);
			}
		}
		setIsLoading(false);
	}, [token, setToken, setUser]);

	const login = (newToken: string, newUser: Omit<User, '__typename'>) => {
		setToken(newToken);
		setUser(newUser);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
	};

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
