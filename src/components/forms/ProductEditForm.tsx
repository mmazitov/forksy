'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { updateProduct } from '@/app/api/products/actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { closeModal } from '@/lib/redux/toggleModal/slice';
import { productSchema } from '@/lib/utils/schemas/validate';

type ProductFormData = z.infer<typeof productSchema>;

interface ProductEditFormProps {
	currentProduct: ProductFormData & { id: string };
}

const ProductEditForm = ({ currentProduct }: ProductEditFormProps) => {
	const dispatch = useDispatch();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
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
		if (currentProduct) {
			setValue('name', currentProduct.name);
			setValue('category', currentProduct.category);
			setValue('protein', currentProduct.protein);
			setValue('carbohydrates', currentProduct.carbohydrates);
			setValue('fat', currentProduct.fat);
			setValue('calories', currentProduct.calories);
			setValue('image', currentProduct.image || '');
		}
	}, [currentProduct, setValue]);

	const onSubmit = async (data: ProductFormData) => {
		try {
			const formData = new FormData();
			formData.append('id', currentProduct.id);
			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value?.toString() || '');
			});

			const result = await updateProduct(formData);

			if (result.success) {
				dispatch(closeModal('isProductEdit'));
				router.refresh();
			}
		} catch (error) {
			console.error('Error updating product:', error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-[calc(var(--space)/4)] space-y-4"
		>
			{errors.root && (
				<div className="bg-[var(--error-bg)] mb-4 p-3 border border-[var(--error-border)] rounded text-[var(--error-text)]">
					{errors.root.message}
				</div>
			)}

			<div className="mb-0">
				<label htmlFor="name" className="block font-medium">
					Назва
				</label>
				<Input
					{...register('name')}
					placeholder="Назва продукту"
					className={errors.name ? 'input-error' : ''}
				/>
			</div>

			<div className="mb-0">
				<label htmlFor="category" className="block font-medium">
					Категорія
				</label>
				<Input
					{...register('category')}
					placeholder="Категорія"
					className={errors.category ? 'input-error' : ''}
				/>
			</div>

			<div className="mb-0">
				<label htmlFor="calories" className="block font-medium">
					Калорії (ккал)
				</label>
				<Input
					{...register('calories', { valueAsNumber: true })}
					type="number"
					placeholder="Калорії"
				/>
			</div>

			<div className="mb-0">
				<label htmlFor="protein" className="block font-medium">
					Білки (г)
				</label>
				<Input
					{...register('protein', { valueAsNumber: true })}
					type="number"
					placeholder="Білки"
				/>
			</div>

			<div className="mb-0">
				<label htmlFor="fat" className="block font-medium">
					Жири (г)
				</label>
				<Input
					{...register('fat', { valueAsNumber: true })}
					type="number"
					placeholder="Жири"
				/>
			</div>

			<div className="mb-0">
				<label htmlFor="carbohydrates" className="block font-medium">
					Вуглеводи (г)
				</label>
				<Input
					{...register('carbohydrates', { valueAsNumber: true })}
					type="number"
					placeholder="Вуглеводи"
				/>
			</div>

			<div className="flex justify-end gap-2 mt-4">
				<Button
					type="button"
					variant="ghost"
					onClick={() => dispatch(closeModal('isProductEdit'))}
				>
					Скасувати
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Збереження...' : 'Зберегти'}
				</Button>
			</div>
		</form>
	);
};

export default ProductEditForm;
