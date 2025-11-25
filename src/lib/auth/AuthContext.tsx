import { gql } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { client } from '../apollo';

interface User {
	id: string;
	email: string;
	name?: string;
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (token: string, user: User) => void;
	logout: () => void;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ME_QUERY = gql`
	query Me {
		me {
			id
			email
			name
		}
	}
`;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(
		localStorage.getItem('token'),
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			const storedToken = localStorage.getItem('token');
			if (storedToken) {
				try {
					const { data } = await client.query<any>({
						query: ME_QUERY,
						fetchPolicy: 'network-only',
					});
					if (data.me) {
						setUser(data.me);
					} else {
						// Token invalid or expired
						logout();
					}
				} catch (error) {
					console.error('Failed to fetch user', error);
					logout();
				}
			}
			setIsLoading(false);
		};

		initAuth();
	}, []);

	const login = (newToken: string, newUser: User) => {
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
