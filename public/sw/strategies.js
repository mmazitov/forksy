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
	} catch (error) {
		console.error('[Strategy] Cache First failed:', error);
		throw error;
	}
}

// Stale While Revalidate - for dishes and products (show cache, update in background)
async function staleWhileRevalidate(request, cacheName) {
	const cache = await caches.open(cacheName);
	const cached = await cache.match(request);

	const networkFetch = fetch(request)
		.then((response) => {
			if (response && response.status === 200) {
				cache.put(request, response.clone());
			}
			return response;
		})
		.catch((error) => {
			console.error('[Strategy] Network fetch failed:', error);
			return null;
		});

	return cached || networkFetch;
}

// Network First - for meal plans (network priority, fallback to cache)
async function networkFirst(request, cacheName) {
	const cache = await caches.open(cacheName);

	try {
		const response = await fetch(request);
		if (response && response.status === 200) {
			cache.put(request, response.clone());
		}
		return response;
	} catch (error) {
		console.error('[Strategy] Network First fallback to cache:', error);
		const cached = await cache.match(request);
		if (cached) {
			return cached;
		}
		throw error;
	}
}

// Network Only - for auth requests
async function networkOnly(request) {
	return fetch(request);
}
