'use client';

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface NutritionSearchProps {
	onNutritionSelect: (nutrition: NutritionData) => void;
}

export interface NutritionData {
	name?: string;
	calories?: number;
	protein?: number;
	fat?: number;
	carbohydrates?: number;
	fiber?: number;
}

const NutritionSearch = ({ onNutritionSelect }: NutritionSearchProps) => {
	const [mounted, setMounted] = useState(false);
	const [productName, setProductName] = useState('');
	const [searchResults, setSearchResults] = useState<NutritionData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Ensure component is only rendered on the client
	useEffect(() => {
		setMounted(true);
	}, []);

	const handleSearch = async () => {
		if (!productName.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			// Determine search query language and add appropriate nutrition facts search terms
			const searchQuery = createMultilingualSearchQuery(productName);
			const response = await fetch(
				`/api/search?q=${encodeURIComponent(searchQuery)}`,
			);

			if (!response.ok) {
				throw new Error('Failed to fetch nutrition information');
			}

			const data = await response.json();

			// Process search results to extract nutrition data
			const processedResults: NutritionData[] =
				data.items?.map((item: any) => {
					const snippet = item.snippet || '';
					const title = item.title || '';

					const nutritionData: NutritionData = {
						name: cleanProductName(title),
						calories: extractNumberFromText(
							snippet,
							'calories',
							'kcal',
							'cal',
							'калории',
							'ккал',
							'калорий',
							'калорії',
							'ккал',
						),
						protein: extractNumberFromText(
							snippet,
							'protein',
							'proteins',
							'белки',
							'белок',
							'протеин',
							'білки',
							'білок',
							'протеїн',
						),
						fat: extractNumberFromText(
							snippet,
							'fat',
							'fats',
							'total fat',
							'жиры',
							'жир',
							'жирность',
							'жири',
							'жир',
						),
						carbohydrates: extractNumberFromText(
							snippet,
							'carbohydrate',
							'carbs',
							'total carbohydrate',
							'углеводы',
							'углевод',
							'угл',
							'вуглеводи',
							'вуглевод',
						),
						fiber: extractNumberFromText(
							snippet,
							'fiber',
							'dietary fiber',
							'клетчатка',
							'волокна',
							'пищевые волокна',
							'клітковина',
							'волокна',
							'харчові волокна',
						),
					};

					return nutritionData;
				}) || [];

			setSearchResults(processedResults);
		} catch (err) {
			console.error('Search error:', err);
			setError('Failed to fetch nutrition information. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	// Create search query with appropriate language terms
	const createMultilingualSearchQuery = (query: string): string => {
		// Check if query is likely Russian or Ukrainian
		const cyrillicPattern = /[а-яА-ЯёЁіІїЇєЄґҐ]/;
		if (cyrillicPattern.test(query)) {
			// If Cyrillic, check for Ukrainian specific characters
			const ukrainianPattern = /[іІїЇєЄґҐ]/;
			if (ukrainianPattern.test(query)) {
				return `${query} харчова цінність калорії білки жири вуглеводи`;
			} else {
				return `${query} пищевая ценность калории белки жиры углеводы`;
			}
		} else {
			// Default to English
			return `${query} nutrition facts calories protein fat carbohydrates`;
		}
	};

	// Clean product name from unnecessary words in multiple languages
	const cleanProductName = (title: string): string => {
		return (
			title
				// English
				.replace(/nutrition facts/i, '')
				.replace(/calories/i, '')
				.replace(/carbs/i, '')
				.replace(/protein/i, '')
				.replace(/fat/i, '')
				// Russian
				.replace(/пищевая ценность/i, '')
				.replace(/калории/i, '')
				.replace(/белки/i, '')
				.replace(/жиры/i, '')
				.replace(/углеводы/i, '')
				// Ukrainian
				.replace(/харчова цінність/i, '')
				.replace(/калорії/i, '')
				.replace(/білки/i, '')
				.replace(/жири/i, '')
				.replace(/вуглеводи/i, '')
				// Generic cleanup
				.replace(/\|/g, '')
				.replace(/\s+/g, ' ')
				.trim()
		);
	};

	// Enhanced number extraction from text for multilingual support
	const extractNumberFromText = (
		text: string,
		...keywords: string[]
	): number | undefined => {
		for (const keyword of keywords) {
			// Patterns for finding a number before or after a keyword
			const regexBefore = new RegExp(
				`(\\d+(?:[.,]\\d+)?)\\s*(?:g|mg|kcal|г|мг|ккал)?\\s*(?:of|из|із)?\\s*${keyword}`,
				'i',
			);
			const regexAfter = new RegExp(
				`${keyword}\\s*(?::|contains|is|=|-|содержит|составляет|містить|становить)\\s*(\\d+(?:[.,]\\d+)?)\\s*(?:g|mg|kcal|г|мг|ккал)?`,
				'i',
			);

			let match = text.match(regexBefore);
			if (match && match[1]) {
				// Handle comma as decimal separator in European/Russian formats
				return parseFloat(match[1].replace(',', '.'));
			}

			match = text.match(regexAfter);
			if (match && match[1]) {
				return parseFloat(match[1].replace(',', '.'));
			}
		}
		return undefined;
	};

	// Handle selection of a nutrition item
	const handleSelectNutrition = (nutrition: NutritionData) => {
		onNutritionSelect(nutrition);
	};

	// If not mounted yet, don't render to prevent hydration mismatch
	if (!mounted) {
		return null;
	}

	// Create a placeholder based on detected language
	const getPlaceholder = () => {
		const cyrillicPattern = /[а-яА-ЯёЁіІїЇєЄґҐ]/;
		if (cyrillicPattern.test(productName)) {
			const ukrainianPattern = /[іІїЇєЄґҐ]/;
			if (ukrainianPattern.test(productName)) {
				return 'Введіть назву продукту для пошуку';
			} else {
				return 'Введите название продукта для поиска';
			}
		}
		return 'Enter product name to search nutrition facts';
	};

	return (
		<div className="bg-[var(--white-color)] shadow-drop mb-[16px] p-4 border border-[var(--black-color-weak)] rounded-[var(--radius)]">
			<h2 className="font-semibold text-lg">Search Nutrition Facts</h2>

			<div className="flex gap-[16px]">
				<div className="flex-grow">
					<Input
						type="text"
						name="nutrition-search"
						placeholder={getPlaceholder()}
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
					{isLoading
						? productName.match(/[а-яА-ЯёЁ]/)
							? 'Поиск...'
							: productName.match(/[іІїЇєЄґҐ]/)
								? 'Пошук...'
								: 'Searching...'
						: productName.match(/[а-яА-ЯёЁ]/)
							? 'Поиск'
							: productName.match(/[іІїЇєЄґҐ]/)
								? 'Пошук'
								: 'Search'}
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
						{productName.match(/[а-яА-ЯёЁ]/) && !productName.match(/[іІїЇєЄґҐ]/)
							? 'Результаты:'
							: productName.match(/[іІїЇєЄґҐ]/)
								? 'Результати:'
								: 'Results:'}
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
										<div>
											{productName.match(/[а-яА-ЯёЁ]/) &&
											!productName.match(/[іІїЇєЄґҐ]/)
												? 'Калории: '
												: productName.match(/[іІїЇєЄґҐ]/)
													? 'Калорії: '
													: 'Calories: '}
											{nutrition.calories}
										</div>
									)}
									{nutrition.protein !== undefined && (
										<div>
											{productName.match(/[а-яА-ЯёЁ]/) &&
											!productName.match(/[іІїЇєЄґҐ]/)
												? 'Белки: '
												: productName.match(/[іІїЇєЄґҐ]/)
													? 'Білки: '
													: 'Protein: '}
											{nutrition.protein}г
										</div>
									)}
									{nutrition.fat !== undefined && (
										<div>
											{productName.match(/[а-яА-ЯёЁ]/) &&
											!productName.match(/[іІїЇєЄґҐ]/)
												? 'Жиры: '
												: productName.match(/[іІїЇєЄґҐ]/)
													? 'Жири: '
													: 'Fat: '}
											{nutrition.fat}г
										</div>
									)}
									{nutrition.carbohydrates !== undefined && (
										<div>
											{productName.match(/[а-яА-ЯёЁ]/) &&
											!productName.match(/[іІїЇєЄґҐ]/)
												? 'Углеводы: '
												: productName.match(/[іІїЇєЄґҐ]/)
													? 'Вуглеводи: '
													: 'Carbs: '}
											{nutrition.carbohydrates}г
										</div>
									)}
									{nutrition.fiber !== undefined && (
										<div>
											{productName.match(/[а-яА-ЯёЁ]/) &&
											!productName.match(/[іІїЇєЄґҐ]/)
												? 'Клетчатка: '
												: productName.match(/[іІїЇєЄґҐ]/)
													? 'Клітковина: '
													: 'Fiber: '}
											{nutrition.fiber}г
										</div>
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
