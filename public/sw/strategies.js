// Cache First - for App Shell and static resources
async function cacheFirst(request, cacheName) {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);

	if (cached) {
		return cached;
	}

	try {
		const response = await fetch(request);
		if (response && response.status === 200) {
			cache.put(request, response.clone());
		}
		return response;
	} catch (err) {
		error('[Strategy] Cache First failed, trying any cache:', err);
		// Try to find in any cache as fallback
		const cacheMatch = await caches.match(request);
		if (cacheMatch) {
			return cacheMatch;
		}
		// Return offline page for navigation
		if (request.mode === 'navigate') {
			const offlineCache = await caches.match('/index.html');
			if (offlineCache) return offlineCache;
		}
		throw error;
	}
}

// Stale While Revalidate - for dishes and products (show cache, update in background)
async function staleWhileRevalidate(request, cacheName) {
	const cache = await caches.open(cacheName);

	// POST requests (GraphQL) - network only, no caching (Cache API doesn't support POST)
	if (request.method === 'POST') {
		try {
			const response = await fetch(request);
			return response;
		} catch (err) {
			error('[Strategy] POST request failed:', err);
			throw err;
		}
	}

	const cached = await cache.match(request);

	const networkFetch = fetch(request.clone())
		.then((response) => {
			if (response && response.status === 200) {
				cache.put(request, response.clone());
			}
			return response;
		})
		.catch((err) => {
			error('[Strategy] Network fetch failed:', err);
			return null;
		});

	return cached || networkFetch;
}

// Network First - for meal plans (network priority, fallback to cache)
async function networkFirst(request, cacheName) {
	const cache = await caches.open(cacheName);

	try {
		const response = await fetch(request);
		// Only cache GET requests, not POST requests
		if (response && response.status === 200 && request.method === 'GET') {
			cache.put(request, response.clone());
		}
		return response;
	} catch (err) {
		error('[Strategy] Network First fallback to cache:', err);
		// Only try to match GET requests from cache
		if (request.method === 'GET') {
			const cached = await cache.match(request);
			if (cached) {
				return cached;
			}
		}
		throw err;
	}
}

// Network Only - for auth requests
async function networkOnly(request) {
	try {
		return await fetch(request);
	} catch (err) {
		error('[Strategy] Network Only failed:', err);
		// Re-throw to let Apollo Client handle auth errors properly
		throw err;
	}
}
