import { LuPlus } from 'react-icons/lu';

import {
	CardProductCompact,
	Filter,
	Grid,
	Loader,
	MetaData,
	PageTitle,
	Pagination,
	Search,
} from '@/components';
import { CATEGORIES_PRODUCTS } from '@/constants';
import { useFilter, usePagination } from '@/hooks';
import { METADATA_CONFIG } from '@/lib/config';
import { useProductsQuery } from '@/lib/graphql';

const ITEMS_PER_PAGE = 10;

const Products = () => {
	const { data, loading, error } = useProductsQuery();

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

	const { currentPage, totalPages, paginatedItems, handlePageChange } =
		usePagination({
			items: filteredItems,
			itemsPerPage: ITEMS_PER_PAGE,
			resetDependencies: [searchQuery, selectedCategory],
		});

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Помилка завантаження продуктів: {error.message}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={METADATA_CONFIG.titles.products}
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
				renderItem={(product) => <CardProductCompact {...product} />}
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
