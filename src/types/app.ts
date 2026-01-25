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

export interface FormIngredient {
	name: string;
	amount: string;
	productId?: string;
}

export interface DishFormData {
	name: string;
	category: string;
	imageUrl?: string;
	description?: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
	prepTime: number;
	servings: number;
	ingredients: string[];
	instructions: string[];
}

export interface ProductFormData {
	name: string;
	category: string;
	imageUrl?: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
	description?: string;
}
