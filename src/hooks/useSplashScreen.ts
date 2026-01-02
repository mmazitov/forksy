import { useEffect, useState } from 'react';

export const useSplashScreen = () => {
	const [showSplash, setShowSplash] = useState(false);
	const [isPWA, setIsPWA] = useState(false);

	// Check if the app is running in PWA mode
	useEffect(() => {
		const checkIfPWA = () => {
			// Method 1: Check standalone mode (for mobile and iOS)
			const isStandalone =
				window.matchMedia('(display-mode: standalone)').matches ||
				(window.navigator as unknown as { standalone?: boolean }).standalone ===
					true;

			// Method 2: Check localStorage (if set during PWA installation)
			const isPWAInstalled = localStorage.getItem('pwa-installed') === 'true';

			// Method 3: Check for service worker
			const hasServiceWorker = 'serviceWorker' in navigator;

			const isPWAMode = isStandalone || isPWAInstalled;
			setIsPWA(isPWAMode);

			// Show SplashScreen only in PWA mode
			if (isPWAMode) {
				setShowSplash(true);
			}

			console.log('PWA Check:', {
				isStandalone,
				isPWAInstalled,
				hasServiceWorker,
				isPWAMode,
			});
		};

		checkIfPWA();

		// Listen for changes to display-mode
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
