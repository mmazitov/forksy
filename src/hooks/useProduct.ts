import { ProductsDocument, useCreateProductMutation } from '@/lib/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ProductSchema } from '@/lib/utils/schemas';

interface ProductFormData {
	name: string;
	category: string;
	imageUrl?: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
	description?: string;
}

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
