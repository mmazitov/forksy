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
		{ rel: 'icon', url: '/icons/icon-192x192.png' },
		{ rel: 'apple-touch-icon', url: '/icons/icon-192x192.png' },
	],
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	themeColor: '#000000',
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
