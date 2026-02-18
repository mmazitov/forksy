import { FavoriteDishList } from '@/features/dishes';
import { FavoriteProductList } from '@/features/products';
import {
	MetaData,
	PageTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
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
				title="Обрані рецепти"
				subtitle="Ваша персональна колекція страв й продуктів"
				buttonVisible={false}
			/>
			<Tabs defaultValue="dishes">
				<TabsList className="inline-flex gap-2">
					<TabsTrigger value="dishes">Страви</TabsTrigger>
					<TabsTrigger value="products">Продукти</TabsTrigger>
				</TabsList>
				<TabsContent value="dishes">
					<FavoriteDishList />
				</TabsContent>
				<TabsContent value="products">
					<FavoriteProductList />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Favorites;
