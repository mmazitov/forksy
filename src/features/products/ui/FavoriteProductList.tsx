import { LuSearchX } from 'react-icons/lu';

import { useFavoriteProducts } from '../hooks/useFavoriteProducts';
import CardProductCompact from './CardProductCompact';

import { Grid, Loader } from '@/shared/components';

const FavoriteProductList = () => {
	const { products, loading } = useFavoriteProducts();

	if (loading) {
		return <Loader />;
	}

	if (products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="bg-muted mb-4 rounded-full p-4">
					<LuSearchX className="text-muted-foreground h-8 w-8" />
				</div>
				<h3 className="mb-2 text-xl font-semibold">Список порожній</h3>
				<p className="text-muted-foreground">
					Ви ще не додали жодного продукту до улюблених
				</p>
			</div>
		);
	}

	return (
		<Grid
			items={products}
			renderItem={(item) => <CardProductCompact {...item} />}
			showEmpty={false}
		/>
	);
};

export default FavoriteProductList;
