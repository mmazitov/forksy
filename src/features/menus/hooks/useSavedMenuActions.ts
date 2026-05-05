import type { Reference } from '@apollo/client';
import { gql } from '@apollo/client';
import { toast } from 'sonner';

import {
	useDeleteSavedMenuMutation,
	useDuplicateSavedMenuMutation,
} from '@/shared/api/graphql';

export const useSavedMenuActions = () => {
	const [deleteMutation, { loading: deleteLoading }] =
		useDeleteSavedMenuMutation({
			update(cache, { data }) {
				if (data?.deleteSavedMenu) {
					cache.modify({
						fields: {
							savedMenus(existingMenus = [], { readField }) {
								return existingMenus.filter(
									(menuRef: Reference) =>
										readField('id', menuRef) !== data.deleteSavedMenu.id,
								);
							},
						},
					});
				}
			},
			onCompleted: (data) => {
				toast.success('Меню видалено', {
					description: `Меню "${data.deleteSavedMenu.name}" успішно видалено`,
				});
			},
			onError: (error) => {
				toast.error('Помилка', {
					description: error.message,
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
				toast.success('Меню дубльовано', {
					description: `Створено копію меню "${data.duplicateSavedMenu.name}"`,
				});
			},
			onError: (error) => {
				toast.error('Помилка', {
					description: error.message,
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
