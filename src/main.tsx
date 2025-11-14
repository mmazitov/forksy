import App from '@/App';
import initServiceWorker from '@/hooks/useServiceWorker';
import '@/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Initialize Service Worker for PWA
initServiceWorker();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
