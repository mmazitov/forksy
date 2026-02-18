import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';
import '@/index.css';
import { initServiceWorker } from '@/shared/hooks';

// Initialize Service Worker for PWA
initServiceWorker();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
