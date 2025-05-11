'use client';

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
	FatSecretFood,
	NutritionData,
	NutritionSearchProps,
} from '@/@types/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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
			const searchUrl = `/api/nutrition/search?q=${encodeURIComponent(productName.trim())}`;
			const response = await fetch(searchUrl);

			if (!response.ok) {
				throw new Error('Failed to fetch nutrition information');
			}

			const data = await response.json();
			const foods = data.foods?.food || [];

			// For each food item, fetch detailed nutrition information
			const processedResults: NutritionData[] = await Promise.all(
				foods.map(async (food: FatSecretFood) => {
					try {
						const detailsUrl = `/api/nutrition/details?id=${food.food_id}`;
						const detailsResponse = await fetch(detailsUrl);
						const detailsData = await detailsResponse.json();

						const serving = detailsData.food.servings.serving[0]; // Get first serving
						return {
							name: food.food_name,
							calories: serving ? parseFloat(serving.calories) : undefined,
							protein: serving ? parseFloat(serving.protein) : undefined,
							fat: serving ? parseFloat(serving.fat) : undefined,
							carbohydrates: serving
								? parseFloat(serving.carbohydrate)
								: undefined,
						};
					} catch (err) {
						console.error(
							`Failed to fetch details for ${food.food_name}:`,
							err,
						);
						return {
							name: food.food_name,
							calories: undefined,
							protein: undefined,
							fat: undefined,
							carbohydrates: undefined,
						};
					}
				}),
			);

			setSearchResults(processedResults);
		} catch (err) {
			console.error('Search error:', err);
			setError('Failed to fetch nutrition information. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSelectNutrition = (nutrition: NutritionData) => {
		onNutritionSelect(nutrition);
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
						placeholder="Пошук продукту"
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
								className="hover:bg-gray-50 p-3 border border-gray-200 rounded cursor-pointer"
								onClick={() => handleSelectNutrition(nutrition)}
							>
								<div className="font-medium">{nutrition.name}</div>
								<div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-2 text-sm">
									{nutrition.calories !== undefined && (
										<div>Калорії: {nutrition.calories}ккал</div>
									)}
									{nutrition.protein !== undefined && (
										<div>Білки: {nutrition.protein}г</div>
									)}
									{nutrition.fat !== undefined && (
										<div>Жири: {nutrition.fat}г</div>
									)}
									{nutrition.carbohydrates !== undefined && (
										<div>Вуглеводи: {nutrition.carbohydrates}г</div>
									)}
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
