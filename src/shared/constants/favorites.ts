export interface FavoriteTab {
	title: string;
	value: string;
	disabled: boolean;
}

export const FAVORITE_TABS: FavoriteTab[] = [
	{ title: 'Страви', value: 'dishes', disabled: false },
	{ title: 'Продукти', value: 'products', disabled: false },
];
