import { useEffect, useMemo, useState } from 'react';

interface UsePaginationOptions<T> {
	items: T[];
	itemsPerPage?: number;
	resetDependencies?: unknown[];
}

interface UsePaginationReturn<T> {
	currentPage: number;
	totalPages: number;
	paginatedItems: T[];
	setCurrentPage: (page: number) => void;
	handlePageChange: (page: number) => void;
	goToFirstPage: () => void;
	goToLastPage: () => void;
	goToNextPage: () => void;
	goToPreviousPage: () => void;
}

export const usePagination = <T>({
	items,
	itemsPerPage = 10,
	resetDependencies = [],
}: UsePaginationOptions<T>): UsePaginationReturn<T> => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	const totalPages = Math.ceil(items.length / itemsPerPage);

	useEffect(() => {
		setCurrentPage(1);
	}, resetDependencies);

	const paginatedItems = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return items.slice(startIndex, endIndex);
	}, [items, currentPage, itemsPerPage]);

	const handlePageChange = (page: number): void => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const goToFirstPage = () => handlePageChange(1);
	const goToLastPage = () => handlePageChange(totalPages);
	const goToNextPage = () => {
		if (currentPage < totalPages) {
			handlePageChange(currentPage + 1);
		}
	};
	const goToPreviousPage = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};

	return {
		currentPage,
		totalPages,
		paginatedItems,
		setCurrentPage,
		handlePageChange,
		goToFirstPage,
		goToLastPage,
		goToNextPage,
		goToPreviousPage,
	};
};
