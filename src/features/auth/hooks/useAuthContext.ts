import { useCallback, useContext } from 'react';

import { AuthContext } from '@/features/auth/model/AuthContext';

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuthContext must be used within AuthProvider');
	}

	const isLoggedIn = !!context.user;
	const userName =
		context.user?.name || context.user?.email?.split('@')[0] || '';
	const handleLogout = useCallback(() => context.logout(), [context.logout]);

	return {
		...context,
		isLoggedIn,
		userName,
		handleLogout,
	};
};
