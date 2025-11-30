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

	useEffect(() => {
		if (!token) {
			setIsLoading(false);
			setUser(null);
			return;
		}

		if (meLoading) {
			setIsLoading(true);
			return;
		}

		if (error) {
			setIsLoading(false);
			return;
		}

		if (data?.me) {
			const { __typename, ...userData } = data.me;
			setUser(userData as User);
			setIsLoading(false);
			setShouldRefetch(false);
		} else {
			if (!shouldRefetch) {
				logout();
			}
		}
	}, [meLoading, data, token, logout, shouldRefetch, error]);

	useEffect(() => {
		if (token && refetch) {
			setShouldRefetch(true);
			refetch();
		}
	}, [token, refetch]);

	const login = useCallback(
		(newToken: string, newUser: Omit<User, '__typename'>) => {
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
