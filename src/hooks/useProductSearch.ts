import { useCallback, useMemo, useState } from 'react';

import { Ingredient } from './useFormList';

interface Product {
	id: string;
	name: string;
}

interface UseProductSearchProps<T extends Product> {
	products: T[];
	updateIngredient: (index: number, updates: Partial<Ingredient>) => void;
}

export const useProductSearch = <T extends Product>({
	products,
	updateIngredient,
}: UseProductSearchProps<T>) => {
	// Map of products by name for quick lookup
	const productsByName = useMemo(() => {
		const map = new Map<string, T>();
		products.forEach((p) => map.set(p.name, p));
		return map;
	}, [products]);

	// Search state for each ingredient row
	const [searchQueries, setSearchQueries] = useState<Record<number, string>>(
		{},
	);

	// Handle search input change
	const handleSearchChange = useCallback((index: number, value: string) => {
		setSearchQueries((prev) => ({ ...prev, [index]: value }));
	}, []);

	// Get filtered products for a specific ingredient row
	const getFilteredProducts = useCallback(
		(index: number): T[] => {
			const query = searchQueries[index]?.toLowerCase() || '';
			if (!query) return products;
			return products.filter((p) => p.name.toLowerCase().includes(query));
		},
		[products, searchQueries],
	);

	// Handle product selection
	const handleProductSelect = useCallback(
		(index: number, productName: string) => {
			const product = productsByName.get(productName);
			updateIngredient(index, {
				name: productName,
				productId: product?.id,
			});
			setSearchQueries((prev) => ({ ...prev, [index]: '' }));
		},
		[productsByName, updateIngredient],
	);

	// Get search query for a specific index
	const getSearchQuery = useCallback(
		(index: number): string => {
			return searchQueries[index] || '';
		},
		[searchQueries],
	);

	// Clear search query for a specific index
	const clearSearchQuery = useCallback((index: number) => {
		setSearchQueries((prev) => ({ ...prev, [index]: '' }));
	}, []);

	return {
		productsByName,
		searchQueries,
		handleSearchChange,
		getFilteredProducts,
		handleProductSelect,
		getSearchQuery,
		clearSearchQuery,
	};
};
