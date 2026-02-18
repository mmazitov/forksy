import { LuPlus } from 'react-icons/lu';

import { DishCardCompact as CardDishCompact } from '@/features/dishes';
import { useDishesQuery } from '@/shared/api/graphql/dish.gen';
import {
	Filter,
	Grid,
	Loader,
	MetaData,
	PageTitle,
	Pagination,
	Search,
} from '@/shared/components';
import { CATEGORIES_DISHES, ITEMS_PER_PAGE } from '@/shared/constants';
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
				title={METADATA_CONFIG.titles.dishes}
				description={METADATA_CONFIG.descriptions.dishes}
				keywords={METADATA_CONFIG.keywords.dishes}
				type="website"
			/>
			<div className="mb-6">
				<PageTitle
					title="Страви та рецепти"
					subtitle="Колекція улюблених рецептів з детальними інструкціями"
					buttonType="link"
					buttonText="Додати страву"
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
				renderItem={(dish) => <CardDishCompact {...dish} />}
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

export default Dishes;
