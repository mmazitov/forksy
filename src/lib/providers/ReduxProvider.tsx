'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '@/lib/redux/store';

interface ReduxProviderProps {
	children: ReactNode;
}

const ReduxProvider = ({ children }: ReduxProviderProps) => {
	if (typeof window === 'undefined') {
		return null;
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default ReduxProvider;
