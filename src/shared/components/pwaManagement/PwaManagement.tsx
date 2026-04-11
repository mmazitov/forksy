import { Button } from '@/shared/components/ui';
import { usePwaManagement } from '@/shared/hooks';
import { formatBytes } from '@/shared/lib/utils/pwa-utils';

const PwaManagement = () => {
	const {
		cacheInfo,
		isLoading,
		isServiceWorkerActive,
		handleClearCache,
		handleUnregisterSW,
		handleFullReset,
	} = usePwaManagement();

	return (
		<div className="border-border bg-card space-y-4 rounded-lg border p-4">
			<div>
				<h3 className="text-lg font-semibold">Управління PWA</h3>
				<p className="text-muted-foreground mt-2 text-sm">
					Керуйте кешем та сервіс-воркером вашого додатку
				</p>
			</div>

			<div className="bg-muted/50 space-y-2 rounded p-3">
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
								<ul className="mt-2 space-y-1 font-mono text-xs">
									{cacheInfo.cacheNames.map((name) => (
										<li key={name} className="text-muted-foreground truncate">
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

			<p className="text-muted-foreground text-xs">
				💡 Порада: Якщо виникли проблеми з PWA, спробуйте &ldquo;Повне скидання
				PWA&rdquo;
			</p>
		</div>
	);
};

export default PwaManagement;
