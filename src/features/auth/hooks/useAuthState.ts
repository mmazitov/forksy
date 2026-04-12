import { useCallback, useEffect } from 'react';

import { client, setUnauthenticatedHandler } from '@/shared/api/apollo';
import { useLogoutMutation, useMeQuery } from '@/shared/api/graphql';

export const useAuthState = () => {
	const { data, loading, refetch } = useMeQuery({
		fetchPolicy: 'cache-first',
		errorPolicy: 'ignore',
	});
	const [logoutMutation] = useLogoutMutation();

	const user = data?.me ?? null;

	const logout = useCallback(async () => {
		try {
			await logoutMutation();
		} catch {
			// Ignore errors
		} finally {
			await client.clearStore();
			await refetch();
		}
	}, [logoutMutation, refetch]);

	useEffect(() => {
		setUnauthenticatedHandler(logout);
		return () => setUnauthenticatedHandler(null);
	}, [logout]);

	const login = useCallback(async () => {
		if (import.meta.env.DEV) {
			console.log(
				'[useAuthState] login() called, clearing cache and refetching...',
			);
		}
		await client.refetchQueries({
			include: 'active',
		});
		const result = await refetch();
		if (import.meta.env.DEV) {
			console.log('[useAuthState] refetch result:', result);
		}
	}, [refetch]);

	const isAuthenticated = !!user;
	const isAdmin = user?.role === 'ADMIN';

	return {
		user,
		login,
		logout,
		isLoading: loading,
		isAuthenticated,
		isAdmin,
	};
};
