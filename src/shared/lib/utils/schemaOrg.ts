interface RecipeSchema {
	name: string;
	description: string;
	image: string;
	prepTime: string;
	cookTime: string;
	servings: number;
	calories: number;
	ingredients: string[];
	instructions: string[];
}

interface ProductSchema {
	name: string;
	description: string;
	image: string;
	brand: string;
	calories: number;
	protein: number;
	fat: number;
	carbs: number;
}

export const generateRecipeSchema = (recipe: RecipeSchema) => {
	return {
		'@context': 'https://schema.org/',
		'@type': 'Recipe',
		name: recipe.name,
		description: recipe.description,
		image: recipe.image,
		author: {
			'@type': 'Organization',
			name: 'Forksy',
		},
		prepTime: recipe.prepTime,
		cookTime: recipe.cookTime,
		totalTime: `PT${parseInt(recipe.prepTime) + parseInt(recipe.cookTime)}M`,
		recipeYield: `${recipe.servings} servings`,
		nutrition: {
			'@type': 'NutritionInformation',
			calories: `${recipe.calories} calories`,
		},
		recipeIngredient: recipe.ingredients,
		recipeInstructions: recipe.instructions.map((instruction, index) => ({
			'@type': 'HowToStep',
			position: index + 1,
			text: instruction,
		})),
	};
};

export const generateProductSchema = (product: ProductSchema) => {
	return {
		'@context': 'https://schema.org/',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		image: product.image,
		brand: {
			'@type': 'Brand',
			name: product.brand,
		},
		nutrition: {
			'@type': 'NutritionInformation',
			calories: `${product.calories} calories`,
			carbohydrateContent: `${product.carbs}g`,
			proteinContent: `${product.protein}g`,
			fatContent: `${product.fat}g`,
		},
	};
};

export const generateOrganizationSchema = () => {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Forksy',
		url: 'https://forksy.com',
		logo: 'https://forksy.com/logo.png',
		description: 'Your personal meal planner and recipe manager',
		sameAs: [
			'https://www.facebook.com/forksy',
			'https://twitter.com/forksy',
			'https://www.instagram.com/forksy_app',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Customer Support',
			email: 'support@forksy.com',
		},
	};
};

export const generateBreadcrumbSchema = (
	breadcrumbs: Array<{ name: string; url: string }>,
) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: breadcrumbs.map((crumb, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: crumb.name,
			item: crumb.url,
		})),
	};
};
