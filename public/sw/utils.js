export async function cleanupOldCaches(allowedCaches) {
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

export function isApiRequest(request) {
	return request.url.includes('/api/');
}

export function isGraphQLRequest(request) {
	return request.url.includes('/api/graphql');
}

export function isAuthRequest(request) {
	return request.url.includes('/api/auth/');
}

export function isSupportedScheme(url) {
	return url.startsWith('http://') || url.startsWith('https://');
}

export function isDevServerRequest(url) {
	return url.includes('@vite') || url.includes('@react-refresh');
}

export function shouldCacheAsset(url) {
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
