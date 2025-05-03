'use client';

import { ReactNode } from 'react';

import ReduxProvider from '@/lib/providers/ReduxProvider';

interface ProvidersProps {
	children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	if (typeof window === 'undefined') {
		return null;
	}

	return <ReduxProvider>{children}</ReduxProvider>;
};

export default Providers;
