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
	login: () => Promise<void>;
	logout: () => Promise<void>;
	isLoading: boolean;
	isAuthenticated: boolean;
	isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
