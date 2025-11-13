import { useState } from 'react';

interface UseSearchOptions {
	searchField?: string;
}
const useSearch = (options: UseSearchOptions = {}) => {
	const { searchField = 'name' } = options;
	const [searchQuery, setSearchQuery] = useState('');

	return {
		searchQuery,
		setSearchQuery,
		searchField,
	};
};

export default useSearch;
