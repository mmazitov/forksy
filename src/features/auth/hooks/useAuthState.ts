import { useCallback, useEffect } from 'react';

import { client, setUnauthenticatedHandler } from '@/shared/api/apollo';
import { useLogoutMutation, useMeQuery } from '@/shared/api/graphql';

export const useAuthState = () => {
	const { data, loading, refetch } = useMeQuery({
		fetchPolicy: 'network-only',
		errorPolicy: 'all',
	});
	const [logoutMutation] = useLogoutMutation();

	const user = data?.me ?? null;
	const isAuthenticated = !!user;
	const isAdmin = user?.role === 'ADMIN';

	const logout = useCallback(async () => {
		try {
			await logoutMutation();
		} catch {
			// Logout is safe even on error — clear client state anyway
		} finally {
			await client.clearStore();
		}
	}, [logoutMutation]);

	useEffect(() => {
		if (isAuthenticated) {
			setUnauthenticatedHandler(logout);
			return () => setUnauthenticatedHandler(null);
		}
	}, [isAuthenticated, logout]);

	const login = useCallback(async () => {
		await refetch();
	}, [refetch]);

	return {
		user,
		login,
		logout,
		isLoading: loading,
		isAuthenticated,
		isAdmin,
	};
};
