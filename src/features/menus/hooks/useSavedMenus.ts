import { useSavedMenusQuery } from '@/shared/api/graphql';

export const useSavedMenus = () => {
	const { data, loading, error, refetch } = useSavedMenusQuery({
		fetchPolicy: 'cache-and-network',
	});

	return {
		menus: data?.savedMenus ?? [],
		loading,
		error,
		refetch,
	};
};
