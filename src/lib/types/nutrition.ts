export interface NutritionSearchProps {
	// eslint-disable-next-line no-unused-vars
	onNutritionSelect: (nutrition: NutritionData) => void;
}

export interface NutritionData {
	nutrition?: {
		nutrients: NutrientInfo[];
	};
	name?: string;
	calories?: number;
	protein?: number;
	fat?: number;
	carbohydrates?: number;
	category?: number;
	image?: string;
	id?: number;
}

// ...existing FatSecret interfaces...
export interface SpoonacularSearchResult {
	searchResults: {
		results: SpoonacularFoodItem[];
		totalResults: number;
	}[];
}

export interface SpoonacularFoodItem {
	id: number;
	name: string;
	image: string;
	calories: number;
	protein: string;
	fat: string;
	carbs: string;
}

export interface SpoonacularFoodDetail {
	id: number;
	title: string;
	nutrition: {
		nutrients: {
			name: string;
			amount: number;
			unit: string;
		}[];
	};
}

export interface SpoonacularIngredient {
	id: number;
	name: string;
	image: string;
}

export interface NutrientInfo {
	name: string;
	amount: number;
	unit: string;
}
