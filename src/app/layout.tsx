import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import AuthModal from '@/components/modals/AuthModal';
import ProductModal from '@/components/modals/ProductModal';
import Providers from '@/lib/providers';
import './globals.css';

const poppinsFont = Poppins({
	variable: '--font-poppins',
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: 'Forksy - Food Management App',
	description: 'Управление продуктами и рецептами',
	manifest: '/manifest.json',
	icons: [
		{ rel: 'icon', url: '/icons/android-chrome-192x192.png' },
		{
			rel: 'apple-touch-icon',
			url: '/icons/apple-touch-icon.png',
			sizes: '180x180',
		},
		{ rel: 'icon', url: '/icons/android-chrome-512x512.png', sizes: '512x512' },
	],
	appleWebApp: {
		capable: true,
		title: 'Forksy',
		statusBarStyle: 'default',
	},
	other: {
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'default',
		'apple-mobile-web-app-title': 'Forksy',
		'mobile-web-app-capable': 'yes',
		'msapplication-TileColor': '#9372f1',
		'msapplication-config': '/browserconfig.xml',
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: 'cover',
	themeColor: '#9372f1',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body className={`${poppinsFont.variable} antialiased`}>
				<Providers>
					<div className="flex flex-col h-screen wrapper">
						<Header />
						<div className="container">{children}</div>
						<Footer />
					</div>
					<AuthModal />
					<ProductModal />
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
