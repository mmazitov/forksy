'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	if (typeof window === 'undefined') {
		return null;
	}

	return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
