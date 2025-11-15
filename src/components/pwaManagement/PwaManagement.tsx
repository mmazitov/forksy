import { Button } from '@/components/ui';
import {
	clearAllCaches,
	formatBytes,
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

const PwaManagement = () => {
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

	return (
		<div className="space-y-4 rounded-lg border border-border bg-card p-4">
			<div>
				<h3 className="text-lg font-semibold">Управління PWA</h3>
				<p className="mt-2 text-sm text-muted-foreground">
					Керуйте кешем та сервіс-воркером вашого додатку
				</p>
			</div>

			<div className="space-y-2 rounded bg-muted/50 p-3">
				<div className="flex justify-between text-sm">
					<span>Статус Service Worker:</span>
					<span
						className={
							isServiceWorkerActive
								? 'font-semibold text-green-600'
								: 'font-semibold text-gray-600'
						}
					>
						{isServiceWorkerActive ? '✓ Активний' : '✗ Неактивний'}
					</span>
				</div>

				{cacheInfo && (
					<>
						<div className="flex justify-between text-sm">
							<span>Кешів:</span>
							<span className="font-semibold">{cacheInfo.cacheCount}</span>
						</div>
						<div className="flex justify-between text-sm">
							<span>Розмір кешу:</span>
							<span className="font-semibold">
								{formatBytes(cacheInfo.totalSize)}
							</span>
						</div>
						{cacheInfo.cacheNames.length > 0 && (
							<details className="mt-2 cursor-pointer">
								<summary className="text-sm font-medium">Деталі кешів</summary>
								<ul className="mt-2 space-y-1 text-xs font-mono">
									{cacheInfo.cacheNames.map((name) => (
										<li key={name} className="truncate text-muted-foreground">
											{name}
										</li>
									))}
								</ul>
							</details>
						)}
					</>
				)}
			</div>

			<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
				<Button
					variant="outline"
					size="sm"
					onClick={handleClearCache}
					disabled={isLoading || !cacheInfo || cacheInfo.cacheCount === 0}
				>
					{isLoading ? 'Очищення...' : 'Очистити кеш'}
				</Button>

				<Button
					variant="outline"
					size="sm"
					onClick={handleUnregisterSW}
					disabled={isLoading || !isServiceWorkerActive}
				>
					{isLoading ? 'Видалення...' : 'Видалити SW'}
				</Button>

				<Button
					variant="destructive"
					size="sm"
					onClick={handleFullReset}
					disabled={isLoading}
				>
					{isLoading ? 'Скидання...' : 'Повне скидання PWA'}
				</Button>
			</div>

			<p className="text-xs text-muted-foreground">
				💡 Порада: Якщо виникли проблеми з PWA, спробуйте "Повне скидання PWA"
			</p>
		</div>
	);
};

export default PwaManagement;
