import { useMeQuery } from '@/lib/graphql/auth.gen';
import { createContext, useContext, useEffect, useState } from 'react';
import { client } from '../apollo';

interface User {
	id: string;
	email: string;
	name?: string | null;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (token: string, user: Omit<User, '__typename'>) => void;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem('token'),
	);
	const [isLoading, setIsLoading] = useState(true);
	const { data, loading: meLoading } = useMeQuery({
		skip: !token,
		fetchPolicy: 'network-only',
	});

	useEffect(() => {
		if (!token) {
			setIsLoading(false);
			return;
		}

		if (!meLoading) {
			if (data?.me) {
				const { __typename, ...userData } = data.me;
				setUser(userData as User);
			} else {
				// Token invalid or expired
				logout();
			}
			setIsLoading(false);
		}
	}, [meLoading, data, token]);

	const login = (newToken: string, newUser: Omit<User, '__typename'>) => {
		localStorage.setItem('token', newToken);
		setToken(newToken);
		setUser(newUser);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
		client.resetStore();
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
