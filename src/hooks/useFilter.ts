import { useMemo, useState } from 'react';

export interface FilterableItem {
	id: string;
	name: string;
	category: string;
	[key: string]: unknown;
}

interface UseFilterOptions {
	searchField?: string;
	categoryField?: string;
	defaultCategory?: string;
}

export const useFilter = <T extends FilterableItem>(
	items: Array<T>,
	options: UseFilterOptions = {},
) => {
	const {
		searchField = 'name',
		categoryField = 'category',
		defaultCategory = 'Усі',
	} = options;

	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

	// Memoize filtered items for performance
	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const matchesSearch = (item[searchField] as string)
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === defaultCategory ||
				(item[categoryField] as string) === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [
		items,
		searchQuery,
		selectedCategory,
		searchField,
		categoryField,
		defaultCategory,
	]);

	return {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
	};
};
