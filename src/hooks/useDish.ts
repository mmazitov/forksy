import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Ingredient, useFormList } from './useFormList';

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

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: defaultDishValues,
	});

	// Lists for ingredients and instructions
	const ingredientsList = useFormList<Ingredient>({ name: '', amount: '' });
	const instructionsList = useFormList<string>('');

	const onSubmit = async (data: DishFormData) => {
		// Filter out empty values
		const filteredIngredients = ingredientsList.items
			.filter((i) => i.name.trim())
			.map((i) => `${i.name}${i.amount ? ` - ${i.amount}` : ''}`);

		const filteredInstructions = instructionsList.items.filter((i) => i.trim());

		if (filteredIngredients.length === 0) {
			toast.error('Додайте хоча б один інгредієнт');
			return;
		}

		if (filteredInstructions.length === 0) {
			toast.error('Додайте хоча б один крок приготування');
			return;
		}

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
					ingredients: filteredIngredients,
					instructions: filteredInstructions,
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
		ingredientsList,
		instructionsList,
	};
};

interface UseEditDishOptions {
	ingredients?: Ingredient[];
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

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: initialData || defaultDishValues,
	});

	// Lists for ingredients and instructions with initial values
	const ingredientsList = useFormList<Ingredient>(
		{ name: '', amount: '' },
		options?.ingredients,
	);
	const instructionsList = useFormList<string>('', options?.instructions);

	const onSubmit = async (data: DishFormData) => {
		// Filter out empty values
		const filteredIngredients = ingredientsList.items
			.filter((i) => i.name.trim())
			.map((i) => `${i.name}${i.amount ? ` - ${i.amount}` : ''}`);

		const filteredInstructions = instructionsList.items.filter((i) => i.trim());

		if (filteredIngredients.length === 0) {
			toast.error('Додайте хоча б один інгредієнт');
			return;
		}

		if (filteredInstructions.length === 0) {
			toast.error('Додайте хоча б один крок приготування');
			return;
		}

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
					ingredients: filteredIngredients,
					instructions: filteredInstructions,
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
		ingredientsList,
		instructionsList,
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
