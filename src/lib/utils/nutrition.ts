import { UNIT_WEIGHTS } from '@/constants/nutrition';
import { IngredientForCalculation, NutritionInfo } from '@/types';

export const parseAmountToGrams = (amount: string): number | null => {
	const trimmed = amount.trim().toLowerCase();

	const match = trimmed.match(/^(\d+(?:[.,]\d+)?)\s*(.*)$/);
	if (!match) return null;

	const value = parseFloat(match[1].replace(',', '.'));
	const unit = match[2].trim();

	if (!unit) return value;

	const unitWeight = UNIT_WEIGHTS[unit];
	if (unitWeight !== undefined) {
		return value * unitWeight;
	}

	return null;
};

export const calculateNutrition = (
	ingredients: IngredientForCalculation[],
): NutritionInfo => {
	let totalCalories = 0;
	let totalProtein = 0;
	let totalFat = 0;
	let totalCarbs = 0;

	ingredients.forEach((ingredient) => {
		if (!ingredient.nutrition) return;

		const grams = parseAmountToGrams(ingredient.amount);
		if (grams === null) return;

		const multiplier = grams / 100;

		totalCalories += ingredient.nutrition.calories * multiplier;
		totalProtein += ingredient.nutrition.protein * multiplier;
		totalFat += ingredient.nutrition.fat * multiplier;
		totalCarbs += ingredient.nutrition.carbs * multiplier;
	});

	return {
		calories: Math.round(totalCalories),
		protein: Math.round(totalProtein * 10) / 10,
		fat: Math.round(totalFat * 10) / 10,
		carbs: Math.round(totalCarbs * 10) / 10,
	};
};
