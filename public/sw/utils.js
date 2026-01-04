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
	return request.url.includes('/graphql');
}

// Parse GraphQL operation from POST body
async function getGraphQLOperation(request) {
	try {
		if (request.method === 'POST' && request.clone) {
			const clonedRequest = request.clone();
			const body = await clonedRequest.json();
			return {
				operationName: body.operationName,
				query: body.query,
			};
		}
	} catch (error) {
		console.error('[SW Utils] Failed to parse GraphQL operation:', error);
	}
	return null;
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
