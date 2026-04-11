import { AuthContext } from '@/features/auth/model/AuthContext';
import { useAuthState } from '@/features/auth/hooks/useAuthState';
import { Loader } from '@/shared/components/loader';

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const authState = useAuthState();

	if (authState.isLoading) {
		return <Loader />;
	}

	return (
		<AuthContext.Provider
			value={{
				user: authState.user,
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
