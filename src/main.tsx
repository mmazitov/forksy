import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import App from '@/app/App';
import '@/index.css';
import { initServiceWorker } from '@/shared/hooks';

// Initialize Service Worker for PWA
initServiceWorker();

const rootElement = document.getElementById('root')!;

// Support both SSR hydration and client-side rendering
if (rootElement.hasChildNodes()) {
	hydrateRoot(
		rootElement,
		<StrictMode>
			<App />
		</StrictMode>,
	);
} else {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
