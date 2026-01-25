import { CATEGORIES_DISHES, CATEGORIES_PRODUCTS } from '@/constants';

export const categoryBadgeMap: Record<string, string> = [
	...CATEGORIES_DISHES,
	...CATEGORIES_PRODUCTS,
].reduce(
	(acc, category) => {
		if (category.badgeClass) {
			acc[category.name] = category.badgeClass;
		}
		return acc;
	},
	{} as Record<string, string>,
);
