import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Header } from '@/app/components';
import { Loader } from '@/shared/components/loader';
import { ProtectedRoute } from '@/shared/lib/hoc';

const Home = lazy(() => import('@/pages/Home'));
const Schedule = lazy(() => import('@/pages/Schedule'));
const MenuPlanner = lazy(() => import('@/pages/MenuPlanner'));
const ShoppingList = lazy(() => import('@/pages/ShoppingList'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const AddProduct = lazy(() => import('@/pages/AddProduct'));
const Dishes = lazy(() => import('@/pages/Dishes'));
const DishDetail = lazy(() => import('@/pages/DishDetail'));
const AddDish = lazy(() => import('@/pages/AddDish'));
const Settings = lazy(() => import('@/pages/Settings'));
const Profile = lazy(() => import('@/pages/Profile'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const AppRoutes = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className="bg-background min-h-screen pb-16 lg:pb-0">
			<Header />
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/schedule" element={<Schedule />} />
					<Route path="/menu-planner" element={<MenuPlanner />} />
					<Route path="/shopping-list" element={<ShoppingList />} />
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
			</Suspense>
		</div>
	);
};

export default AppRoutes;
