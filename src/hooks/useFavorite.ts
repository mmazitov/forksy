import { toast } from 'sonner';

type MutationFunction = (options?: Record<string, unknown>) => Promise<unknown>;

interface UseFavoriteOptions {
	entityType: 'Product' | 'Dish';
	entityId: string;
	isFavorite: boolean;
	addMutation: MutationFunction;
	removeMutation: MutationFunction;
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
				optimisticResponse: {
					[isFavorite
						? entityType === 'Product'
							? 'removeFromFavoritesProduct'
							: 'removeFromFavoritesDish'
						: entityType === 'Product'
							? 'addToFavoritesProduct'
							: 'addToFavoritesDish']: {
						id: entityId,
						name: 'Optimistic Update',
					},
				},
				update: (cache: unknown) => {
					const apolloCache = cache as {
						modify: (options: {
							id: string;
							fields: Record<string, () => unknown>;
						}) => void;
						identify: (obj: { __typename: string; id: string }) => string;
					};
					apolloCache.modify({
						id: apolloCache.identify({ __typename: entityType, id: entityId }),
						fields: {
							isFavorite() {
								return !isFavorite;
							},
						},
					});
				},
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
