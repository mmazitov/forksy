import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { skipWaitingAndReload } from '@/hooks/useServiceWorker';

const PwaUpdatePrompt = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false);

	useEffect(() => {
		const handleUpdate = () => {
			setUpdateAvailable(true);

			toast.info('Доступна нова версія додатку', {
				description: 'Оновіть сторінку, щоб отримати останні зміни',
				duration: Infinity,
				action: {
					label: 'Оновити',
					onClick: () => {
						skipWaitingAndReload();
					},
				},
			});
		};

		window.addEventListener('pwa-update-available', handleUpdate);

		return () => {
			window.removeEventListener('pwa-update-available', handleUpdate);
		};
	}, []);

	return null;
};

export default PwaUpdatePrompt;
