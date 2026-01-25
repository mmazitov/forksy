export interface Category {
	id: number;
	name: string;
	badgeClass?: string;
}

export const CATEGORIES_DISHES: Category[] = [
	{ id: 1, name: 'Усі' },
	{
		id: 2,
		name: 'Сніданок',
		badgeClass: 'bg-[var(--badge-breakfast)] text-[var(--badge-breakfast-fg)]',
	},
	{
		id: 3,
		name: 'Обід',
		badgeClass: 'bg-[var(--badge-lunch)] text-[var(--badge-lunch-fg)]',
	},
	{
		id: 4,
		name: 'Вечеря',
		badgeClass: 'bg-[var(--badge-dinner)] text-[var(--badge-dinner-fg)]',
	},
	{
		id: 5,
		name: 'Перекус',
		badgeClass: 'bg-[var(--badge-snack)] text-[var(--badge-snack-fg)]',
	},
	{
		id: 6,
		name: 'Десерт',
		badgeClass: 'bg-[var(--badge-dessert)] text-[var(--badge-dessert-fg)]',
	},
];

export const CATEGORIES_PRODUCTS: Category[] = [
	{ id: 1, name: 'Усі' },
	{
		id: 2,
		name: "М'ясо",
		badgeClass: 'bg-[var(--badge-meat)] text-[var(--badge-meat-fg)]',
	},
	{
		id: 3,
		name: 'Риба',
		badgeClass: 'bg-[var(--badge-fish)] text-[var(--badge-fish-fg)]',
	},
	{
		id: 4,
		name: 'Овочі',
		badgeClass:
			'bg-[var(--badge-vegetables)] text-[var(--badge-vegetables-fg)]',
	},
	{
		id: 5,
		name: 'Фрукти',
		badgeClass: 'bg-[var(--badge-fruits)] text-[var(--badge-fruits-fg)]',
	},
	{
		id: 6,
		name: 'Молочні',
		badgeClass: 'bg-[var(--badge-dairy)] text-[var(--badge-dairy-fg)]',
	},
	{
		id: 7,
		name: 'Крупи',
		badgeClass: 'bg-[var(--badge-grains)] text-[var(--badge-grains-fg)]',
	},
	{
		id: 8,
		name: 'Напої',
		badgeClass: 'bg-[var(--badge-drinks)] text-[var(--badge-drinks-fg)]',
	},
	{
		id: 9,
		name: 'Консерва',
		badgeClass: 'bg-[var(--badge-canned)] text-[var(--badge-canned-fg)]',
	},
	{
		id: 10,
		name: 'Додатки',
		badgeClass: 'bg-[var(--badge-addons)] text-[var(--badge-addons-fg)]',
	},
	{
		id: 11,
		name: 'Інше',
		badgeClass: 'bg-[var(--badge-other)] text-[var(--badge-other-fg)]',
	},
];
