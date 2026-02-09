import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useFavorite } from './useFavorite';

import {
	ProductsDocument,
	useAddToFavoritesProductMutation,
	useCreateProductMutation,
	useDeleteProductMutation,
	useRemoveFromFavoritesProductMutation,
	useUpdateProductMutation,
} from '@/lib/graphql';
import { ProductSchema } from '@/lib/utils/schemas';
import { ProductFormData } from '@/types';

type MutationFunction = (options?: Record<string, unknown>) => Promise<unknown>;

export const useAddProduct = () => {
	const navigate = useNavigate();
	const [createProduct, { loading }] = useCreateProductMutation({
		refetchQueries: [{ query: ProductsDocument }],
		awaitRefetchQueries: true,
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ProductFormData>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			name: '',
			category: '',
			imageUrl: '',
			calories: 0,
			protein: 0,
			fat: 0,
			carbs: 0,
			description: '',
		},
	});

	const onSubmit = async (data: ProductFormData) => {
		try {
			await createProduct({
				variables: {
					name: data.name,
					category: data.category,
					imageUrl: data.imageUrl || undefined,
					calories: data.calories,
					protein: data.protein,
					fat: data.fat,
					carbs: data.carbs,
					description: data.description || undefined,
				},
			});
			toast.success('Продукт успішно додано!');
			navigate('/products');
		} catch (error) {
			toast.error('Помилка при додаванні продукту');
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

export const useEditProduct = (
	productId: string,
	initialData?: Partial<ProductFormData>,
) => {
	const navigate = useNavigate();
	const [updateProduct, { loading }] = useUpdateProductMutation({
		refetchQueries: [{ query: ProductsDocument }],
		awaitRefetchQueries: true,
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ProductFormData>({
		resolver: zodResolver(ProductSchema),
		defaultValues: initialData || {
			name: '',
			category: '',
			imageUrl: '',
			calories: 0,
			protein: 0,
			fat: 0,
			carbs: 0,
			description: '',
		},
	});

	const onSubmit = async (data: ProductFormData) => {
		try {
			await updateProduct({
				variables: {
					id: productId,
					name: data.name,
					category: data.category,
					imageUrl: data.imageUrl || undefined,
					calories: data.calories,
					protein: data.protein,
					fat: data.fat,
					carbs: data.carbs,
					description: data.description || undefined,
				},
			});
			toast.success('Продукт успішно оновлено!');
			navigate('/products');
		} catch (error) {
			toast.error('Помилка при оновленні продукту');
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

export const useDeleteProduct = (productId: string) => {
	const navigate = useNavigate();
	const [deleteProduct, { loading }] = useDeleteProductMutation();

	const handleDelete = async () => {
		try {
			await deleteProduct({
				variables: { id: productId },
				update: (cache) => {
					cache.evict({
						id: cache.identify({ __typename: 'Product', id: productId }),
					});
					cache.gc();
				},
			});
			toast.success('Продукт успішно видалено!');
			navigate('/products');
		} catch (error) {
			toast.error('Помилка при видаленні продукту');
			console.error(error);
		}
	};

	return { handleDelete, loading };
};

export const useFavoriteProduct = (productId: string, isFavorite: boolean) => {
	const [addToFavoritesProduct] = useAddToFavoritesProductMutation();
	const [removeFromFavoritesProduct] = useRemoveFromFavoritesProductMutation();

	return useFavorite({
		entityType: 'Product',
		entityId: productId,
		isFavorite,
		addMutation: addToFavoritesProduct as unknown as MutationFunction,
		removeMutation: removeFromFavoritesProduct as unknown as MutationFunction,
	});
};
