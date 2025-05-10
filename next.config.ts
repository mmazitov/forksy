import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'www.istockphoto.com' },
			{ hostname: 'lh3.googleusercontent.com' },
			{ hostname: 'accounts.google.com' },
			{ hostname: 'googleusercontent.com' },
			{ hostname: '*.googleusercontent.com' },
			{ hostname: '*.ggpht.com' },
			{ hostname: '*.gstatic.com' },
			{ hostname: '*.googleapis.com' },
			// Разрешаем изображения с других доменов для результатов поиска
			{ hostname: '*' },
		],
	},
};

export default nextConfig;
