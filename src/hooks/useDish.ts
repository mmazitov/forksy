import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useFavorite } from './useFavorite';
import { useFormList } from './useFormList';

import {
	DishesDocument,
	useAddToFavoritesDishMutation,
	useCreateDishMutation,
	useDeleteDishMutation,
	useRemoveFromFavoritesDishMutation,
	useUpdateDishMutation,
} from '@/lib/graphql';
import { DishSchema } from '@/lib/utils/schemas';
import { DishFormData, FormIngredient } from '@/types';

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
		setValue,
		formState: { errors },
	} = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: defaultDishValues,
	});

	const ingredientsList = useFormList<FormIngredient>({ name: '', amount: '' });
	const instructionsList = useFormList<string>('');

	const onSubmit = async (data: DishFormData) => {
		const filteredIngredients = ingredientsList.items
			.filter((i) => i.name.trim())
			.map((i) => ({ name: i.name, amount: i.amount || '' }));

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

	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<DishFormData>({
		resolver: zodResolver(DishSchema),
		defaultValues: initialData || defaultDishValues,
	});

	const ingredientsList = useFormList<FormIngredient>(
		{ name: '', amount: '' },
		options?.ingredients,
	);
	const instructionsList = useFormList<string>('', options?.instructions);

	const onSubmit = async (data: DishFormData) => {
		const filteredIngredients = ingredientsList.items
			.filter((i) => i.name.trim())
			.map((i) => ({ name: i.name, amount: i.amount || '' }));

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
			console.error(error);
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
		queryName: 'favoriteDishes',
	});
};
