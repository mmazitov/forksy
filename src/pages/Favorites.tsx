import { FavoriteDishes, useFavoriteDishes } from '@/features/dishes';
import { FavoriteProducts, useFavoriteProducts } from '@/features/products';
import {
	MetaData,
	PageTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
import { PAGE_TITLE, FAVORITE_TABS } from '@/shared/constants';
import { useTabsWithAutoSwitch } from '@/shared/hooks';
import { METADATA_CONFIG } from '@/shared/lib/config';

const Favorites = () => {
	const { dishes, loading: dishesLoading } = useFavoriteDishes();
	const { products, loading: productsLoading } = useFavoriteProducts();

	const isLoading = dishesLoading || productsLoading;

	const tabs = FAVORITE_TABS.map((tab) => ({
		...tab,
		disabled:
			!isLoading &&
			((tab.value === 'dishes' && dishes.length === 0) ||
				(tab.value === 'products' && products.length === 0)),
	}));

	const { activeTab, setActiveTab } = useTabsWithAutoSwitch({
		tabs,
		defaultTab: 'dishes',
		isLoading,
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={METADATA_CONFIG.titles.favorites}
				description={METADATA_CONFIG.descriptions.favorites}
				keywords={METADATA_CONFIG.keywords.favorites}
				type="website"
			/>

			<PageTitle
				title={PAGE_TITLE.favorites.title}
				subtitle={PAGE_TITLE.favorites.subtitle}
				buttonVisible={false}
			/>
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className="mb-6 inline-flex">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							disabled={tab.disabled}
						>
							{tab.title}
						</TabsTrigger>
					))}
				</TabsList>
				{tabs.map((tab) => (
					<TabsContent key={tab.value} value={tab.value} className="mt-0">
						{tab.value === tabs[0].value && <FavoriteDishes />}
						{tab.value === tabs[1].value && <FavoriteProducts />}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default Favorites;
