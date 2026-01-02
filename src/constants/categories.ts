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
	{ id: 2, name: "М'ясо" },
	{ id: 3, name: 'Риба' },
	{ id: 4, name: 'Овочі' },
	{ id: 5, name: 'Фрукти' },
	{ id: 6, name: 'Молочні' },
	{ id: 7, name: 'Крупи' },
	{ id: 8, name: 'Напої' },
	{ id: 9, name: 'Консерва' },
	{ id: 10, name: 'Додатки' },
	{ id: 11, name: 'Інше' },
];
