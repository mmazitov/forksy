import { useMemo, useState } from 'react';

interface FilterableItem {
	id: string;
	[key: string]:
		| string
		| number
		| boolean
		| null
		| undefined
		| string[]
		| Record<string, unknown>
		| Record<string, unknown>[];
}

interface UseFilterOptions {
	searchField: string;
	categoryField: string;
	defaultCategory: string;
}

export const useFilter = <T extends FilterableItem>(
	items: T[],
	options: UseFilterOptions,
) => {
	const { searchField, categoryField, defaultCategory } = options;

	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const searchValue = item[searchField];
			const categoryValue = item[categoryField];

			const matchesSearch = searchQuery
				? String(searchValue ?? '')
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				: true;

			const matchesCategory =
				selectedCategory === defaultCategory
					? true
					: categoryValue === selectedCategory;

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
