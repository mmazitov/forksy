import { Header, PwaInstallPrompt, SplashScreen } from '@/components';
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
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './lib/hoc';

const AppRoutes = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className="min-h-screen bg-background">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/menu-planner" element={<MenuPlanner />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:id" element={<ProductDetail />} />
				<Route path="/dishes" element={<Dishes />} />
				<Route path="/dishes/:id" element={<DishDetail />} />
				<Route
					path="/products/add"
					element={
						<ProtectedRoute>
							<AddProduct />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dishes/add"
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
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</Providers>
	);
};

export default App;
