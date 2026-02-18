import { useFavoriteProductsQuery } from '@/shared/api/graphql';

export const useFavoriteProducts = () => {
	const { data, loading, error } = useFavoriteProductsQuery({
		fetchPolicy: 'cache-and-network',
	});

	return {
		products: data?.favoriteProducts || [],
		loading,
		error,
	};
};
