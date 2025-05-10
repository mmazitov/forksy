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
	fiber?: number;
}
