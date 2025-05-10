export const navigationItems = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Products',
		href: 'products/products-list',
		showChildrenOnlyWhenAuthed: true,
		children: [
			{
				name: 'Products List',
				href: 'products/products-list',
			},
			{
				name: 'Add Product',
				href: '/products/add-product',
			},
		],
	},
	{
		name: 'Recipes',
		href: '/recipes/recipes-list',
		showChildrenOnlyWhenAuthed: true,
		children: [
			{
				name: 'Recipes List',
				href: '/recipes/recipes-list',
			},
			{
				name: 'Add Recipe',
				href: '/recipes/add-recipe',
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
