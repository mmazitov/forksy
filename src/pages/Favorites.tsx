import { MetaData, PageTitle } from '@/components';
import { METADATA_CONFIG } from '@/lib/config';

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
		</div>
	);
};

export default Favorites;
