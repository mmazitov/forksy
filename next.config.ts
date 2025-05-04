import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'www.istockphoto.com' },
			{ hostname: 'lh3.googleusercontent.com' },
			{ hostname: 'accounts.google.com' },
			{ hostname: 'googleusercontent.com' },
		],
	},
};

export default nextConfig;
