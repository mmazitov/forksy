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
		console.error('[Strategy] Cache First failed, trying any cache:', error);
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
	
	// For POST requests, create cache key from URL + body hash
	let cacheKey = request.url;
	if (request.method === 'POST' && request.clone) {
		try {
			const clonedRequest = request.clone();
			const body = await clonedRequest.text();
			const bodyHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
			const hashArray = Array.from(new Uint8Array(bodyHash));
			const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
			cacheKey = `${request.url}-${hashHex.slice(0, 16)}`;
		} catch (error) {
			console.error('[Strategy] Failed to hash POST body:', error);
		}
	}
	
	const cached = await cache.match(cacheKey);

	const networkFetch = fetch(request.clone())
		.then((response) => {
			if (response && response.status === 200) {
				cache.put(cacheKey, response.clone());
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
