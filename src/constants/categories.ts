export interface Category {
	id: number;
	name: string;
}

export const CATEGORIES_DISHES: Category[] = [
	{ id: 1, name: 'Усі' },
	{ id: 2, name: 'Сніданок' },
	{ id: 3, name: 'Обід' },
	{ id: 4, name: 'Вечеря' },
	{ id: 5, name: 'Перекус' },
	{ id: 6, name: 'Десерт' },
];

export const CATEGORIES_PRODUCTS: Category[] = [
	{ id: 1, name: 'Усі' },
	{ id: 2, name: 'М’ясо' },
	{ id: 3, name: 'Овочі' },
	{ id: 4, name: 'Фрукти' },
	{ id: 5, name: 'Молочні' },
	{ id: 6, name: 'Крупи' },
	{ id: 7, name: 'Напої' },
	{ id: 8, name: 'Інше' },
];
