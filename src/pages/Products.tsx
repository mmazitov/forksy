import { useMemo, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

import { CardCompact } from '@/features/products';
import { useProductsQuery } from '@/shared/api/graphql';
import {
	Breadcrumb,
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
import { useBreadcrumbs, useDebounce, usePagination, useItemListSchema } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { type ItemListSchemaItem, createSlug } from '@/shared/lib/utils';

const Products = () => {
	const breadcrumbItems = useBreadcrumbs();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('Усі');
	const debouncedSearch = useDebounce(searchQuery);

	const { data, loading, error } = useProductsQuery({
		variables: {
			search: debouncedSearch || undefined,
			category: selectedCategory !== 'Усі' ? selectedCategory : undefined,
			limit: 100,
		},
		fetchPolicy: 'cache-and-network',
	});

	const products = data?.products ?? [];

	const productItems = useMemo<ItemListSchemaItem[]>(
		() =>
			products.map((product) => ({
				name: product.name,
				url: `${METADATA_CONFIG.site.url}/products/${createSlug(product.name)}`,
				image: product.imageUrl ?? undefined,
				description: product.description ?? undefined,
			})),
		[products],
	);
	useItemListSchema(productItems, 'Product');

	const { currentPage, totalPages, paginatedItems, handlePageChange } =
		usePagination({
			items: products,
			itemsPerPage: ITEMS_PER_PAGE,
			resetKey: `${debouncedSearch}-${selectedCategory}`,
		});

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
			<Breadcrumb items={breadcrumbItems} />
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

			<Grid
				items={paginatedItems}
				itemComponent={CardCompact}
				emptyMessage="Продукти не знайдено"
				showEmpty={true}
				isLoading={loading}
				skeletonComponent={Skeleton}
				skeletonCount={ITEMS_PER_PAGE}
			/>

			{showPagination && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
					itemsPerPage={ITEMS_PER_PAGE}
					totalItems={products.length}
					className="mt-8"
				/>
			)}
		</div>
	);
};

export default Products;
