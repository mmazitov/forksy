import { useCallback, useMemo } from 'react';
import { LuSearchX } from 'react-icons/lu';

import { useFavoriteProducts } from '../hooks/useFavoriteProducts';
import { CardCompact } from './cardCompact';

import { Grid } from '@/shared/components';
import { Skeleton } from '@/shared/components/skeleton';
import { ITEMS_PER_PAGE } from '@/shared/constants';

const FavoriteProductList = () => {
	const { products, loading } = useFavoriteProducts();

	const skeletonItems = useMemo(
		() => Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({ id: String(i) })),
		[],
	);

	const renderSkeleton = useCallback(() => <Skeleton />, []);
	const renderProducts = useCallback(
		(product: (typeof products)[number]) => <CardCompact {...product} />,
		[],
	);

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
		<>
			{loading ? (
				<Grid
					items={skeletonItems}
					renderItem={renderSkeleton}
					showEmpty={false}
				/>
			) : (
				<Grid items={products} renderItem={renderProducts} showEmpty={false} />
			)}
		</>
	);
};

export default FavoriteProductList;
