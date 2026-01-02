import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isInitialized, setIsInitialized] = useState(false);
	const authState = useAuth();

	// Initialize on client side only
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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
