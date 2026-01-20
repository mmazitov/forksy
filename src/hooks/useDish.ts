import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
	DishesDocument,
	useAddToFavoritesDishMutation,
	useCreateDishMutation,
	useDeleteDishMutation,
	useRemoveFromFavoritesDishMutation,
	useUpdateDishMutation,
} from '@/lib/graphql';
import { DishSchema } from '@/lib/utils/schemas';

interface DishFormData {
	name: string;
	category: string;
	imageUrl?: string;
	description?: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
	prepTime: number;
	servings: number;
	ingredients: string[];
	instructions: string[];
}

export const useAddDish = () => {
	const navigate = useNavigate();
	const [createDish, { loading }] = useCreateDishMutation({
		refetchQueries: [{ query: DishesDocument }],
		awaitRefetchQueries: true,
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: {
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
		},
	});

	const onSubmit = async (data: DishFormData) => {
		try {
			await createDish({
				variables: {
					name: data.name,
					category: data.category,
					imageUrl: data.imageUrl || undefined,
					calories: data.calories,
					prepTime: data.prepTime,
					servings: data.servings,
					description: data.description || undefined,
					ingredients: data.ingredients,
					instructions: data.instructions,
				},
			});
			toast.success('Страву успішно додано!');
			navigate('/dishes');
		} catch (error) {
			toast.error('Помилка при додаванні страви');
			console.error(error);
		}
	};

	return {
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		loading,
	};
};

export const useEditDish = (
	dishId: string,
	initialData?: Partial<DishFormData>,
) => {
	const navigate = useNavigate();
	const [updateDish, { loading }] = useUpdateDishMutation({
		refetchQueries: [{ query: DishesDocument }],
		awaitRefetchQueries: true,
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: initialData || {
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
		},
	});

	const onSubmit = async (data: DishFormData) => {
		try {
			await updateDish({
				variables: {
					id: dishId,
					name: data.name,
					category: data.category,
					imageUrl: data.imageUrl || undefined,
					calories: data.calories,
					prepTime: data.prepTime,
					servings: data.servings,
					description: data.description || undefined,
					ingredients: data.ingredients,
					instructions: data.instructions,
				},
			});
			toast.success('Страву успішно оновлено!');
			navigate('/dishes');
		} catch (error) {
			toast.error('Помилка при оновленні страви');
			console.error(error);
		}
	};

	return {
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		loading,
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
			console.error(error);
		}
	};

	return { handleDelete, loading };
};

export const useFavoriteDish = (dishId: string, isFavorite: boolean) => {
	const [isFav, setIsFav] = useState(isFavorite);
	const [addToFavoritesDish] = useAddToFavoritesDishMutation();
	const [removeFromFavoritesDish] = useRemoveFromFavoritesDishMutation();

	const toggleFavorite = async () => {
		const previousState = isFav;
		const newState = !isFav;

		// Optimistic update
		setIsFav(newState);

		try {
			if (newState) {
				await addToFavoritesDish({ variables: { dishId } });
				toast.success('Додано до обраного!');
			} else {
				await removeFromFavoritesDish({ variables: { dishId } });
				toast.success('Видалено з обраного!');
			}
		} catch (error) {
			// Revert on error
			setIsFav(previousState);
			toast.error('Помилка при зміні обраного');
			console.error(error);
		}
	};

	return { isFav, toggleFavorite };
};
