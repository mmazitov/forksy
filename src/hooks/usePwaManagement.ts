import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
	clearAllCaches,
	fullPwaReset,
	getPwaCacheInfo,
	unregisterAllServiceWorkers,
} from '@/lib/utils/pwa-utils';

interface CacheInfo {
	cacheCount: number;
	cacheNames: string[];
	totalSize: number;
}

export const usePwaManagement = () => {
	const [cacheInfo, setCacheInfo] = useState<CacheInfo | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isServiceWorkerActive, setIsServiceWorkerActive] = useState(false);

	useEffect(() => {
		loadCacheInfo();
		checkServiceWorker();
	}, []);

	const loadCacheInfo = async () => {
		try {
			const info = await getPwaCacheInfo();
			setCacheInfo(info);
		} catch (error) {
			console.error('Failed to load cache info:', error);
			toast.error('Не вдалося завантажити інформацію про кеш');
		}
	};

	const checkServiceWorker = async () => {
		if ('serviceWorker' in navigator) {
			const registrations = await navigator.serviceWorker.getRegistrations();
			setIsServiceWorkerActive(registrations.length > 0);
		}
	};

	const handleClearCache = async () => {
		setIsLoading(true);
		try {
			await clearAllCaches();
			await loadCacheInfo();
			toast.success('Кеш очищено успішно');
		} catch (error) {
			console.error('Failed to clear cache:', error);
			toast.error('Не вдалося очистити кеш');
		} finally {
			setIsLoading(false);
		}
	};

	const handleFullReset = async () => {
		setIsLoading(true);
		try {
			await fullPwaReset();
			await unregisterAllServiceWorkers();
			toast.success('PWA скинуто, сторінка буде перезавантажена');
			setTimeout(() => {
				window.location.href = '/';
			}, 1500);
		} catch (error) {
			console.error('Failed to reset PWA:', error);
			toast.error('Не вдалося скинути PWA');
		} finally {
			setIsLoading(false);
		}
	};

	const handleUnregisterSW = async () => {
		setIsLoading(true);
		try {
			await unregisterAllServiceWorkers();
			await checkServiceWorker();
			toast.success('Service Worker видалено');
		} catch (error) {
			console.error('Failed to unregister service worker:', error);
			toast.error('Не вдалося видалити Service Worker');
		} finally {
			setIsLoading(false);
		}
	};

	return {
		cacheInfo,
		isLoading,
		isServiceWorkerActive,
		handleClearCache,
		handleFullReset,
		handleUnregisterSW,
		loadCacheInfo,
	};
};
