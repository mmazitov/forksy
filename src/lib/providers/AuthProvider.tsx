import { useEffect, useState } from 'react';

import { AuthContext } from './AuthContext';

import { useAuth } from '@/hooks/useAuth';

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isInitialized, setIsInitialized] = useState(false);
	const authState = useAuth();

	useEffect(() => {
		setIsInitialized(true);
	}, []);

	if (!isInitialized) {
		return null;
	}

	return (
		<AuthContext.Provider
			value={{
				user: authState.user,
				token: authState.token,
				login: authState.login,
				logout: authState.logout,
				isLoading: authState.isLoading,
				isAuthenticated: authState.isAuthenticated,
				isAdmin: authState.isAdmin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
