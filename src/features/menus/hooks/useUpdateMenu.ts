import { toast } from 'sonner';

import { useUpdateSavedMenuMutation } from '@/shared/api/graphql';

export const useUpdateMenu = () => {
	const [updateMutation, { loading }] = useUpdateSavedMenuMutation({
		onCompleted: (data) => {
			toast.success('Меню оновлено', {
				description: `Меню "${data.updateSavedMenu.name}" успішно оновлено`,
			});
		},
		onError: (error) => {
			toast.error('Помилка', {
				description: error.message,
			});
		},
	});

	const updateMenu = async (
		id: string,
		name: string,
		startDate: string,
		endDate: string,
	) => {
		try {
			await updateMutation({
				variables: {
					id,
					name,
					startDate,
					endDate,
				},
			});
		} catch (error) {
			console.error('Update menu error:', error);
		}
	};

	return {
		updateMenu,
		isUpdating: loading,
	};
};
