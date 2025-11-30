import { useMeQuery } from '@/lib/graphql/auth.gen';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
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
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const {
		data,
		loading: meLoading,
		refetch,
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

	useEffect(() => {
		console.log('[Auth] useEffect triggered:', {
			token: !!token,
			meLoading,
			data,
		});

		if (!token) {
			setIsLoading(false);
			setUser(null);
			return;
		}

		if (meLoading) {
			console.log('[Auth] Still loading, setting isLoading to true');
			setIsLoading(true);
			return;
		}

		if (data?.me) {
			const { __typename, ...userData } = data.me;
			console.log('[Auth] User data from query:', userData);
			setUser(userData as User);
			setIsLoading(false);
			setShouldRefetch(false);
		} else {
			console.log('[Auth] No data, shouldRefetch:', shouldRefetch);
			if (!shouldRefetch) {
				console.log('[Auth] No user data, logging out');
				logout();
			}
		}
	}, [meLoading, data, token, logout, shouldRefetch]);

	useEffect(() => {
		if (token && refetch) {
			console.log('[Auth] Refetching user data after token change');
			setShouldRefetch(true);
			refetch();
		}
	}, [token, refetch]);

	const login = useCallback(
		(newToken: string, newUser: Omit<User, '__typename'>) => {
			console.log('[Auth] Login called with user:', newUser);
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
