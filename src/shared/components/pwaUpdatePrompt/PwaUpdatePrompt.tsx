import { useEffect } from 'react';
import { toast } from 'sonner';

import { skipWaitingAndReload } from '@/shared/hooks';

const PwaUpdatePrompt = () => {
	useEffect(() => {
		const handleUpdate = () => {
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
