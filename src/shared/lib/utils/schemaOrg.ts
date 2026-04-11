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

/**
 * Prevents script tag injection in JSON-LD structured data.
 * Replaces </script sequences that could break the enclosing script tag.
 */
const sanitizeJsonLdString = (value: string): string =>
	value.replace(/<\/script/gi, '<\\/script');

export const generateRecipeSchema = (recipe: RecipeSchema) => {
	return {
		'@context': 'https://schema.org/',
		'@type': 'Recipe',
		name: sanitizeJsonLdString(recipe.name),
		description: sanitizeJsonLdString(recipe.description),
		image: recipe.image,
		author: {
			'@type': 'Organization',
			name: 'Mealvy',
		},
		prepTime: recipe.prepTime,
		cookTime: recipe.cookTime,
		totalTime: `PT${parseInt(recipe.prepTime) + parseInt(recipe.cookTime)}M`,
		recipeYield: `${recipe.servings} servings`,
		nutrition: {
			'@type': 'NutritionInformation',
			calories: `${recipe.calories} calories`,
		},
		recipeIngredient: recipe.ingredients.map(sanitizeJsonLdString),
		recipeInstructions: recipe.instructions.map((instruction, index) => ({
			'@type': 'HowToStep',
			position: index + 1,
			text: sanitizeJsonLdString(instruction),
		})),
	};
};

export const generateProductSchema = (product: ProductSchema) => {
	return {
		'@context': 'https://schema.org/',
		'@type': 'Product',
		name: sanitizeJsonLdString(product.name),
		description: sanitizeJsonLdString(product.description),
		image: product.image,
		brand: {
			'@type': 'Brand',
			name: sanitizeJsonLdString(product.brand),
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
		name: 'Mealvy',
		url: 'https://mealvy.com',
		logo: 'https://mealvy.com/logo.png',
		description: 'Your personal meal planner and recipe manager',
		sameAs: [
			'https://www.facebook.com/mealvy',
			'https://twitter.com/mealvy',
			'https://www.instagram.com/mealvy_app',
		],
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'Customer Support',
			email: 'support@mealvy.com',
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
