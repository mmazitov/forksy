import {
	CardProduct,
	Filter,
	Grid,
	MetaData,
	PageTitle,
	Search,
} from '@/components';
import { CATEGORIES_PRODUCTS } from '@/constants';
import { useFilter } from '@/hooks';
import { METADATA_CONFIG } from '@/lib/config';
import { useProductsQuery } from '@/lib/graphql';
import { LuPlus } from 'react-icons/lu';

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
				items={filteredItems}
				renderItem={(product) => <CardProduct {...product} />}
				emptyMessage="Продукти не знайдено"
				showEmpty={true}
			/>
		</div>
	);
};

export default Products;
