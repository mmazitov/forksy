import { useMemo, useState } from 'react';
import { LuPlus } from 'react-icons/lu';

import { CardCompact } from '@/features/dishes';
import { useDishesQuery } from '@/shared/api/graphql/dish.gen';
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
	CATEGORIES_DISHES,
	ITEMS_PER_PAGE,
	PAGE_TITLE,
} from '@/shared/constants';
import { useBreadcrumbs, useDebounce, usePagination, useItemListSchema } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';
import { type ItemListSchemaItem, createSlug } from '@/shared/lib/utils';

const Dishes = () => {
	const breadcrumbItems = useBreadcrumbs();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('Усі');
	const debouncedSearch = useDebounce(searchQuery);

	const { data, loading, error } = useDishesQuery({
		variables: {
			search: debouncedSearch || undefined,
			category: selectedCategory !== 'Усі' ? selectedCategory : undefined,
			limit: 100,
		},
		fetchPolicy: 'cache-and-network',
	});

	const dishes = data?.dishes ?? [];

	const dishItems = useMemo<ItemListSchemaItem[]>(
		() =>
			dishes.map((dish) => ({
				name: dish.name,
				url: `${METADATA_CONFIG.site.url}/dishes/${createSlug(dish.name)}`,
				image: dish.imageUrl ?? undefined,
				description: dish.description ?? undefined,
			})),
		[dishes],
	);
	useItemListSchema(dishItems, 'Recipe');

	const { currentPage, totalPages, paginatedItems, handlePageChange } =
		usePagination({
			items: dishes,
			itemsPerPage: ITEMS_PER_PAGE,
			resetKey: `${debouncedSearch}-${selectedCategory}`,
		});

	const showPagination = !loading && totalPages > 1;

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="bg-destructive/10 text-destructive rounded-lg p-4">
					Помилка завантаження продуктів: {error.message}
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Breadcrumb items={breadcrumbItems} />
			<MetaData
				title={METADATA_CONFIG.titles.dishes}
				description={METADATA_CONFIG.descriptions.dishes}
				keywords={METADATA_CONFIG.keywords.dishes}
				type="website"
			/>
			<div className="mb-6">
				<PageTitle
					title={PAGE_TITLE.dishes.title}
					subtitle={PAGE_TITLE.dishes.subtitle}
					buttonType="link"
					buttonText={PAGE_TITLE.dishes.button}
					buttonIcon={<LuPlus />}
					href="/dishes/add"
				/>

				<Search
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					searchPlaceholder="Пошук страв..."
				/>

				<Filter
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
					categories={CATEGORIES_DISHES}
				/>
			</div>

			<Grid
				items={paginatedItems}
				itemComponent={CardCompact}
				emptyMessage="Страви не знайдено"
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
					totalItems={dishes.length}
					className="mt-8"
				/>
			)}
		</div>
	);
};

export default Dishes;
