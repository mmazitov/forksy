import { createContext } from 'react';

export interface User {
	id: string;
	email?: string | null;
	name?: string | null;
	avatar?: string | null;
	role?: string | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (token: string, user: Omit<User, '__typename'>) => void;
	logout: () => void;
	isLoading: boolean;
	isAuthenticated: boolean;
	isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
