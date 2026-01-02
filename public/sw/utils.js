async function cleanupOldCaches(allowedCaches) {
	const keys = await caches.keys();

	await Promise.all(
		keys.map((key) => {
			if (!allowedCaches.includes(key)) {
				console.log(`[SW Utils] Deleting old cache: ${key}`);
				return caches.delete(key);
			}
		}),
	);
}

function isApiRequest(request) {
	return request.url.includes('/api/');
}

function isGraphQLRequest(request) {
	return request.url.includes('/api/graphql');
}

function isAuthRequest(request) {
	return request.url.includes('/api/auth/');
}

function isSupportedScheme(url) {
	return url.startsWith('http://') || url.startsWith('https://');
}

function isDevServerRequest(url) {
	return url.includes('@vite') || url.includes('@react-refresh');
}

function shouldCacheAsset(url) {
	const assetPatterns = [
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
	return assetPatterns.some((pattern) => pattern.test(url));
}
