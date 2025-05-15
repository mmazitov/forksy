export const navigationItems = [
	{
		name: 'Головна',
		href: '/',
	},
	{
		name: 'Продукти',
		href: '/products-list',
		showChildrenOnlyWhenAuthed: true,
		children: [
			{
				name: 'Список продуктів',
				href: '/products-list',
			},
			{
				name: 'Додати продукт',
				href: '/products-add',
			},
			{
				name: 'Переклади',
				href: '/translation',
			},
		],
	},
	{
		name: 'Рецепти',
		href: '/recipes-list',
		showChildrenOnlyWhenAuthed: true,
		children: [
			{
				name: 'Список рецептів',
				href: '/recipes-list',
			},
			{
				name: 'Додати рецепт',
				href: '/add-recipe',
				authRequired: true,
			},
		],
	},
	{
		name: 'Про нас',
		href: '/about',
	},
	{
		name: 'Контакти',
		href: '/contact',
	},
];
