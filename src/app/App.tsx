import { BrowserRouter } from 'react-router-dom';

import Providers from './providers/Providers';
import AppRoutes from './routes/AppRoutes';

import { PwaInstallPrompt } from '@/shared/components/pwaInstallPrompt';
import { PwaUpdatePrompt } from '@/shared/components/pwaUpdatePrompt';
import { SplashScreen } from '@/shared/components/splashScreen';
import { useSplashScreen } from '@/shared/hooks';

const App = () => {
	const { showSplash, setShowSplash } = useSplashScreen();

	return (
		<Providers>
			{showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
			{/* {<SplashScreen onComplete={() => setShowSplash(false)} />} */}
			<PwaInstallPrompt />
			<PwaUpdatePrompt />
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</Providers>
	);
};

export default App;
