// Google Search API Response Types
export interface GoogleSearchResult {
	kind: string;
	url: {
		type: string;
		template: string;
	};
	queries: {
		request: GoogleSearchRequest[];
		nextPage: GoogleSearchRequest[];
	};
	context: {
		title: string;
	};
	searchInformation: {
		searchTime: number;
		formattedSearchTime: string;
		totalResults: string;
		formattedTotalResults: string;
	};
	items: GoogleSearchItem[];
}

export interface GoogleSearchRequest {
	title: string;
	totalResults: string;
	searchTerms: string;
	count: number;
	startIndex: number;
	inputEncoding: string;
	outputEncoding: string;
	safe: string;
	cx: string;
}

export interface GoogleSearchItem {
	kind: string;
	title: string;
	htmlTitle: string;
	link: string;
	displayLink: string;
	snippet: string;
	htmlSnippet: string;
	cacheId: string;
	formattedUrl: string;
	htmlFormattedUrl: string;
	pagemap?: {
		cse_thumbnail?: {
			src: string;
			width: string;
			height: string;
		}[];
		cse_image?: {
			src: string;
		}[];
		[key: string]: unknown;
	};
}

export interface NutritionSearchProps {
	// eslint-disable-next-line no-unused-vars
	onNutritionSelect: (nutrition: NutritionData) => void;
}

export interface NutritionData {
	name?: string;
	calories?: number;
	protein?: number;
	fat?: number;
	carbohydrates?: number;
	category?: number;
	image?: string;
	id?: number;
}

export interface FatSecretFood {
	food_id: string;
	food_name: string;
	food_type: string;
	food_description?: string;
	food_url: string;
	servings?: {
		serving: {
			calcium: string;
			calories: string;
			carbohydrate: string;
			cholesterol: string;
			fat: string;
			fiber: string;
			iron: string;
			protein: string;
			serving_description: string;
			serving_id: string;
			serving_size: string;
			sodium: string;
			sugar: string;
			vitamin_a: string;
			vitamin_c: string;
		};
	};
}

export interface FatSecretResponse {
	foods: {
		food: FatSecretFood[];
		max_results: string;
		page_number: string;
		total_results: string;
	};
}

export interface FatSecretDetailedFood {
	food: {
		food_id: string;
		food_name: string;
		servings: {
			serving: {
				calories: string;
				carbohydrate: string;
				protein: string;
				fat: string;
				serving_description: string;
				serving_url: string;
			}[];
		};
	};
}

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
