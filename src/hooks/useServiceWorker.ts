const useServiceWorker = () => {
	// Only register Service Worker in production, not in development
	if ('serviceWorker' in navigator && import.meta.env.PROD) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration) => {
					console.log('Service Worker registered:', registration);

					navigator.serviceWorker.addEventListener('message', (event) => {
						if (event.data.type === 'PWA_INSTALLED') {
							localStorage.setItem('pwa-installed', 'true');
							console.log('PWA installed marker set');
						}
					});
				})
				.catch((error) => {
					console.log('Service Worker registration failed:', error);
				});
		});
	}
};

export default useServiceWorker;
