import {
	CardDish,
	Filter,
	Grid,
	MetaData,
	PageTitle,
	Search,
} from '@/components';
import { CATEGORIES_DISHES } from '@/constants';
import { useFilter } from '@/hooks';
import { METADATA_CONFIG } from '@/lib/config';

import { dishes } from '@/mock';
import { LuPlus } from 'react-icons/lu';

const Dishes = () => {
	const {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
	} = useFilter(dishes, {
		searchField: 'name',
		categoryField: 'category',
		defaultCategory: 'all',
	});

	return (
		<div className="container px-4 py-8 mx-auto">
			<MetaData
				title="Страви та рецепти"
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
				items={filteredItems}
				renderItem={(item) => <CardDish {...item} />}
				emptyMessage="Продукти не знайдено"
				showEmpty={true}
			/>
		</div>
	);
};

export default Dishes;
