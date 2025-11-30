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
	const [token, setToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [shouldRefetch, setShouldRefetch] = useState(false);

	const {
		data,
		loading: meLoading,
		refetch,
		error,
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

	// Initialize token from localStorage only on client side
	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		if (savedToken) {
			console.log('[AuthContext] Initializing with saved token from localStorage');
			setToken(savedToken);
			setShouldRefetch(true);
		} else {
			console.log('[AuthContext] No saved token found');
			setIsLoading(false);
		}
	}, []);

	// Debug: Log when dependencies change
	useEffect(() => {
		console.log('[AuthContext] Dependencies changed:', {
			token: token ? 'EXISTS' : 'NULL',
			meLoading,
			hasData: !!data?.me,
			shouldRefetch,
			error: error?.message,
		});
	}, [token, meLoading, data, shouldRefetch, error]);

	useEffect(() => {
		if (!token) {
			console.log('[AuthContext] No token, setting isLoading to false');
			setIsLoading(false);
			setUser(null);
			return;
		}

		if (meLoading) {
			console.log('[AuthContext] Me query is loading');
			setIsLoading(true);
			return;
		}

		if (error) {
			console.error('[AuthContext] Me query error:', error.message);
			setIsLoading(false);
			return;
		}

		if (data?.me) {
			console.log('[AuthContext] User data received:', data.me.email);
			const { __typename, ...userData } = data.me;
			setUser(userData as User);
			setIsLoading(false);
			setShouldRefetch(false);
		} else {
			if (!shouldRefetch) {
				console.warn('[AuthContext] No user data and not refetching, logging out');
				logout();
			} else {
				console.log('[AuthContext] Waiting for refetch...');
			}
		}
	}, [meLoading, data, token, logout, shouldRefetch, error]);

	useEffect(() => {
		if (token && refetch && shouldRefetch) {
			console.log('[AuthContext] Refetching me query after token change');
			refetch();
		}
	}, [token, refetch, shouldRefetch]);

	const login = useCallback(
		(newToken: string, newUser: Omit<User, '__typename'>) => {
			console.log('[AuthContext] login() called with:', { token: newToken.substring(0, 20) + '...', email: newUser.email });
			
			localStorage.setItem('token', newToken);
			console.log('[AuthContext] Token written to localStorage, verify:', localStorage.getItem('token')?.substring(0, 20) + '...');

			setUser(newUser as User);
			console.log('[AuthContext] User state set to:', newUser.email);

			setToken(newToken);
			console.log('[AuthContext] Token state set');

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
			console.log('[AuthContext] Apollo cache updated');
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
