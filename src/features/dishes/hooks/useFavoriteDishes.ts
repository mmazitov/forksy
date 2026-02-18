import { useFavoriteDishesQuery } from '@/shared/api/graphql';

export const useFavoriteDishes = () => {
	const { data, loading, error } = useFavoriteDishesQuery({
		fetchPolicy: 'cache-and-network',
	});

	return {
		dishes: data?.favoriteDishes || [],
		loading,
		error,
	};
};
