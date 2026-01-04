// Install event - cache App Shell
self.addEventListener('install', (event) => {
	console.log('[Service Worker] Installing...');

	event.waitUntil(
		caches.open(CACHES.APP_SHELL).then((cache) => {
			console.log('[Service Worker] Caching App Shell');
			const precacheUrls = self.__PRECACHE_MANIFEST || ['/', '/index.html'];
			console.log('[Service Worker] Precaching:', precacheUrls);
			return cache.addAll(precacheUrls);
		}),
	);

	self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activating...');

	event.waitUntil(cleanupOldCaches(Object.values(CACHES)));

	self.clients.claim();
});

// Fetch event - routing strategies
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip unsupported schemes and dev server
	if (!isSupportedScheme(url.href) || isDevServerRequest(url.href)) {
		return;
	}

	// GraphQL POST requests - need special handling
	if (request.method === 'POST' && isGraphQLRequest(request)) {
		event.respondWith(
			(async () => {
				const operation = await getGraphQLOperation(request);

				// Products queries
				if (
					operation?.operationName === 'Products' ||
					operation?.query?.includes('query Products')
				) {
					return staleWhileRevalidate(request, CACHES.PRODUCTS);
				}

				// Product detail query
				if (
					operation?.operationName === 'Product' ||
					operation?.query?.includes('query Product')
				) {
					return staleWhileRevalidate(request, CACHES.PRODUCTS);
				}

				// Dishes queries
				if (
					operation?.operationName?.includes('Dish') ||
					operation?.query?.includes('dishes')
				) {
					return staleWhileRevalidate(request, CACHES.DISHES);
				}

				// Mutations - Network First with offline queue
				if (operation?.query?.includes('mutation')) {
					try {
						const response = await fetch(request);
						return response;
					} catch (error) {
						await enqueueRequest(request);
						return new Response(
							JSON.stringify({
								offline: true,
								message: 'Mutation queued for sync',
							}),
							{
								status: 202,
								headers: { 'Content-Type': 'application/json' },
							},
						);
					}
				}

				// Default - Network First
				return networkFirst(request, CACHES.PLANS);
			})(),
		);
		return;
	}

	// GET requests only for caching
	if (request.method === 'GET') {
		// App Shell - navigation requests
		if (request.mode === 'navigate') {
			event.respondWith(cacheFirst(request, CACHES.APP_SHELL));
			return;
		}

		// Static assets - Cache First
		if (shouldCacheAsset(url.href)) {
			event.respondWith(cacheFirst(request, CACHES.STATIC));
			return;
		}

		// Auth requests - Network Only
		if (isAuthRequest(request)) {
			event.respondWith(networkOnly(request));
			return;
		}

		// Images - Cache First with long TTL
		if (url.href.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
			event.respondWith(cacheFirst(request, CACHES.IMAGES));
			return;
		}
	}
});

// Background Sync - replay offline queue
self.addEventListener('sync', (event) => {
	if (event.tag === 'forksy-sync') {
		console.log('[Service Worker] Background sync triggered');
		event.waitUntil(replayQueue());
	}
});

// Message event - handle client messages
self.addEventListener('message', (event) => {
	if (event.data?.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}

	if (event.data?.type === 'CLEAR_CACHE') {
		event.waitUntil(
			caches.keys().then((keys) => {
				return Promise.all(keys.map((key) => caches.delete(key)));
			}),
		);
	}
});

// Push notifications (for future)
self.addEventListener('push', (event) => {
	const data = event.data?.json() ?? {};

	const options = {
		body: data.body || 'New notification from Forksy',
		icon: '/icon-192x192.png',
		badge: '/icon-192x192.png',
		data: data,
	};

	event.waitUntil(
		self.registration.showNotification(data.title || 'Forksy', options),
	);
});
