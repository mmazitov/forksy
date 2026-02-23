import { useCallback, useMemo } from 'react';
import { LuPlus } from 'react-icons/lu';

import { CardCompact } from '@/features/products';
import { useProductsQuery } from '@/shared/api/graphql';
import {
	Filter,
	Grid,
	MetaData,
	PageTitle,
	Pagination,
	Search,
} from '@/shared/components';
import { Skeleton } from '@/shared/components/skeleton';
import {
	CATEGORIES_PRODUCTS,
	ITEMS_PER_PAGE,
	PAGE_TITLE,
} from '@/shared/constants';
import { useFilter, usePagination } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';
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
			resetKey: `${searchQuery}-${selectedCategory}`,
		});

	const skeletonItems = useMemo(
		() => Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({ id: String(i) })),
		[],
	);

	const renderSkeleton = useCallback(() => <Skeleton />, []);
	const renderProducts = useCallback(
		(product: (typeof productsData)[number]) => <CardCompact {...product} />,
		[],
	);

	const showPagination = !loading && totalPages > 1;

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
					title={PAGE_TITLE.products.title}
					subtitle={PAGE_TITLE.products.subtitle}
					buttonType="link"
					buttonText={PAGE_TITLE.products.button}
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

			{loading ? (
				<Grid
					items={skeletonItems}
					renderItem={renderSkeleton}
					showEmpty={false}
				/>
			) : (
				<>
					<Grid
						items={paginatedItems}
						renderItem={renderProducts}
						emptyMessage="Продукти не знайдено"
						showEmpty={true}
					/>

					{showPagination && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
							itemsPerPage={ITEMS_PER_PAGE}
							totalItems={filteredItems.length}
							className="mt-8"
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Products;
