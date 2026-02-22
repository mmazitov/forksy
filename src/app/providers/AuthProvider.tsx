import { AuthContext } from './AuthContext';

import { useAuthState } from '@/features/auth/hooks/useAuthState';

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const authState = useAuthState();

	if (authState.isLoading) {
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
