export const navigationItems = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Products',
		children: [
			{
				name: 'Products List',
				href: '/products-list',
			},
			{
				name: 'Categories',
				href: '/products-categories',
			},
			{
				name: 'Add Product',
				href: '/add-product',
				authRequired: true,
			},
		],
	},
	{
		name: 'Recipes',
		children: [
			{
				name: 'Recipes List',
				href: '/recipes-list',
			},
			{
				name: 'Categories',
				href: '/recipes-categories',
			},
			{
				name: 'Add Recipe',
				href: '/add-recipe',
				authRequired: true,
			},
		],
	},
	{
		name: 'About',
		href: '/about',
	},
	{
		name: 'Contact',
		href: '/contact',
	},
];
