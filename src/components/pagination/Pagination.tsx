import { JSX } from 'react';
import {
	LuChevronLeft,
	LuChevronRight,
	LuChevronsLeft,
	LuChevronsRight,
} from 'react-icons/lu';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	itemsPerPage: number;
	totalItems: number;
	className?: string;
}

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
	itemsPerPage,
	totalItems,
	className,
}: PaginationProps): JSX.Element => {
	const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const getPageNumbers = (): (number | string)[] => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [1];

		if (currentPage > 3) {
			pages.push('...');
		}

		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPages - 1, currentPage + 1);

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (currentPage < totalPages - 2) {
			pages.push('...');
		}

		pages.push(totalPages);

		return pages;
	};

	const pageNumbers = getPageNumbers();

	const handlePageClick = (page: number | string): void => {
		if (typeof page === 'number' && page !== currentPage) {
			onPageChange(page);
		}
	};

	if (totalPages <= 1) {
		return <></>;
	}

	return (
		<div className={cn('flex items-center justify-between gap-4', className)}>
			<div className="text-muted-foreground hidden text-sm sm:block">
				Показано {startItem}-{endItem} з {totalItems}
			</div>

			<div className="flex items-center justify-center gap-1">
				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(1)}
					disabled={currentPage === 1}
					aria-label="Перша сторінка"
					className="hidden sm:inline-flex"
				>
					<LuChevronsLeft />
				</Button>

				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					aria-label="Попередня сторінка"
				>
					<LuChevronLeft />
				</Button>

				<div className="flex items-center gap-1">
					{pageNumbers.map((page, index) => {
						if (page === '...') {
							return (
								<span
									key={`ellipsis-${index}`}
									className="text-muted-foreground px-3"
								>
									...
								</span>
							);
						}

						const isActive = page === currentPage;

						return (
							<Button
								key={page}
								variant={isActive ? 'default' : 'outline'}
								size="icon"
								onClick={() => handlePageClick(page)}
								aria-label={`Сторінка ${page}`}
								aria-current={isActive ? 'page' : undefined}
							>
								{page}
							</Button>
						);
					})}
				</div>

				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					aria-label="Наступна сторінка"
				>
					<LuChevronRight />
				</Button>

				<Button
					variant="outline"
					size="icon"
					onClick={() => onPageChange(totalPages)}
					disabled={currentPage === totalPages}
					aria-label="Остання сторінка"
					className="hidden sm:inline-flex"
				>
					<LuChevronsRight />
				</Button>
			</div>
		</div>
	);
};

export default Pagination;
