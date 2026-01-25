import { FormIngredient } from '@/types';

export const parseIngredient = (ingredient: {
	name: string;
	amount: string;
}): FormIngredient => ({
	name: ingredient.name,
	amount: ingredient.amount,
	productId: undefined,
});

export const parseIngredients = <T extends { id: string; name: string }>(
	ingredients: Array<{ name: string; amount: string }>,
	productsByName: Map<string, T>,
): FormIngredient[] => {
	return ingredients.map((ingredient) => {
		const product = productsByName.get(ingredient.name);
		return {
			...parseIngredient(ingredient),
			productId: product?.id,
		};
	});
};

export const createProductsMap = <T extends { id: string; name: string }>(
	products: T[],
): Map<string, T> => {
	const map = new Map<string, T>();
	products.forEach((p) => map.set(p.name, p));
	return map;
};
