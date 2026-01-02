import {
	CardProduct,
	Filter,
	Grid,
	MetaData,
	PageTitle,
	Pagination,
	Search,
} from '@/components';
import { CATEGORIES_PRODUCTS } from '@/constants';
import { useFilter } from '@/hooks';
import { METADATA_CONFIG } from '@/lib/config';
import { useProductsQuery } from '@/lib/graphql';
import { useEffect, useMemo, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

const ITEMS_PER_PAGE = 10;

const Products = () => {
	const { data, loading, error } = useProductsQuery();
	const [currentPage, setCurrentPage] = useState<number>(1);

	const productsData = data?.products || [];

	const {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
	} = useFilter(productsData, {
		searchField: 'name',
		categoryField: 'category',
		defaultCategory: 'Усі',
	});

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery, selectedCategory]);

	const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

	const paginatedItems = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		return filteredItems.slice(startIndex, endIndex);
	}, [filteredItems, currentPage]);

	const handlePageChange = (page: number): void => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (loading) {
		return <div className="container px-4 py-8 mx-auto">Завантаження...</div>;
	}

	if (error) {
		return (
			<div className="container px-4 py-8 mx-auto">
				<div className="p-4 text-red-600 bg-red-50 rounded-lg">
					Помилка завантаження продуктів: {error.message}
				</div>
			</div>
		);
	}

	return (
		<div className="container px-4 py-8 mx-auto">
			<MetaData
				title="Продукти"
				description={METADATA_CONFIG.descriptions.products}
				keywords={METADATA_CONFIG.keywords.products}
				type="website"
			/>
			<div className="mb-6">
				<PageTitle
					title="Продукти"
					subtitle="База продуктів з інформацією про КБЖУ"
					buttonType="link"
					buttonText="Додати продукт"
					buttonIcon={<LuPlus />}
					href="/products/add"
				/>

				<Search
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					searchPlaceholder="Пошук продуктів..."
				/>

				<Filter
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
					categories={CATEGORIES_PRODUCTS}
				/>
			</div>

			<Grid
				items={paginatedItems}
				renderItem={(product) => <CardProduct {...product} />}
				emptyMessage="Продукти не знайдено"
				showEmpty={true}
			/>

			{filteredItems.length > 0 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					itemsPerPage={ITEMS_PER_PAGE}
					totalItems={filteredItems.length}
					className="mt-8"
				/>
			)}
		</div>
	);
};

export default Products;
