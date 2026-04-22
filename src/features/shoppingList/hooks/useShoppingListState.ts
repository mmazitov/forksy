import { useCallback, useMemo, useState } from 'react';

import { GetPlannerItemsQuery } from '@/shared/api/graphql/planner.gen';
import { CATEGORIES_PRODUCTS } from '@/shared/constants';

interface AggregatedIngredient {
	name: string;
	totalAmount: number;
	unit: string;
	category: string;
	productId: string | null;
	checked: boolean;
}

export type PlannerItemData = GetPlannerItemsQuery['getPlannerItems'][number];

export const useShoppingListState = (plannerItemsData: PlannerItemData[]) => {
	const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

	const aggregatedIngredients = useMemo(() => {
		const ingredientMap = new Map<string, AggregatedIngredient>();

		plannerItemsData.forEach((item) => {
			if (!item.dish.ingredients) return;

			item.dish.ingredients.forEach((ingredient) => {
				const amountMatch = ingredient.amount.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
				const numericAmount = amountMatch ? parseFloat(amountMatch[1]) : 0;
				const unit = amountMatch ? amountMatch[2].trim() : ingredient.amount;

				const key = `${ingredient.name.toLowerCase()}-${unit}`;

				if (ingredientMap.has(key)) {
					const existing = ingredientMap.get(key)!;
					existing.totalAmount += numericAmount;
				} else {
					const category = ingredient.product?.category || 'Інше';

					ingredientMap.set(key, {
						name: ingredient.name,
						totalAmount: numericAmount,
						unit,
						category,
						productId: ingredient.productId || null,
						checked: checkedItems.has(key),
					});
				}
			});
		});

		return Array.from(ingredientMap.values());
	}, [plannerItemsData, checkedItems]);

	const categorizedIngredients = useMemo(() => {
		const categoryMap = new Map<string, AggregatedIngredient[]>();

		CATEGORIES_PRODUCTS.slice(1).forEach((cat) => {
			categoryMap.set(cat.name, []);
		});

		aggregatedIngredients.forEach((ingredient) => {
			const categoryName = ingredient.category;
			if (!categoryMap.has(categoryName)) {
				categoryMap.set(categoryName, []);
			}
			categoryMap.get(categoryName)!.push(ingredient);
		});

		const sortedCategories = Array.from(categoryMap.entries())
			.filter(([, items]) => items.length > 0)
			.sort(([a], [b]) => {
				const indexA = CATEGORIES_PRODUCTS.findIndex((cat) => cat.name === a);
				const indexB = CATEGORIES_PRODUCTS.findIndex((cat) => cat.name === b);
				return indexA - indexB;
			});

		return sortedCategories;
	}, [aggregatedIngredients]);

	const getCategoryBadgeClass = useCallback((categoryName: string) => {
		const category = CATEGORIES_PRODUCTS.find(
			(cat) => cat.name === categoryName,
		);
		return category?.badgeClass || 'bg-gray-100 text-gray-800';
	}, []);

	const toggleItem = useCallback((key: string) => {
		setCheckedItems((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(key)) {
				newSet.delete(key);
			} else {
				newSet.add(key);
			}
			return newSet;
		});
	}, []);

	const toggleCategory = useCallback(
		(categoryName: string) => {
			const categoryIngredients = categorizedIngredients.find(
				([name]) => name === categoryName,
			)?.[1];

			if (!categoryIngredients) return;

			const allChecked = categoryIngredients.every((ing) =>
				checkedItems.has(`${ing.name.toLowerCase()}-${ing.unit}`),
			);

			setCheckedItems((prev) => {
				const newSet = new Set(prev);
				categoryIngredients.forEach((ing) => {
					const key = `${ing.name.toLowerCase()}-${ing.unit}`;
					if (allChecked) {
						newSet.delete(key);
					} else {
						newSet.add(key);
					}
				});
				return newSet;
			});
		},
		[categorizedIngredients, checkedItems],
	);

	const clearChecked = useCallback(() => {
		setCheckedItems(new Set());
	}, []);

	const checkedCount = checkedItems.size;
	const totalCount = aggregatedIngredients.length;

	return {
		aggregatedIngredients,
		categorizedIngredients,
		getCategoryBadgeClass,
		toggleItem,
		toggleCategory,
		clearChecked,
		checkedItems,
		checkedCount,
		totalCount,
	};
};
