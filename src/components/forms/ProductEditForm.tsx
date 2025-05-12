'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateProduct } from '@/app/api/products/actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { closeModal } from '@/lib/redux/toggleModal/slice';

type ProductEditFormProps = {
	currentProduct: any;
};

const ProductEditForm = ({ currentProduct }: ProductEditFormProps) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		protein: '',
		carbohydrates: '',
		fat: '',
		calories: '',
	});

	useEffect(() => {
		if (currentProduct) {
			setFormData({
				name: currentProduct.name,
				category: currentProduct.category,
				protein: currentProduct.protein.toString(),
				carbohydrates: currentProduct.carbohydrates.toString(),
				fat: currentProduct.fat.toString(),
				calories: currentProduct.calories.toString(),
			});
		}
	}, [currentProduct]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const form = new FormData();
		form.append('id', currentProduct.id);
		Object.entries(formData).forEach(([key, value]) => {
			form.append(key, value.toString());
		});

		const result = await updateProduct(form);

		if (result.success) {
			dispatch(closeModal('isProductEdit'));
			router.refresh();
		} else {
			console.error('Error updating product:', result.error);
		}

		setIsLoading(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Input
				type="text"
				name="name"
				placeholder="Назва продукту"
				value={formData.name}
				onChange={handleChange}
			/>
			<Input
				type="text"
				name="category"
				placeholder="Категорія"
				value={formData.category}
				onChange={handleChange}
			/>
			<Input
				type="number"
				name="protein"
				placeholder="Білки"
				value={formData.protein}
				onChange={handleChange}
			/>
			<Input
				type="number"
				name="carbohydrates"
				placeholder="Вуглеводи"
				value={formData.carbohydrates}
				onChange={handleChange}
			/>
			<Input
				type="number"
				name="fat"
				placeholder="Жири"
				value={formData.fat}
				onChange={handleChange}
			/>
			<Input
				type="number"
				name="calories"
				placeholder="Калорії"
				value={formData.calories}
				onChange={handleChange}
			/>

			<div className="flex justify-end gap-2 mt-4">
				<Button
					type="button"
					variant="ghost"
					onClick={() => dispatch(closeModal('isProductEdit'))}
				>
					Скасувати
				</Button>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? 'Збереження...' : 'Зберегти'}
				</Button>
			</div>
		</form>
	);
};

export default ProductEditForm;
