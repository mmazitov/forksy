import {
	CardProduct,
	Filter,
	Grid,
	MetaData,
	PageTitle,
	Search,
} from '@/components';
import { useFilter } from '@/components/filter';
import { CATEGORIES_PRODUCTS } from '@/constants';
import { METADATA_CONFIG } from '@/lib/config';
import { products } from '@/mock';
import { LuPlus } from 'react-icons/lu';

const Products = () => {
	const {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		filteredItems,
	} = useFilter(products, {
		searchField: 'name',
		categoryField: 'category',
		defaultCategory: 'Усі',
	});

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
				items={filteredItems}
				renderItem={(item) => <CardProduct {...item} />}
				emptyMessage="Продукти не знайдено"
				showEmpty={true}
			/>
		</div>
	);
};

export default Products;
