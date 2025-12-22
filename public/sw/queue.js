async function enqueueRequest(request) {
	const cache = await caches.open(CACHES.QUEUE);

	try {
		const body = await request.clone().text();

		const entry = new Response(
			JSON.stringify({
				url: request.url,
				method: request.method,
				body: body,
				headers: [...request.headers.entries()],
				timestamp: Date.now(),
			}),
		);

		await cache.put(`${Date.now()}-${Math.random()}`, entry);
		console.log('[Queue] Request enqueued:', request.url);

		// Notify clients about offline action
		self.clients.matchAll().then((clients) => {
			clients.forEach((client) => {
				client.postMessage({
					type: 'OFFLINE_ACTION_QUEUED',
					url: request.url,
				});
			});
		});
	} catch (error) {
		console.error('[Queue] Failed to enqueue request:', error);
	}
}

async function replayQueue() {
	const cache = await caches.open(CACHES.QUEUE);
	const keys = await cache.keys();

	console.log(`[Queue] Replaying ${keys.length} queued requests`);

	for (const key of keys) {
		try {
			const entry = await cache.match(key);
			const data = await entry.json();

			const response = await fetch(data.url, {
				method: data.method,
				headers: Object.fromEntries(data.headers),
				body: data.body,
			});

			if (response.ok) {
				await cache.delete(key);
				console.log('[Queue] Successfully replayed:', data.url);

				// Notify clients about successful replay
				self.clients.matchAll().then((clients) => {
					clients.forEach((client) => {
						client.postMessage({
							type: 'OFFLINE_ACTION_SYNCED',
							url: data.url,
						});
					});
				});
			}
		} catch (error) {
			console.error('[Queue] Failed to replay request:', error);
			// Leave in queue for next sync attempt
		}
	}
}

async function getQueueSize() {
	const cache = await caches.open(CACHES.QUEUE);
	const keys = await cache.keys();
	return keys.length;
}
