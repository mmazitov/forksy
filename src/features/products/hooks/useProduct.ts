import { ApolloCache } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
	FavoriteProductsDocument,
	FavoriteProductsQuery,
	ProductsDocument,
	useAddToFavoritesProductMutation,
	useCreateProductMutation,
	useDeleteProductMutation,
	useRemoveFromFavoritesProductMutation,
	useUpdateProductMutation,
} from '@/shared/api/graphql';
import { useFormPersist } from '@/shared/hooks/useFormPersist';
import { ProductSchema } from '@/shared/lib/utils/schemas';
import { ProductFormData } from '@/shared/types';
import { useFavorite } from '@/shared/hooks';

export const useAddProduct = () => {
	const navigate = useNavigate();
	const [createProduct, { loading }] = useCreateProductMutation({
		refetchQueries: [{ query: ProductsDocument }],
		awaitRefetchQueries: true,
	});

	const form = useForm<ProductFormData>({
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

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = form;

	const { clearDraft } = useFormPersist({
		form,
		storageKey: 'draft-product-add',
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
			clearDraft();
			toast.success('Продукт успішно додано!');
			navigate('/products');
		} catch (error) {
			toast.error('Помилка при додаванні продукту');
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

	const form = useForm<ProductFormData>({
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

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = form;

	const { clearDraft } = useFormPersist({
		form,
		storageKey: `draft-product-edit-${productId}`,
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
			clearDraft();
			toast.success('Продукт успішно оновлено!');
			navigate('/products');
		} catch (error) {
			toast.error('Помилка при оновленні продукту');
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
			if (import.meta.env.DEV) console.error(error);
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
		addMutation: addToFavoritesProduct,
		removeMutation: removeFromFavoritesProduct,
		refetchQueries: [{ query: FavoriteProductsDocument }],
		onUpdate: (cache: ApolloCache) => {
			if (isFavorite) {
				try {
					const data = cache.readQuery<FavoriteProductsQuery>({
						query: FavoriteProductsDocument,
					});
					if (data?.favoriteProducts) {
						cache.writeQuery({
							query: FavoriteProductsDocument,
							data: {
								...data,
								favoriteProducts: data.favoriteProducts.filter(
									(product: { id: string }) => product.id !== productId,
								),
							},
						});
					}
				} catch {
					// Ignore if query is not in cache
				}
			}
		},
	});
};
