'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NutritionData } from '@/@types/types';
import NutritionSearch from '@/components/search/NutritionSearch';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const AddProductPage = () => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		protein: '',
		carbohydrates: '',
		fat: '',
		fiber: '',
	});

	// This ensures the component only renders fully on the client side
	// to avoid hydration mismatch between server and client
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleNutritionSelect = (nutrition: NutritionData) => {
		setFormData((prev) => ({
			...prev,
			name: nutrition.name || prev.name,
			protein: nutrition.protein?.toString() || prev.protein,
			carbohydrates: nutrition.carbohydrates?.toString() || prev.carbohydrates,
			fat: nutrition.fat?.toString() || prev.fat,
			fiber: nutrition.fiber?.toString() || prev.fiber,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const formDataToSend = new FormData();
		Object.entries(formData).forEach(([key, value]) => {
			formDataToSend.append(key, value);
		});

		try {
			console.log('Sending request to create product...');
			const response = await fetch('/api/products/create', {
				method: 'POST',
				body: formDataToSend,
				headers: {
					// No Content-Type header when using FormData - browser sets it automatically with boundary
				},
			});

			console.log('Response status:', response.status);

			if (!response.ok) {
				let errorData;
				try {
					errorData = await response.json();
					console.error('Error response data:', errorData);
				} catch (jsonError) {
					console.error('Could not parse error response as JSON:', jsonError);
				}

				throw new Error(
					`Failed to add product: ${response.status} ${response.statusText}`,
				);
			}

			const result = await response.json();
			console.log('Product created successfully:', result);
			router.push('/');
		} catch (error) {
			console.error('Error adding product:', error);
		}
	};

	// Return a loading state or empty div until the component is mounted
	// This prevents hydration errors by ensuring the component renders only on the client
	if (!mounted) {
		return <div className="py-8">Loading...</div>;
	}

	return (
		<div className="py-8">
			<h1 className="mb-6 font-bold text-2xl">Add Product</h1>

			<NutritionSearch onNutritionSelect={handleNutritionSelect} />

			<form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
				<div>
					<label htmlFor="name" className="block font-medium">
						Name
					</label>
					<Input
						placeholder="Product name"
						name="name"
						type="text"
						id="name"
						value={formData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div>
					<label htmlFor="category" className="block font-medium">
						Category
					</label>
					<Input
						placeholder="Product Category"
						name="category"
						type="text"
						id="category"
						value={formData.category}
						onChange={handleInputChange}
					/>
				</div>

				<div className="gap-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
					<div>
						<label htmlFor="protein" className="block font-medium">
							Protein (g)
						</label>
						<Input
							placeholder="Product Protein"
							name="protein"
							type="text"
							id="protein"
							value={formData.protein}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="carbohydrates" className="block font-medium">
							Carbohydrates (g)
						</label>
						<Input
							placeholder="Product Carbohydrates"
							name="carbohydrates"
							type="text"
							id="carbohydrates"
							value={formData.carbohydrates}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="fat" className="block font-medium">
							Fat (g)
						</label>
						<Input
							placeholder="Product Fat"
							name="fat"
							type="text"
							id="fat"
							value={formData.fat}
							onChange={handleInputChange}
						/>
					</div>

					<div>
						<label htmlFor="fiber" className="block font-medium">
							Fiber (g)
						</label>
						<Input
							placeholder="Product Fiber"
							name="fiber"
							type="text"
							id="fiber"
							value={formData.fiber}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div>
					<Button type="submit">Add Product</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProductPage;
