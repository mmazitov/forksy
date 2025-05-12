'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NutritionData } from '@/@types/types';
import { createProduct } from '@/app/api/products/actions';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ProductAddFormProps {
	selectedNutrition?: NutritionData;
}

const ProductAddForm = ({ selectedNutrition }: ProductAddFormProps) => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		calories: '',
		protein: '',
		fat: '',
		carbohydrates: '',
		image: '',
	});

	useEffect(() => {
		if (selectedNutrition) {
			setFormData((prev) => ({
				...prev,
				name: selectedNutrition.name || prev.name,
				calories: selectedNutrition.calories?.toString() || prev.calories,
				carbohydrates:
					selectedNutrition.carbohydrates?.toString() || prev.carbohydrates,
				fat: selectedNutrition.fat?.toString() || prev.fat,
				protein: selectedNutrition.protein?.toString() || prev.protein,
				image: selectedNutrition.image || prev.image,
			}));
		}
	}, [selectedNutrition]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			formDataToSend.append(key, value);
		});

		try {
			const result = await createProduct(formDataToSend);

			if (result.success) {
				console.log('Product created successfully:', result.product);
				router.push('/products-list');
			} else {
				setError(result.error || 'Failed to create product');
				console.error('Failed to create product:', result.error);
			}
		} catch (error: any) {
			const errorMessage = error.message || 'Error adding product';
			setError(errorMessage);
			console.error('Error adding product:', error);
		}
	};

	return (
		<>
			{error && (
				<div className="bg-red-100 mb-4 p-3 border border-red-400 rounded text-red-700">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
				<div>
					<label htmlFor="name" className="block font-medium">
						Назва
					</label>
					<Input
						placeholder="Назва продукту"
						name="name"
						type="text"
						id="name"
						value={formData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="category" className="block font-medium">
						Категорія
					</label>
					<Input
						placeholder="Категорія продукту"
						name="category"
						type="text"
						id="category"
						value={formData.category}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="image" className="block font-medium">
						Зображення
					</label>
					<Input
						placeholder="URL зображення"
						name="image"
						type="text"
						id="image"
						value={formData.image}
						onChange={handleInputChange}
					/>
				</div>
				<div className="gap-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<label htmlFor="calories" className="block font-medium">
							Калорії (ккал)
						</label>
						<Input
							placeholder="Калорії"
							name="calories"
							type="number"
							id="calories"
							value={formData.calories}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="protein" className="block font-medium">
							Білки (г)
						</label>
						<Input
							placeholder="Білки"
							name="protein"
							type="number"
							id="protein"
							value={formData.protein}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="fat" className="block font-medium">
							Жири (г)
						</label>
						<Input
							placeholder="Жири"
							name="fat"
							type="number"
							id="fat"
							value={formData.fat}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor="carbohydrates" className="block font-medium">
							Вуглеводи (г)
						</label>
						<Input
							placeholder="Вуглеводи"
							name="carbohydrates"
							type="number"
							id="carbohydrates"
							value={formData.carbohydrates}
							onChange={handleInputChange}
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
