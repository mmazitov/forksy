'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createProduct } from '@/app/api/products/actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ProductAddFormProps } from '@/lib/types/types';
import { productSchema } from '@/lib/utils/schemas/validate';

type ProductFormData = z.infer<typeof productSchema>;

const ProductAddForm = ({ selectedNutrition }: ProductAddFormProps) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm<ProductFormData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: '',
			category: '',
			calories: null,
			protein: null,
			fat: null,
			carbohydrates: null,
			image: '',
		},
	});

	useEffect(() => {
		if (selectedNutrition) {
			setValue('name', selectedNutrition.name || '');
			setValue('calories', selectedNutrition.calories || 0);
			setValue('carbohydrates', selectedNutrition.carbohydrates || 0);
			setValue('fat', selectedNutrition.fat || 0);
			setValue('protein', selectedNutrition.protein || 0);
			setValue('image', selectedNutrition.image || '');
		}
	}, [selectedNutrition, setValue]);

	const onSubmit = async (data: ProductFormData) => {
		try {
			const result = await createProduct(data);

			if (result.success) {
				router.push('/products-list');
			} else {
				setError('root', { message: result.error });
			}
		} catch (error) {
			console.error('Error add product:', error);
		}
	};

	return (
		<>
			{errors.root && (
				<div className="bg-red-100 mb-4 p-3 border border-red-400 rounded text-red-700">
					{errors.root.message}
				</div>
			)}

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-[16px]"
			>
				<div>
					<label htmlFor="name" className="block font-medium">
						Назва
					</label>
					<Input
						{...register('name')}
						placeholder="Назва продукту"
						className={errors.name ? 'border-red-500' : ''}
					/>
				</div>

				<div>
					<label htmlFor="category" className="block font-medium">
						Категорія
					</label>
					<Input
						{...register('category')}
						placeholder="Категорія продукту"
						className={errors.category ? 'border-red-500' : ''}
					/>
				</div>

				<div>
					<label htmlFor="image" className="block font-medium">
						Зображення
					</label>
					<Input {...register('image')} placeholder="URL зображення" />
				</div>

				<div className="gap-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<label htmlFor="calories" className="block font-medium">
							Калорії (ккал)
						</label>
						<Input
							{...register('calories', { valueAsNumber: true })}
							type="number"
							placeholder="Калорії"
						/>
					</div>
					<div>
						<label htmlFor="protein" className="block font-medium">
							Білки (г)
						</label>
						<Input
							{...register('protein', { valueAsNumber: true })}
							type="number"
							placeholder="Білки"
						/>
					</div>
					<div>
						<label htmlFor="fat" className="block font-medium">
							Жири (г)
						</label>
						<Input
							{...register('fat', { valueAsNumber: true })}
							type="number"
							placeholder="Жири"
						/>
					</div>
					<div>
						<label htmlFor="carbohydrates" className="block font-medium">
							Вуглеводи (г)
						</label>
						<Input
							{...register('carbohydrates', { valueAsNumber: true })}
							type="number"
							placeholder="Вуглеводи"
						/>
					</div>
				</div>

				<div>
					<Button type="submit">Додати продукт</Button>
				</div>
			</form>
		</>
	);
};

export default ProductAddForm;
