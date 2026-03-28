import { ApolloCache } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { prepareDishFormData } from '../lib/dishHelpers';

import { useFavorite } from '@/features/favorites';
import {
	DishesDocument,
	FavoriteDishesDocument,
	FavoriteDishesQuery,
	useAddToFavoritesDishMutation,
	useCreateDishMutation,
	useDeleteDishMutation,
	useRemoveFromFavoritesDishMutation,
	useUpdateDishMutation,
} from '@/shared/api/graphql';
import { useFormList, useFormPersist } from '@/shared/hooks';
import { DishSchema } from '@/shared/lib/utils/schemas';
import { DishFormData, FormIngredient } from '@/shared/types';

const defaultDishValues: DishFormData = {
	name: '',
	category: '',
	imageUrl: '',
	calories: 0,
	protein: 0,
	fat: 0,
	carbs: 0,
	description: '',
	prepTime: 0,
	servings: 0,
	ingredients: [''],
	instructions: [''],
};

export const useAddDish = () => {
	const navigate = useNavigate();
	const [createDish, { loading }] = useCreateDishMutation({
		refetchQueries: [{ query: DishesDocument }],
		awaitRefetchQueries: true,
	});

	const form = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: defaultDishValues,
	});

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = form;

	const ingredientsList = useFormList<FormIngredient>({ name: '', amount: '' });
	const instructionsList = useFormList<string>('');

	const { clearDraft } = useFormPersist({
		form,
		storageKey: 'draft-dish-add',
	});

	const onSubmit = async (data: DishFormData) => {
		const preparedData = prepareDishFormData(ingredientsList, instructionsList);
		if (!preparedData) return;

		const { filteredIngredients, filteredInstructions } = preparedData;

		try {
			await createDish({
				variables: {
					name: data.name,
					category: data.category,
					imageUrl: data.imageUrl || undefined,
					calories: data.calories,
					protein: data.protein,
					fat: data.fat,
					carbs: data.carbs,
					prepTime: data.prepTime,
					servings: data.servings,
					description: data.description || undefined,
					ingredients: filteredIngredients,
					instructions: filteredInstructions,
				},
			});
			clearDraft();
			toast.success('Страву успішно додано!');
			navigate('/dishes');
		} catch (error) {
			toast.error('Помилка при додаванні страви');
			if (import.meta.env.DEV) console.error(error);
		}
	};

	return {
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		loading,
		ingredientsList,
		instructionsList,
		setValue,
	};
};

interface UseEditDishOptions {
	ingredients?: FormIngredient[];
	instructions?: string[];
}

export const useEditDish = (
	dishId: string,
	initialData?: Partial<DishFormData>,
	options?: UseEditDishOptions,
) => {
	const navigate = useNavigate();
	const [updateDish, { loading }] = useUpdateDishMutation({
		refetchQueries: [{ query: DishesDocument }],
		awaitRefetchQueries: true,
	});

	const form = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: initialData || defaultDishValues,
	});

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = form;

	const ingredientsList = useFormList<FormIngredient>(
		{ name: '', amount: '' },
		options?.ingredients,
	);
	const instructionsList = useFormList<string>('', options?.instructions);

	const { clearDraft } = useFormPersist({
		form,
		storageKey: `draft-dish-edit-${dishId}`,
	});

	const onSubmit = async (data: DishFormData) => {
		const preparedData = prepareDishFormData(ingredientsList, instructionsList);
		if (!preparedData) return;

		const { filteredIngredients, filteredInstructions } = preparedData;

		try {
			await updateDish({
				variables: {
					id: dishId,
					name: data.name,
					category: data.category,
					imageUrl: data.imageUrl || undefined,
					calories: data.calories,
					protein: data.protein,
					fat: data.fat,
					carbs: data.carbs,
					prepTime: data.prepTime,
					servings: data.servings,
					description: data.description || undefined,
					ingredients: filteredIngredients,
					instructions: filteredInstructions,
				},
			});
			clearDraft();
			toast.success('Страву успішно оновлено!');
			navigate('/dishes');
		} catch (error) {
			toast.error('Помилка при оновленні страви');
			if (import.meta.env.DEV) console.error(error);
		}
	};

	return {
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		loading,
		ingredientsList,
		instructionsList,
		setValue,
	};
};

export const useDeleteDish = (dishId: string) => {
	const navigate = useNavigate();
	const [deleteDish, { loading }] = useDeleteDishMutation();

	const handleDelete = async () => {
		try {
			await deleteDish({
				variables: { id: dishId },
				update: (cache) => {
					cache.evict({
						id: cache.identify({ __typename: 'Dish', id: dishId }),
					});
					cache.gc();
				},
			});
			toast.success('Страву успішно видалено!');
			navigate('/dishes');
		} catch (error) {
			toast.error('Помилка при видаленні страви');
			if (import.meta.env.DEV) console.error(error);
		}
	};

	return { handleDelete, loading };
};

export const useFavoriteDish = (dishId: string, isFavorite: boolean) => {
	const [addToFavoritesDish] = useAddToFavoritesDishMutation();
	const [removeFromFavoritesDish] = useRemoveFromFavoritesDishMutation();

	return useFavorite({
		entityType: 'Dish',
		entityId: dishId,
		isFavorite,
		addMutation: addToFavoritesDish,
		removeMutation: removeFromFavoritesDish,
		refetchQueries: [{ query: FavoriteDishesDocument }],
		onUpdate: (cache: ApolloCache) => {
			if (isFavorite) {
				try {
					const data = cache.readQuery<FavoriteDishesQuery>({
						query: FavoriteDishesDocument,
					});
					if (data?.favoriteDishes) {
						cache.writeQuery({
							query: FavoriteDishesDocument,
							data: {
								...data,
								favoriteDishes: data.favoriteDishes.filter(
									(dish: { id: string }) => dish.id !== dishId,
								),
							},
						});
					}
				} catch {
					/* empty */
				}
			}
		},
	});
};
