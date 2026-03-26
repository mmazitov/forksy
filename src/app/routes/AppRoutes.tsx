import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import {
	AddDish,
	AddProduct,
	DishDetail,
	Dishes,
	Favorites,
	Home,
	MenuPlanner,
	NotFound,
	ProductDetail,
	Products,
	Profile,
	Schedule,
	Settings,
} from '@/pages';
import { Header } from '@/shared/components/header';
import { ProtectedRoute } from '@/shared/lib/hoc';

const AppRoutes = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className="bg-background min-h-screen pb-16 lg:pb-0">
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
				<Route
					path="/favorites"
					element={
						<ProtectedRoute>
							<Favorites />
						</ProtectedRoute>
					}
				/>
				{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default AppRoutes;
