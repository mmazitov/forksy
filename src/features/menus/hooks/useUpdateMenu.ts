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
	): Promise<boolean> => {
		try {
			const result = await updateMutation({
				variables: { id, name, startDate, endDate },
			});
			return !!result.data;
		} catch {
			return false;
		}
	};

	return {
		updateMenu,
		isUpdating: loading,
	};
};
