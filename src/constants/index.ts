export {
	CATEGORIES_DISHES,
	CATEGORIES_PRODUCTS,
	type Category,
} from './categories';

export { MODAL_TYPES, type ModalTypes } from './modals';
export { NAVIGATION_ITEMS, type NavigationItem } from './navigation';
export { QUICK_ACTIONS, type QuickAction } from './quickActions';
export { SOCIAL_ITEMS, type SocialItem } from './social';
export { STATS_ITEMS, type Stat } from './stats';

// App constants
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

// Animation constants
export const ANIMATION_DURATION = {
	fast: 150,
	normal: 300,
	slow: 500,
	splash: 3500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
} as const;
