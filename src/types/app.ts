export interface NutritionInfo {
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
}

export interface ProductNutrition {
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
}

export interface IngredientForCalculation {
	amount: string;
	nutrition: ProductNutrition | null;
}
