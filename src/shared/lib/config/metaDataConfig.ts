import { PAGE_TITLE } from '@/shared/constants/pageTitle';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://mealvy.vercel.app';

export const METADATA_CONFIG = {
	site: {
		name: 'Mealvy',
		fullName: 'Mealvy - Планувальник харчування та менеджер рецептів',
		description:
			'Ваш особистий планувальник харчування та менеджер рецептів. Плануйте свої страви, керуйте рецептами та відкривайте нові страви з детальною інформацією про поживні речовини.',
		url: SITE_URL,
		image: `${SITE_URL}/og-image.jpg`,
		language: 'uk',
		type: 'website',
	},

	social: {
		twitter: '@Mealvy',
		facebook: 'Mealvy',
		instagram: '@Mealvy_app',
	},

	keywords: {
		home: PAGE_TITLE.home.keywords,
		products: PAGE_TITLE.products.keywords,
		dishes: PAGE_TITLE.dishes.keywords,
		schedule: PAGE_TITLE.schedule.keywords,
		menu: PAGE_TITLE.planer.keywords,
		shoppingList: PAGE_TITLE.shoppingList.keywords,
		settings: PAGE_TITLE.settings.keywords,
		profile: PAGE_TITLE.profile.keywords,
		favorites: PAGE_TITLE.favorites.keywords,
		notFound: PAGE_TITLE.notFound.keywords,
		menus: PAGE_TITLE.menus.keywords,
	},

	titles: {
		home: PAGE_TITLE.home.title,
		products: PAGE_TITLE.products.title,
		dishes: PAGE_TITLE.dishes.title,
		schedule: PAGE_TITLE.schedule.title,
		menu: PAGE_TITLE.planer.title,
		addProduct: PAGE_TITLE.addProduct.title,
		editProduct: PAGE_TITLE.editProduct.title,
		addDish: PAGE_TITLE.addDish.title,
		editDish: PAGE_TITLE.editDish.title,
		profile: PAGE_TITLE.profile.title,
		settings: PAGE_TITLE.settings.title,
		favorites: PAGE_TITLE.favorites.title,
		notFound: PAGE_TITLE.notFound.title,
		shoppingList: PAGE_TITLE.shoppingList.title,
		menus: PAGE_TITLE.menus.title,
	},

	descriptions: {
		home: PAGE_TITLE.home.description,
		products: PAGE_TITLE.products.description,
		dishes: PAGE_TITLE.dishes.description,
		schedule: PAGE_TITLE.schedule.description,
		menu: PAGE_TITLE.planer.description,
		addProduct: PAGE_TITLE.addProduct.description,
		editProduct: PAGE_TITLE.editProduct.description,
		addDish: PAGE_TITLE.addDish.description,
		editDish: PAGE_TITLE.editDish.description,
		profile: PAGE_TITLE.profile.description,
		settings: PAGE_TITLE.settings.description,
		favorites: PAGE_TITLE.favorites.description,
		notFound: PAGE_TITLE.notFound.description,
		shoppingList: PAGE_TITLE.shoppingList.description,
		menus: PAGE_TITLE.menus.description,
	},
};
