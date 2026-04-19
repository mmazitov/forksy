import { FavoriteDishes } from '@/features/dishes';
import { SavedMenus } from '@/features/menus';
import { FavoriteProducts } from '@/features/products';
import {
	MetaData,
	PageTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
import { PAGE_TITLE } from '@/shared/constants';
import { FAVORITE_TITLES } from '@/shared/constants/favorites';
import { METADATA_CONFIG } from '@/shared/lib/config';

const Favorites = () => {
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
			<Tabs defaultValue="menu">
				<TabsList className="mb-6 inline-flex">
					{FAVORITE_TITLES.map((title) => (
						<TabsTrigger key={title.value} value={title.value}>
							{title.title}
						</TabsTrigger>
					))}
				</TabsList>
				{FAVORITE_TITLES.map((title) => (
					<TabsContent key={title.value} value={title.value} className="mt-0">
						{title.value === 'menu' && <SavedMenus />}
						{title.value === 'dishes' && <FavoriteDishes />}
						{title.value === 'products' && <FavoriteProducts />}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
};

export default Favorites;
