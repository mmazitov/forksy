// Cache version with build hash for automatic cache invalidation
const CACHE_VERSION = 'v1';
// Use a hash based on the current time during development
// In production, this should be replaced during build with actual build hash
const BUILD_HASH = 'VITE_BUILD_HASH_PLACEHOLDER';
const CACHE_NAME = `forksy-${CACHE_VERSION}-${BUILD_HASH}`;

// Separate cache for HTML pages (including index.html for SPA)
const HTML_CACHE_NAME = `forksy-html-${CACHE_VERSION}`;

// Critical URLs to cache on install
const urlsToCache = ['/', '/index.html'];

// Asset patterns to cache
const ASSET_PATTERNS = [
	/\.js$/,
	/\.css$/,
	/\.woff2?$/,
	/\.ttf$/,
	/\.eot$/,
	/\.svg$/,
	/\.png$/,
	/\.jpg$/,
	/\.jpeg$/,
	/\.gif$/,
	/\.webp$/,
];

// Check if URL should be cached based on asset patterns
function shouldCacheAsset(url) {
	return ASSET_PATTERNS.some((pattern) => pattern.test(url));
}

// Check if request is from dev server
function isDevServerRequest(url) {
	return url.includes('@vite') || url.includes('@react-refresh');
}

// Check if URL scheme is supported for caching
function isSupportedScheme(url) {
	return url.startsWith('http://') || url.startsWith('https://');
}
// Install event - cache essential files
self.addEventListener('install', (event) => {
	console.log('[Service Worker] Installing...');

	// Notify clients about installation
	self.clients.matchAll().then((clients) => {
		clients.forEach((client) => {
			client.postMessage({ type: 'PWA_INSTALLED' });
		});
	});

	event.waitUntil(
		Promise.all([
			// Cache assets
			caches.open(CACHE_NAME).then((cache) => {
				console.log(
					`[Service Worker] Caching essential assets in ${CACHE_NAME}`,
				);
				return cache.addAll(urlsToCache);
			}),
			// Pre-cache index.html in HTML cache for offline SPA support
			caches.open(HTML_CACHE_NAME).then((cache) => {
				console.log(
					`[Service Worker] Pre-caching index.html in ${HTML_CACHE_NAME}`,
				);
				return cache.addAll(['/index.html', '/']);
			}),
		]),
	);
});

// Fetch event - serve from cache with network fallback
// Optimized for SPA with proper handling of navigation requests
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip caching for unsupported schemes (chrome-extension, etc)
	if (!isSupportedScheme(url.href)) {
		return;
	}

	// Skip caching for dev server and API requests
	if (isDevServerRequest(url.href)) {
		return;
	}

	// For GET requests only
	if (request.method !== 'GET') {
		return;
	}

	// Check if this is a navigation request (HTML for SPA routes)
	const isNavigationRequest = request.mode === 'navigate';

	// Strategy for assets (JS, CSS, images, fonts)
	if (shouldCacheAsset(url.href)) {
		event.respondWith(
			caches
				.match(request)
				.then((response) => {
					if (response) {
						return response;
					}

					return fetch(request).then((response) => {
						if (
							!response ||
							response.status !== 200 ||
							response.type === 'error'
						) {
							return response;
						}

						const responseToCache = response.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(request, responseToCache);
						});

						return response;
					});
				})
				.catch(() => {
					// Fallback for offline asset requests
					return null;
				}),
		);
		return;
	}

	// Strategy for navigation requests (HTML pages)
	if (isNavigationRequest) {
		event.respondWith(
			fetch(request)
				.then((response) => {
					// Only cache successful HTML responses
					if (response && response.status === 200) {
						const responseToCache = response.clone();
						caches.open(HTML_CACHE_NAME).then((cache) => {
							cache.put(request, responseToCache);
						});
					}
					return response;
				})
				.catch(() => {
					// Network failed, try cache
					return caches.match(request).then((response) => {
						if (response) {
							return response;
						}
						// Fallback to cached index.html for offline SPA navigation
						return caches.match('/index.html');
					});
				}),
		);
		return;
	}

	// Default strategy for other requests
	event.respondWith(
		caches
			.match(request)
			.then((response) => {
				if (response) {
					return response;
				}

				return fetch(request).then((response) => {
					if (
						!response ||
						response.status !== 200 ||
						response.type === 'error'
					) {
						return response;
					}

					// Only cache if URL scheme is supported
					if (isSupportedScheme(request.url)) {
						const responseToCache = response.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(request, responseToCache);
						});
					}

					return response;
				});
			})
			.catch(() => {
				return null;
			}),
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activating...');

	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					// Delete old cache versions (both asset and HTML caches)
					const isOldAssetCache =
						cacheName.startsWith('forksy-') &&
						cacheName !== CACHE_NAME &&
						!cacheName.includes('-html-');
					const isOldHtmlCache =
						cacheName.startsWith('forksy-html-') &&
						cacheName !== HTML_CACHE_NAME;

					if (isOldAssetCache || isOldHtmlCache) {
						console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);

	// Claim all clients
	self.clients.claim();
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
