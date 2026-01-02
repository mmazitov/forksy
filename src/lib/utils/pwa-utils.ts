// Clear all PWA caches
// Useful for debugging or forcing a fresh install
const clearAllCaches = async (): Promise<void> => {
	if (!('caches' in window)) {
		console.warn('[PWA] Caches API not available');
		return;
	}

	const cacheNames = await caches.keys();
	console.log('[PWA] Found caches:', cacheNames);

	await Promise.all(
		cacheNames
			.filter((name) => name.startsWith('forksy-'))
			.map((name) => {
				console.log(`[PWA] Clearing cache: ${name}`);
				return caches.delete(name);
			}),
	);

	console.log('[PWA] All caches cleared');
};

// Unregister all service workers
const unregisterAllServiceWorkers = async (): Promise<void> => {
	if (!('serviceWorker' in navigator)) {
		console.warn('[PWA] Service Worker API not available');
		return;
	}

	const registrations = await navigator.serviceWorker.getRegistrations();
	console.log('[PWA] Found service workers:', registrations.length);

	await Promise.all(
		registrations.map((registration) => {
			console.log('[PWA] Unregistering service worker:', registration.scope);
			return registration.unregister();
		}),
	);

	console.log('[PWA] All service workers unregistered');
};

// Full PWA reset - clears caches and unregisters service workers
// Call this to do a complete fresh install
const fullPwaReset = async (): Promise<void> => {
	console.log('[PWA] Starting full PWA reset...');

	try {
		await clearAllCaches();
		await unregisterAllServiceWorkers();

		// Clear PWA markers from localStorage
		localStorage.removeItem('pwa-installed');

		console.log('[PWA] Full reset complete. Reload the page to reinstall PWA');

		// Reload after a short delay
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	} catch (error) {
		console.error('[PWA] Reset failed:', error);
	}
};

// Get current PWA cache information
const getPwaCacheInfo = async (): Promise<{
	cacheCount: number;
	cacheNames: string[];
	totalSize: number;
}> => {
	if (!('caches' in window)) {
		return { cacheCount: 0, cacheNames: [], totalSize: 0 };
	}

	const cacheNames = await caches.keys();
	const forksynCaches = cacheNames.filter((name) => name.startsWith('forksy-'));

	let totalSize = 0;

	for (const cacheName of forksynCaches) {
		const cache = await caches.open(cacheName);
		const keys = await cache.keys();

		for (const request of keys) {
			try {
				const response = await cache.match(request);
				if (response) {
					const blob = await response.blob();
					totalSize += blob.size;
				}
			} catch (error) {
				console.warn('[PWA] Could not get size of cached item:', error);
			}
		}
	}

	return {
		cacheCount: forksynCaches.length,
		cacheNames: forksynCaches,
		totalSize,
	};
};

// Format bytes to human-readable size
const formatBytes = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export {
	clearAllCaches,
	formatBytes,
	fullPwaReset,
	getPwaCacheInfo,
	unregisterAllServiceWorkers,
};
