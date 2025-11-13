const CACHE_NAME = 'forksy-v1';
const urlsToCache = ['/', '/index.html'];

self.addEventListener('install', (event) => {
	self.clients.matchAll().then((clients) => {
		clients.forEach((client) => {
			client.postMessage({ type: 'PWA_INSTALLED' });
		});
	});

	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
	);
});

self.addEventListener('fetch', (event) => {
	// Skip caching for dev server requests (Vite, React Refresh, etc)
	if (
		event.request.url.includes('@vite') ||
		event.request.url.includes('@react-refresh')
	) {
		return;
	}

	event.respondWith(
		caches
			.match(event.request)
			.then((response) => response || fetch(event.request))
			.catch(() => caches.match('/index.html')),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});
