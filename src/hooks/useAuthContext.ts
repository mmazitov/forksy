import { useContext } from 'react';

import { AuthContext } from '@/lib/providers/AuthContext';

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuthContext must be used within AuthProvider');
	}

	const isLoggedIn = !!context.user;
	const userName =
		context.user?.name || context.user?.email?.split('@')[0] || '';
	const handleLogout = () => context.logout();

	return {
		...context,
		isLoggedIn,
		userName,
		handleLogout,
	};
};
