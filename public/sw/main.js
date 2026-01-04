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

		// GraphQL API requests
		if (isGraphQLRequest(request)) {
			// Dishes - Stale While Revalidate
			if (url.searchParams.get('operationName') === 'GetDishes') {
				event.respondWith(staleWhileRevalidate(request, CACHES.DISHES));
				return;
			}

			// Products - Stale While Revalidate
			if (url.searchParams.get('operationName') === 'GetProducts') {
				event.respondWith(staleWhileRevalidate(request, CACHES.PRODUCTS));
				return;
			}

			// Meal Plans - Network First
			if (url.searchParams.get('operationName')?.includes('Plan')) {
				event.respondWith(networkFirst(request, CACHES.PLANS));
				return;
			}

			// Default for GraphQL - Network First
			event.respondWith(networkFirst(request, CACHES.PLANS));
			return;
		}

		// Images - Cache First with long TTL
		if (url.href.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
			event.respondWith(cacheFirst(request, CACHES.IMAGES));
			return;
		}
	}

	// POST / PUT / DELETE - offline queue
	if (
		['POST', 'PUT', 'DELETE'].includes(request.method) &&
		isApiRequest(request)
	) {
		event.respondWith(
			fetch(request).catch(async () => {
				await enqueueRequest(request);
				return new Response(
					JSON.stringify({
						offline: true,
						message: 'Request queued for sync',
					}),
					{
						status: 202,
						headers: { 'Content-Type': 'application/json' },
					},
				);
			}),
		);
		return;
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
