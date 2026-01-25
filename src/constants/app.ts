export const APP_CONFIG = {
	name: 'Forksy',
	description: 'Планувальник меню та продуктів',
	version: '1.0.0',
	theme: {
		storageKey: 'mealplanner-theme',
		defaultTheme: 'system' as const,
	},
	routes: {
		home: '/',
		schedule: '/schedule',
		menuPlanner: '/menu-planner',
		products: '/products',
		dishes: '/dishes',
	},
} as const;

export const ANIMATION_DURATION = {
	fast: 150,
	normal: 300,
	slow: 500,
	splash: 3500,
} as const;

export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const;

export const ITEMS_PER_PAGE = 10;

export const DEBOUNCE_DELAY = 500;
