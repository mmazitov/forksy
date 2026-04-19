import { gql } from '@apollo/client';

import {
	useDeleteSavedMenuMutation,
	useDuplicateSavedMenuMutation,
} from '@/shared/api/graphql';
import { useToast } from '@/shared/hooks';

export const useSavedMenuActions = () => {
	const { toast } = useToast();

	const [deleteMutation, { loading: deleteLoading }] =
		useDeleteSavedMenuMutation({
			update(cache, { data }) {
				if (data?.deleteSavedMenu) {
					cache.modify({
						fields: {
							savedMenus(existingMenus = [], { readField }) {
								return existingMenus.filter(
									// eslint-disable-next-line @typescript-eslint/no-explicit-any
									(menuRef: any) =>
										readField('id', menuRef) !== data.deleteSavedMenu.id,
								);
							},
						},
					});
				}
			},
			onCompleted: (data) => {
				toast({
					title: 'Меню видалено',
					description: `Меню "${data.deleteSavedMenu.name}" успішно видалено`,
				});
			},
			onError: (error) => {
				toast({
					title: 'Помилка',
					description: error.message,
					variant: 'destructive',
				});
			},
		});

	const [duplicateMutation, { loading: duplicateLoading }] =
		useDuplicateSavedMenuMutation({
			update(cache, { data }) {
				if (data?.duplicateSavedMenu) {
					cache.modify({
						fields: {
							savedMenus(existingMenus = []) {
								const newMenuRef = cache.writeFragment({
									data: data.duplicateSavedMenu,
									fragment: gql`
										fragment NewSavedMenu on SavedMenu {
											id
											name
											startDate
											endDate
											weekNumber
											totalDishes
											totalCalories
											totalProtein
											totalFat
											totalCarbs
											createdAt
											updatedAt
										}
									`,
								});
								return [newMenuRef, ...existingMenus];
							},
						},
					});
				}
			},
			onCompleted: (data) => {
				toast({
					title: 'Меню дубльовано',
					description: `Створено копію меню "${data.duplicateSavedMenu.name}"`,
				});
			},
			onError: (error) => {
				toast({
					title: 'Помилка',
					description: error.message,
					variant: 'destructive',
				});
			},
		});

	const handleDelete = async (id: string) => {
		try {
			await deleteMutation({ variables: { id } });
		} catch (error) {
			console.error('Delete error:', error);
		}
	};

	const handleDuplicate = async (id: string) => {
		try {
			await duplicateMutation({ variables: { id } });
		} catch (error) {
			console.error('Duplicate error:', error);
		}
	};

	return {
		handleDelete,
		handleDuplicate,
		isDeleting: deleteLoading,
		isDuplicating: duplicateLoading,
	};
};
