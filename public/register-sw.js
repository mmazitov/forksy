if ('serviceWorker' in navigator) {
	const isDev =
		window.location.hostname === 'localhost' ||
		window.location.hostname === '127.0.0.1';
	const log = (...args) => isDev && console.log(...args);
	const error = (...args) => isDev && console.error(...args);

	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('/sw.js', { scope: '/' })
			.then((registration) => {
				log('[PWA] Service Worker registered:', registration);
			})
			.catch((err) => {
				error('[PWA] Service Worker registration failed:', err);
			});
	});
}
