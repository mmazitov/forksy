import { IconType } from 'react-icons';
import {
	LuApple,
	LuCalendar,
	LuChefHat,
	LuNotebookPen,
	LuSoup,
} from 'react-icons/lu';

export interface NavigationItem {
	name: string;
	href: string;
	icon: IconType;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
	{
		name: 'Головна',
		href: '/',
		icon: LuChefHat,
	},
	{
		name: 'Розклад',
		href: '/schedule',
		icon: LuCalendar,
	},
	{
		name: 'Планувальник',
		href: '/menu-planner',
		icon: LuNotebookPen,
	},
	{
		name: 'Продукти',
		href: '/products',
		icon: LuApple,
	},
	{
		name: 'Страви',
		href: '/dishes',
		icon: LuSoup,
	},
] as const;
