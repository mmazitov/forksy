import { FavoriteDishes } from '@/features/dishes';
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
			<Tabs defaultValue="dishes">
				<TabsList className="mb-6 inline-flex gap-2">
					<TabsTrigger value="dishes">Страви</TabsTrigger>
					<TabsTrigger value="products">Продукти</TabsTrigger>
				</TabsList>
				<TabsContent value="dishes" className="mt-0">
					<FavoriteDishes />
				</TabsContent>
				<TabsContent value="products" className="mt-0">
					<FavoriteProducts />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Favorites;
