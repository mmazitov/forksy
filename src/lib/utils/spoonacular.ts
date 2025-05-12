import { env } from './schemas/env.zod';

const BASE_URL = 'https://api.spoonacular.com';

export const searchFood = async (query: string) => {
	const params = new URLSearchParams({
		apiKey: env.SPOONACULAR_KEY,
		query,
		language: 'uk', // используем русский, так как украинский пока не поддерживается
		number: '1',
	});

	try {
		// Поиск ингредиентов
		const response = await fetch(
			`${BASE_URL}/food/ingredients/search?${params}`,
		);
		const data = await response.json();

		if (!response.ok) {
			console.error('Spoonacular API Error:', data);
			throw new Error(data.message || 'Failed to fetch food search results');
		}

		// Получаем детальную информацию для каждого ингредиента
		const results = await Promise.all(
			data.results.map(async (item: any) => {
				const nutritionParams = new URLSearchParams({
					apiKey: env.SPOONACULAR_KEY,
					amount: '100',
					unit: 'g',
					language: 'uk',
				});

				const nutritionResponse = await fetch(
					`${BASE_URL}/food/ingredients/${item.id}/information?${nutritionParams}`,
				);
				const nutritionData = await nutritionResponse.json();
				const nutrition = nutritionData.nutrition?.nutrients || [];

				const findNutrient = (name: string) =>
					nutrition.find((n: any) => n.name.toLowerCase().includes(name))
						?.amount || 0;

				return {
					id: item.id,
					name: item.name,
					image: `https://spoonacular.com/cdn/ingredients_250x250/${item.image}`,
					calories: findNutrient('calor'),
					protein: findNutrient('protein'),
					fat: findNutrient('fat'),
					carbs: findNutrient('carbohydrate'),
				};
			}),
		);

		return {
			searchResults: [
				{
					results,
				},
			],
		};
	} catch (error) {
		console.error('Search food error:', error);
		throw error;
	}
};

export const getFoodDetails = async (id: number) => {
	const params = new URLSearchParams({
		apiKey: env.SPOONACULAR_KEY,
		language: 'uk',
	});

	const response = await fetch(`${BASE_URL}/food/products/${id}?${params}`);
	if (!response.ok) {
		throw new Error('Failed to fetch food details');
	}

	return response.json();
};
