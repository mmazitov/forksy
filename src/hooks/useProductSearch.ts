import { useCallback, useMemo, useState } from 'react';

import { FormIngredient } from '@/types';

interface Product {
	id: string;
	name: string;
}

interface UseProductSearchProps<T extends Product> {
	products: T[];
	updateIngredient: (index: number, updates: Partial<FormIngredient>) => void;
}

export const useProductSearch = <T extends Product>({
	products,
	updateIngredient,
}: UseProductSearchProps<T>) => {
	const productsByName = useMemo(() => {
		const map = new Map<string, T>();
		products.forEach((p) => map.set(p.name, p));
		return map;
	}, [products]);

	const [searchQueries, setSearchQueries] = useState<Record<number, string>>(
		{},
	);

	const handleSearchChange = useCallback((index: number, value: string) => {
		setSearchQueries((prev) => ({ ...prev, [index]: value }));
	}, []);

	const getFilteredProducts = useCallback(
		(index: number): T[] => {
			const query = searchQueries[index]?.toLowerCase() || '';
			if (!query) return products;
			return products.filter((p) => p.name.toLowerCase().includes(query));
		},
		[products, searchQueries],
	);

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

	const getSearchQuery = useCallback(
		(index: number): string => {
			return searchQueries[index] || '';
		},
		[searchQueries],
	);

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
