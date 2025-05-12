'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
	NutritionData,
	NutritionSearchProps,
	SpoonacularFoodItem,
} from '@/@types/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { findEnglishName } from '@/data/foodTranslations';

const NutritionSearch = ({ onNutritionSelect }: NutritionSearchProps) => {
	const [mounted, setMounted] = useState(false);
	const [productName, setProductName] = useState('');
	const [searchResults, setSearchResults] = useState<NutritionData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSearch = async () => {
		if (!productName.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			const englishQuery = findEnglishName(productName);
			const searchUrl = `/api/nutrition/search?q=${encodeURIComponent(englishQuery)}`;
			const response = await fetch(searchUrl);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to fetch nutrition information');
			}

			const foods = data.searchResults?.[0]?.results || [];

			const processedResults: NutritionData[] = foods.map(
				(food: SpoonacularFoodItem) => ({
					id: food.id,
					name: productName.trim(), // Используем оригинальное украинское название
					calories: Math.round(food.calories || 0),
					protein: Math.round(food.protein || 0),
					fat: Math.round(food.fat || 0),
					carbohydrates: Math.round(food.carbs || 0),
					image: food.image || null,
				}),
			);

			setSearchResults(processedResults);

			if (processedResults.length === 0) {
				setError('За вашим запитом нічого не знайдено');
			}
		} catch (err) {
			console.error('Search error:', err);
			setError(
				'Помилка при отриманні інформації про продукт. Спробуйте ще раз.',
			);
		} finally {
			setIsLoading(false);
		}
	};

	if (!mounted) {
		return null;
	}

	return (
		<div className="bg-[var(--white-color)] shadow-drop mb-[var(--space)] p-[var(--space)] border border-[var(--black-color-weak)] rounded-[var(--radius)]">
			<h2 className="font-semibold text-lg">Пошук продукту</h2>

			<div className="flex gap-[16px]">
				<div className="flex-grow">
					<Input
						type="text"
						name="nutrition-search"
						placeholder="Введіть назву продукту"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
						icon={<FaSearch />}
						showIcon={true}
					/>
				</div>
				<Button
					type="button"
					className="min-w-[100px]"
					onClick={handleSearch}
					disabled={isLoading}
				>
					{isLoading ? 'Пошук...' : 'Пошук'}
				</Button>
			</div>

			{error && (
				<div className="bg-red-100 mb-4 p-3 border border-red-400 rounded text-red-700">
					{error}
				</div>
			)}

			{searchResults.length > 0 && (
				<div className="mt-4">
					<h3 className="mb-2 font-medium">
						Результати пошуку для: {productName}
					</h3>
					<div className="space-y-3 max-h-[300px] overflow-y-auto">
						{searchResults.map((nutrition, index) => (
							<div
								key={index}
								className="flex items-start gap-4 hover:bg-gray-50 p-3 border border-gray-200 rounded cursor-pointer"
								onClick={() => onNutritionSelect(nutrition)}
							>
								{nutrition.image && (
									<div className="flex-shrink-0">
										<Image
											src={nutrition.image}
											alt={nutrition.name || ''}
											width={80}
											height={80}
											className="rounded-md object-cover"
										/>
									</div>
								)}
								<div className="flex-grow">
									<div className="font-medium">{nutrition.name}</div>
									<div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-2 text-sm">
										<div>
											Калорії: {Math.round(nutrition.calories || 0)} ккал
										</div>
										<div>Білки: {Math.round(nutrition.protein || 0)}г</div>
										<div>Жири: {Math.round(nutrition.fat || 0)}г</div>
										<div>
											Вуглеводи: {Math.round(nutrition.carbohydrates || 0)}г
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default NutritionSearch;
