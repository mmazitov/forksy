import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import { authOptions } from '@/lib/utils/authOptions';

const withAuth = <T extends object>(Component: React.ComponentType<T>) => {
	const AuthProtectedComponent = async (props: T) => {
		const session = await getServerSession(authOptions);

		if (!session) {
			redirect('/');
		}

		return <Component {...props} />;
	};

	AuthProtectedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

	return AuthProtectedComponent;
};

export default withAuth;
