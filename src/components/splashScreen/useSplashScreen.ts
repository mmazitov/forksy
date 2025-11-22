import { useEffect, useState } from 'react';

const useSplashScreen = () => {
	const [showSplash, setShowSplash] = useState(false);
	const [isPWA, setIsPWA] = useState(false);

	// Check if the app is running in PWA mode
	useEffect(() => {
		const checkIfPWA = () => {
			// Method 1: Check standalone mode (for mobile and iOS)
			const isStandalone =
				window.matchMedia('(display-mode: standalone)').matches ||
				(window.navigator as any).standalone === true;

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
		mediaQuery.addEventListener('change', (e) => {
			setIsPWA(e.matches);
			if (e.matches) {
				setShowSplash(true);
			}
		});

		return () => mediaQuery.removeEventListener('change', () => {});
	}, []);
	return { showSplash, isPWA, setShowSplash };
};

export default useSplashScreen;
