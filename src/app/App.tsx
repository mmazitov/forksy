import { BrowserRouter } from 'react-router-dom';

import Providers from './providers/Providers';
import AppRoutes from './routes/AppRoutes';

import { ErrorBoundary } from '@/shared/components/errorBoundary';
import { PwaInstallPrompt } from '@/shared/components/pwaInstallPrompt';
import { PwaUpdatePrompt } from '@/shared/components/pwaUpdatePrompt';
import { SplashScreen } from '@/shared/components/splashScreen';
import { useSplashScreen } from '@/shared/hooks';

const App = () => {
	const { showSplash, setShowSplash } = useSplashScreen();

	return (
		<ErrorBoundary>
			<Providers>
				{showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
				<PwaInstallPrompt />
				<PwaUpdatePrompt />
				<BrowserRouter>
					<ErrorBoundary>
						<AppRoutes />
					</ErrorBoundary>
				</BrowserRouter>
			</Providers>
		</ErrorBoundary>
	);
};

export default App;
