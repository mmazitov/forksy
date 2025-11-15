import {
	clearAllCaches,
	fullPwaReset,
	getPwaCacheInfo,
	unregisterAllServiceWorkers,
} from '@/lib/utils/pwa-utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CacheInfo {
	cacheCount: number;
	cacheNames: string[];
	totalSize: number;
}

export const usePwaManagment = () => {
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

	const handleUnregisterSW = async () => {
		setIsLoading(true);
		try {
			await unregisterAllServiceWorkers();
			setIsServiceWorkerActive(false);
			toast.success('Service Worker видалено. Перезавантажте сторінку');
		} catch (error) {
			console.error('Failed to unregister SW:', error);
			toast.error('Не вдалося видалити Service Worker');
		} finally {
			setIsLoading(false);
		}
	};

	const handleFullReset = async () => {
		const confirmed = window.confirm(
			'Ви впевнені? Це повністю очистить PWA та перезавантажить програму.',
		);
		if (!confirmed) return;

		setIsLoading(true);
		try {
			await fullPwaReset();
		} catch (error) {
			console.error('Failed full PWA reset:', error);
			toast.error('Не вдалося виконати повний скидання PWA');
			setIsLoading(false);
		}
	};

	return {
		cacheInfo,
		isLoading,
		isServiceWorkerActive,
		handleClearCache,
		handleUnregisterSW,
		handleFullReset,
	};
};
