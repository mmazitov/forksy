import { useEffect, useState } from 'react';

import { User } from '@/app/providers/AuthContext';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export const useAuthState = () => {
	const [token, setToken] = useLocalStorage<string | null>('token', null);
	const [user, setUser] = useLocalStorage<User | null>('user', null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		// Simulate loading check or token validation if needed
		setIsLoading(false);
	}, []);

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
