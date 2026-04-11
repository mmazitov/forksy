import { describe, expect, it } from 'vitest';

import { calculateNutrition, parseAmountToGrams } from '../nutrition';

describe('parseAmountToGrams', () => {
	it('should parse plain numbers as grams', () => {
		expect(parseAmountToGrams('100')).toBe(100);
		expect(parseAmountToGrams('250')).toBe(250);
		expect(parseAmountToGrams('1.5')).toBe(1.5);
		expect(parseAmountToGrams('2,5')).toBe(2.5);
	});

	it('should parse grams with units', () => {
		expect(parseAmountToGrams('100г')).toBe(100);
		expect(parseAmountToGrams('100 г')).toBe(100);
		expect(parseAmountToGrams('100 грам')).toBe(100);
		expect(parseAmountToGrams('100 грамів')).toBe(100);
		expect(parseAmountToGrams('100g')).toBe(100);
	});

	it('should parse kilograms', () => {
		expect(parseAmountToGrams('1кг')).toBe(1000);
		expect(parseAmountToGrams('1 кг')).toBe(1000);
		expect(parseAmountToGrams('0.5 кг')).toBe(500);
		expect(parseAmountToGrams('2kg')).toBe(2000);
	});

	it('should parse pieces (штуки)', () => {
		expect(parseAmountToGrams('1шт')).toBe(60);
		expect(parseAmountToGrams('2 шт')).toBe(120);
		expect(parseAmountToGrams('3 штуки')).toBe(180);
		expect(parseAmountToGrams('1 штука')).toBe(60);
	});

	it('should parse tablespoons', () => {
		expect(parseAmountToGrams('1ст.л')).toBe(15);
		expect(parseAmountToGrams('2 ст.л.')).toBe(30);
		expect(parseAmountToGrams('1 столова ложка')).toBe(15);
		expect(parseAmountToGrams('3 столові ложки')).toBe(45);
	});

	it('should parse teaspoons', () => {
		expect(parseAmountToGrams('1ч.л')).toBe(5);
		expect(parseAmountToGrams('2 ч.л.')).toBe(10);
		expect(parseAmountToGrams('1 чайна ложка')).toBe(5);
		expect(parseAmountToGrams('3 чайні ложки')).toBe(15);
	});

	it('should parse glasses/cups', () => {
		expect(parseAmountToGrams('1склянка')).toBe(200);
		expect(parseAmountToGrams('2 склянки')).toBe(400);
		expect(parseAmountToGrams('1 стакан')).toBe(200);
		expect(parseAmountToGrams('0.5 стакана')).toBe(100);
	});

	it('should parse milliliters', () => {
		expect(parseAmountToGrams('100мл')).toBe(100);
		expect(parseAmountToGrams('250 мл')).toBe(250);
		expect(parseAmountToGrams('100ml')).toBe(100);
	});

	it('should parse liters', () => {
		expect(parseAmountToGrams('1л')).toBe(1000);
		expect(parseAmountToGrams('0.5 л')).toBe(500);
		expect(parseAmountToGrams('2l')).toBe(2000);
	});

	it('should parse pinches', () => {
		expect(parseAmountToGrams('1щіпка')).toBe(1);
		expect(parseAmountToGrams('2 щіпки')).toBe(2);
		expect(parseAmountToGrams('1 щепотка')).toBe(1);
	});

	it('should handle decimal numbers with comma', () => {
		expect(parseAmountToGrams('1,5г')).toBe(1.5);
		expect(parseAmountToGrams('2,5 кг')).toBe(2500);
	});

	it('should handle case insensitivity', () => {
		expect(parseAmountToGrams('100Г')).toBe(100);
		expect(parseAmountToGrams('1КГ')).toBe(1000);
		expect(parseAmountToGrams('1ШТ')).toBe(60);
	});

	it('should return null for invalid input', () => {
		expect(parseAmountToGrams('')).toBeNull();
		expect(parseAmountToGrams('abc')).toBeNull();
		expect(parseAmountToGrams('unknown unit')).toBeNull();
	});

	it('should handle whitespace', () => {
		expect(parseAmountToGrams('  100г  ')).toBe(100);
		expect(parseAmountToGrams('  2   шт  ')).toBe(120);
	});
});

describe('calculateNutrition', () => {
	const mockIngredient = (
		amount: string,
		nutrition: {
			calories: number;
			protein: number;
			fat: number;
			carbs: number;
		},
	) => ({
		amount,
		nutrition,
	});

	it('should calculate nutrition for single ingredient', () => {
		const ingredients = [
			mockIngredient('100г', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result).toEqual({
			calories: 100,
			protein: 10,
			fat: 5,
			carbs: 15,
		});
	});

	it('should calculate nutrition for multiple ingredients', () => {
		const ingredients = [
			mockIngredient('100г', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
			mockIngredient('200г', {
				calories: 50,
				protein: 5,
				fat: 2,
				carbs: 8,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result).toEqual({
			calories: 200,
			protein: 20,
			fat: 9,
			carbs: 31,
		});
	});

	it('should scale nutrition based on amount', () => {
		const ingredients = [
			mockIngredient('200г', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result).toEqual({
			calories: 200,
			protein: 20,
			fat: 10,
			carbs: 30,
		});
	});

	it('should handle fractional amounts', () => {
		const ingredients = [
			mockIngredient('50г', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result).toEqual({
			calories: 50,
			protein: 5,
			fat: 2.5,
			carbs: 7.5,
		});
	});

	it('should handle different units', () => {
		const ingredients = [
			mockIngredient('1кг', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result).toEqual({
			calories: 1000,
			protein: 100,
			fat: 50,
			carbs: 150,
		});
	});

	it('should skip ingredients without nutrition data', () => {
		const ingredients = [
			mockIngredient('100г', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
			{ amount: '100г', nutrition: null },
		];

		const result = calculateNutrition(ingredients);

		expect(result).toEqual({
			calories: 100,
			protein: 10,
			fat: 5,
			carbs: 15,
		});
	});

	it('should skip ingredients with invalid amounts', () => {
		const ingredients = [
			mockIngredient('100г', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
			mockIngredient('invalid', {
				calories: 50,
				protein: 5,
				fat: 2,
				carbs: 8,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result).toEqual({
			calories: 100,
			protein: 10,
			fat: 5,
			carbs: 15,
		});
	});

	it('should round calories to whole numbers', () => {
		const ingredients = [
			mockIngredient('33г', {
				calories: 100,
				protein: 10,
				fat: 5,
				carbs: 15,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result.calories).toBe(33);
		expect(Number.isInteger(result.calories)).toBe(true);
	});

	it('should round macros to one decimal place', () => {
		const ingredients = [
			mockIngredient('33г', {
				calories: 100,
				protein: 10.123,
				fat: 5.456,
				carbs: 15.789,
			}),
		];

		const result = calculateNutrition(ingredients);

		expect(result.protein).toBe(3.3);
		expect(result.fat).toBe(1.8);
		expect(result.carbs).toBe(5.2);
	});

	it('should handle empty ingredients array', () => {
		const result = calculateNutrition([]);

		expect(result).toEqual({
			calories: 0,
			protein: 0,
			fat: 0,
			carbs: 0,
		});
	});

	it('should handle complex recipe with multiple units', () => {
		const ingredients = [
			mockIngredient('200г', { calories: 100, protein: 10, fat: 5, carbs: 15 }),
			mockIngredient('2шт', { calories: 50, protein: 5, fat: 2, carbs: 8 }),
			mockIngredient('1ст.л', { calories: 200, protein: 0, fat: 20, carbs: 0 }),
		];

		const result = calculateNutrition(ingredients);

		expect(result.calories).toBe(290);
		expect(result.protein).toBe(26);
		expect(result.fat).toBe(15.4);
		expect(result.carbs).toBe(39.6);
	});
});
