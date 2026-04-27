import type { ApolloCache } from '@apollo/client';
import { toast } from 'sonner';

// Local callable type compatible with Apollo's useMutation return value.
// Apollo Client v4 removed the top-level MutationFunction export; it is now a
// namespace member of useMutation with required generics.  Using `(options: any)`
// here is intentional: it lets every concrete MutationFunction<TData, TVariables>
// be assignable to this type without fighting TypeScript's strict function
// parameter variance across differing variable shapes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MutationFn = (options: any) => Promise<unknown>;

interface UseFavoriteOptions {
	entityType: 'Product' | 'Dish';
	entityId: string;
	isFavorite: boolean;
	addMutation: MutationFn;
	removeMutation: MutationFn;
	refetchQueries?: Array<{ query: unknown; variables?: unknown } | string>;
	onUpdate?: (cache: ApolloCache) => void;
}

export const useFavorite = ({
	entityType,
	entityId,
	isFavorite,
	addMutation,
	removeMutation,
	refetchQueries,
	onUpdate,
}: UseFavoriteOptions) => {
	const toggleFavorite = async () => {
		try {
			const mutation = isFavorite ? removeMutation : addMutation;
			const variables =
				entityType === 'Product'
					? { productId: entityId }
					: { dishId: entityId };

			await mutation({
				variables,
				refetchQueries,
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
				update: (cache: ApolloCache) => {
					cache.modify({
						id: cache.identify({ __typename: entityType, id: entityId }),
						fields: {
							isFavorite() {
								return !isFavorite;
							},
						},
					});

					if (onUpdate) {
						onUpdate(cache);
					}
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
			if (import.meta.env.DEV) console.error(error);
		}
	};

	return { isFavorite, toggleFavorite };
};
