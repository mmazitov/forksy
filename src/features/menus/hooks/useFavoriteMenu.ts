import {
	useAddToFavoritesMenuMutation,
	useRemoveFromFavoritesMenuMutation,
} from '@/shared/api/graphql';
import { useFavorite } from '@/shared/hooks';

export const useFavoriteMenu = (menuId: string, isFavorite: boolean) => {
	const [addToFavoritesMenu] = useAddToFavoritesMenuMutation();
	const [removeFromFavoritesMenu] = useRemoveFromFavoritesMenuMutation();

	return useFavorite({
		entityType: 'SavedMenu',
		entityId: menuId,
		isFavorite,
		addMutation: addToFavoritesMenu,
		removeMutation: removeFromFavoritesMenu,
	});
};
