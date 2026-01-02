// Register and manage Service Worker for PWA
const initServiceWorker = () => {
	// Only register Service Worker in production
	if ('serviceWorker' in navigator && import.meta.env.PROD) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('/sw.js', { scope: '/' })
				.then((registration) => {
					console.log('[PWA] Service Worker registered:', registration);

					// Listen for updates
					registration.addEventListener('updatefound', () => {
						const newWorker = registration.installing;

						if (newWorker) {
							newWorker.addEventListener('statechange', () => {
								if (
									newWorker.state === 'installed' &&
									navigator.serviceWorker.controller
								) {
									// New service worker is ready for activation
									console.log('[PWA] New Service Worker update available');

									// Notify user about available update
									window.dispatchEvent(
										new CustomEvent('pwa-update-available', {
											detail: { registration },
										}),
									);
								}
							});
						}
					});

					// Listen for messages from Service Worker
					navigator.serviceWorker.addEventListener('message', (event) => {
						if (event.data.type === 'PWA_INSTALLED') {
							localStorage.setItem('pwa-installed', 'true');
							console.log('[PWA] PWA installation marker set');

							// Dispatch custom event for app components to react to
							window.dispatchEvent(new CustomEvent('pwa-installed'));
						}
					});
				})
				.catch((error) => {
					console.warn('[PWA] Service Worker registration failed:', error);
				});
		});
	}
};

// Hook to listen for PWA update events
const usePwaUpdateListener = (callback?: () => void) => {
	if (typeof window !== 'undefined') {
		window.addEventListener('pwa-update-available', () => {
			console.log('[PWA] Update available');
			if (callback) {
				callback();
			}
		});
	}
};

// Handle PWA update by reloading the page
const skipWaitingAndReload = () => {
	if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
		navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
		window.location.reload();
	}
};

export default initServiceWorker;
export { skipWaitingAndReload, usePwaUpdateListener };
