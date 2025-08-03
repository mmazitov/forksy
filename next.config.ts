import withPWA from '@ducanh2912/next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'www.istockphoto.com',
				protocol: 'https' as const,
			},
			{
				hostname: 'lh3.googleusercontent.com',
				protocol: 'https' as const,
			},
			{
				hostname: 'accounts.google.com',
				protocol: 'https' as const,
			},
			{
				hostname: 'googleusercontent.com',
				protocol: 'https' as const,
			},
			{
				hostname: '*.googleusercontent.com',
				protocol: 'https' as const,
			},
			{
				hostname: '*.ggpht.com',
				protocol: 'https' as const,
			},
			{
				hostname: '*.gstatic.com',
				protocol: 'https' as const,
			},
			{
				hostname: '*.googleapis.com',
				protocol: 'https' as const,
			},
			{
				hostname: 'spoonacular.com',
				protocol: 'https' as const,
				pathname: '/**',
			},
			{
				hostname: '*.spoonacular.com',
				protocol: 'https' as const,
				pathname: '/**',
			},
		],
	},
};

export default withPWA({
	dest: 'public',
	disable: isDev,
	workboxOptions: {
		disableDevLogs: true,
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'google-fonts-cache',
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
					},
				},
			},
			{
				urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'gstatic-fonts-cache',
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
					},
				},
			},
			{
				urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-image-assets',
					expiration: {
						maxEntries: 64,
						maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
					},
				},
			},
			{
				urlPattern: /\/_next\/image\?url=.+$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'next-image',
					expiration: {
						maxEntries: 64,
						maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
					},
				},
			},
			{
				urlPattern: /\.(?:js)$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-js-assets',
					expiration: {
						maxEntries: 48,
						maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
					},
				},
			},
			{
				urlPattern: /\.(?:css|less)$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-style-assets',
					expiration: {
						maxEntries: 32,
						maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
					},
				},
			},
			{
				urlPattern: /\/api\/.*$/i,
				handler: 'NetworkFirst',
				method: 'GET',
				options: {
					cacheName: 'apis',
					expiration: {
						maxEntries: 16,
						maxAgeSeconds: 60 * 60 * 24, // 24 hours
					},
					networkTimeoutSeconds: 10,
				},
			},
		],
	},
})(nextConfig);
