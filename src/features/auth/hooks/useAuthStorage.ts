import { useCallback } from 'react';

export const useAuthStorage = () => {
	const getStorage = useCallback((key: string) => {
		if (typeof window === 'undefined') return null;
		return (
			window.localStorage.getItem(key) || window.sessionStorage.getItem(key)
		);
	}, []);

	const setStorageItem = useCallback(
		(key: string, value: string, rememberMe: boolean) => {
			if (typeof window === 'undefined') return;
			if (rememberMe) {
				window.localStorage.setItem(key, value);
				window.sessionStorage.removeItem(key);
			} else {
				window.sessionStorage.setItem(key, value);
				window.localStorage.removeItem(key);
			}
		},
		[],
	);

	const removeStorageItem = useCallback((key: string) => {
		if (typeof window === 'undefined') return;
		window.localStorage.removeItem(key);
		window.sessionStorage.removeItem(key);
	}, []);

	return { getStorage, setStorageItem, removeStorageItem };
};
