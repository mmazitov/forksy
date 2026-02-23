import { useCallback, useMemo } from 'react';
import { LuPlus } from 'react-icons/lu';

import { CardCompact } from '@/features/dishes';
import { useDishesQuery } from '@/shared/api/graphql/dish.gen';
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
	CATEGORIES_DISHES,
	ITEMS_PER_PAGE,
	PAGE_TITLE,
} from '@/shared/constants';
import { useFilter, usePagination } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const Dishes = () => {
	const { data, loading, error } = useDishesQuery();

	const dishesData = data?.dishes || [];

	const {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
	} = useFilter(dishesData, {
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
	const renderDishes = useCallback(
		(dish: (typeof dishesData)[number]) => <CardCompact {...dish} />,
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
						renderItem={renderDishes}
						emptyMessage="Страви не знайдено"
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

export default Dishes;
