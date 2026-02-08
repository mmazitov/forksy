import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UseFavoriteOptions {
	entityType: 'Product' | 'Dish';
	entityId: string;
	isFavorite: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	addMutation: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	removeMutation: any;
	queryName: 'favoriteProducts' | 'favoriteDishes';
}

export const useFavorite = ({
	entityType,
	entityId,
	isFavorite,
	addMutation,
	removeMutation,
	queryName,
}: UseFavoriteOptions) => {
	const [isFav, setIsFav] = useState(isFavorite);

	useEffect(() => {
		setIsFav(isFavorite);
	}, [isFavorite]);

	const toggleFavorite = async () => {
		const previousState = isFav;
		const newState = !isFav;

		try {
			setIsFav(newState);

			const mutation = isFav ? removeMutation : addMutation;
			const variableName = entityType === 'Product' ? 'productId' : 'dishId';

			await mutation({
				variables: { [variableName]: entityId },
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				update: (cache: any) => {
					cache.writeFragment({
						id: cache.identify({ __typename: entityType, id: entityId }),
						fragment: gql`
							fragment UpdateFavorite on ${entityType} {
								isFavorite
							}
						`,
						data: { isFavorite: newState },
					});

					try {
						const existingFavorites = cache.readQuery({
							query: gql`
								query ${queryName === 'favoriteProducts' ? 'FavoriteProducts' : 'FavoriteDishes'} {
									${queryName} {
										id
									}
								}
							`,
						});

						if (existingFavorites) {
							cache.writeQuery({
								query: gql`
									query ${queryName === 'favoriteProducts' ? 'FavoriteProducts' : 'FavoriteDishes'} {
										${queryName} {
											id
										}
									}
								`,
								data: {
									[queryName]: newState
										? [
												// eslint-disable-next-line @typescript-eslint/no-explicit-any
												...(existingFavorites as any)[queryName],
												{ __typename: entityType, id: entityId },
											]
										: // eslint-disable-next-line @typescript-eslint/no-explicit-any
											(existingFavorites as any)[queryName].filter(
												// eslint-disable-next-line @typescript-eslint/no-explicit-any
												(item: any) => item.id !== entityId,
											),
								},
							});
						}
					} catch (cacheError) {
						console.log(
							'Cache update error (expected during initial load):',
							cacheError,
						);
					}
				},
			});

			const entityName = entityType === 'Product' ? 'продукт' : 'страву';
			toast.success(
				isFav
					? `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} видалено з улюблених`
					: `${entityName.charAt(0).toUpperCase() + entityName.slice(1)} додано до улюблених`,
			);
		} catch (error) {
			setIsFav(previousState);
			const entityName = entityType === 'Product' ? 'продуктів' : 'страв';
			toast.error(
				`Помилка при оновленні улюблених ${entityName}, лише авторизовані користувачі можуть додавати улюблені ${entityName}`,
			);
			console.error(error);
		}
	};

	return { isFavorite: isFav, toggleFavorite };
};
