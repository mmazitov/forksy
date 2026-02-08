import { gql } from '@apollo/client';
import { toast } from 'sonner';

interface UseFavoriteOptions {
	entityType: 'Product' | 'Dish';
	entityId: string;
	isFavorite: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addMutation: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removeMutation: any;
}

export const useFavorite = ({
	entityType,
	entityId,
	isFavorite,
	addMutation,
	removeMutation,
}: UseFavoriteOptions) => {
	const toggleFavorite = async () => {
		try {
			const mutation = isFavorite ? removeMutation : addMutation;
			const variableName = entityType === 'Product' ? 'productId' : 'dishId';

			await mutation({
				variables: { [variableName]: entityId },
				refetchQueries: [
					{ query: gql`query Me { me { id favoriteProducts { id } favoriteDishes { id } } }` },
					{
						query: gql`
							query ${entityType}Query($id: ID!) {
								${entityType.toLowerCase()}(id: $id) {
									id
									isFavorite
								}
							}
						`,
						variables: { id: entityId },
					},
				],
				awaitRefetchQueries: true,
			});

			const entityName = entityType === 'Product' ? 'продукт' : 'страву';
			toast.success(
				isFavorite
					? `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} видалено з улюблених`
					: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} додано до улюблених`,
			);
		} catch (error) {
			const entityName = entityType === 'Product' ? 'продуктів' : 'страв';
			toast.error(
				`Помилка при оновленні улюблених ${entityName}, лише авторизовані користувачі можуть додавати улюблені ${entityName}`,
			);
			console.error(error);
		}
	};

	return { isFavorite, toggleFavorite };
};