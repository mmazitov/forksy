'use client';

import { ReactNode } from 'react';

import ReduxProvider from './ReduxProvider';
import SessionProvider from './SessionProvider';

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	if (typeof window === 'undefined') {
		return null;
	}

	return (
		<SessionProvider>
			<ReduxProvider>{children}</ReduxProvider>
		</SessionProvider>
	);
};

export default Providers;
