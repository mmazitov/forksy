import {
	Header,
	PwaInstallPrompt,
	SplashScreen,
	useSplashScreen,
} from '@/components';
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
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
	const { showSplash, setShowSplash } = useSplashScreen();

	return (
		<Providers>
			{showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
			<PwaInstallPrompt />
			<BrowserRouter>
				<div className="min-h-screen bg-background">
					<Header />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/schedule" element={<Schedule />} />
						<Route path="/menu-planner" element={<MenuPlanner />} />
						<Route path="/products" element={<Products />} />
						<Route path="/products/:id" element={<ProductDetail />} />
						<Route path="/products/add" element={<AddProduct />} />
						<Route path="/dishes" element={<Dishes />} />
						<Route path="/dishes/:id" element={<DishDetail />} />
						<Route path="/dishes/add" element={<AddDish />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/profile" element={<Profile />} />
						{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</BrowserRouter>
		</Providers>
	);
};

export default App;
