'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const withAuthClient = <T extends object>(
	Component: React.ComponentType<T>,
): React.FC<T> => {
	const AuthProtectedComponent: React.FC<T> = (props) => {
		const { status } = useSession({
			required: true,
			onUnauthenticated() {
				redirect('/');
			},
		});

		if (status === 'loading') {
			return <div>Loading...</div>;
		}

		return <Component {...props} />;
	};

	AuthProtectedComponent.displayName = `withAuthClient(${Component.displayName || Component.name || 'Component'})`;

	return AuthProtectedComponent;
};

export default withAuthClient;
