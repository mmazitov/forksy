import { useEffect, useState } from 'react';

export const useSplashScreen = () => {
	const [showSplash, setShowSplash] = useState(false);
	const [isPWA, setIsPWA] = useState(false);

	useEffect(() => {
		const checkIfPWA = () => {
			const isStandalone =
				window.matchMedia('(display-mode: standalone)').matches ||
				(window.navigator as unknown as { standalone?: boolean }).standalone ===
					true;

			const isPWAInstalled = localStorage.getItem('pwa-installed') === 'true';

			const isPWAMode = isStandalone || isPWAInstalled;
			setIsPWA(isPWAMode);

			if (isPWAMode) {
				setShowSplash(true);
			}
		};

		checkIfPWA();

		const mediaQuery = window.matchMedia('(display-mode: standalone)');
		const listener = (e: MediaQueryListEvent) => {
			setIsPWA(e.matches);
			if (e.matches) {
				setShowSplash(true);
			}
		};
		mediaQuery.addEventListener('change', listener);

		return () => mediaQuery.removeEventListener('change', listener);
	}, []);
	return { showSplash, isPWA, setShowSplash };
};
