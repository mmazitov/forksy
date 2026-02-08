import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { ProtectedRoute } from './lib/hoc';

import {
	Header,
	PwaInstallPrompt,
	PwaUpdatePrompt,
	SplashScreen,
} from '@/components';
import { useSplashScreen } from '@/hooks';
import { Providers } from '@/lib/providers';
import {
	AddDish,
	AddProduct,
	DishDetail,
	Dishes,
	Home,
	MenuPlanner,
	NotFound,
	ProductDetail,
	Products,
	Profile,
	Schedule,
	Settings,
} from '@/pages';

const AppRoutes = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className="bg-background min-h-screen">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/menu-planner" element={<MenuPlanner />} />
				<Route path="/products" element={<Products />} />
				<Route path="/product/:id" element={<ProductDetail />} />
				<Route
					path="/products/add"
					element={
						<ProtectedRoute>
							<AddProduct />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/product/edit/:id"
					element={
						<ProtectedRoute>
							<AddProduct />
						</ProtectedRoute>
					}
				/>
				<Route path="/dishes" element={<Dishes />} />
				<Route path="/dish/:id" element={<DishDetail />} />
				<Route
					path="/dishes/add"
					element={
						<ProtectedRoute>
							<AddDish />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dish/edit/:id"
					element={
						<ProtectedRoute>
							<AddDish />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/settings"
					element={
						<ProtectedRoute>
							<Settings />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

const App = () => {
	const { showSplash, setShowSplash } = useSplashScreen();

	return (
		<Providers>
			{showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
			<PwaInstallPrompt />
			<PwaUpdatePrompt />
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</Providers>
	);
};

export default App;
