import { IconType } from 'react-icons';
import { LuApple, LuCalendar, LuNotebookPen, LuSoup } from 'react-icons/lu';

export interface QuickAction {
	title: string;
	description: string;
	icon: IconType;
	link: string;
	color: string;
}

export const QUICK_ACTIONS: QuickAction[] = [
	{
		title: 'Моє меню',
		description: 'Плануйте харчування на тиждень',
		icon: LuNotebookPen,
		link: '/menu-planner',
		color: 'text-primary',
	},
	{
		title: 'Продукти',
		description: 'Вивчайте калорійність і КБЖУ',
		icon: LuApple,
		link: '/products',
		color: 'text-secondary',
	},
	{
		title: 'Страви',
		description: 'Додавайте улюблені рецепти',
		icon: LuSoup,
		link: '/dishes',
		color: 'text-accent',
	},
	{
		title: 'Розклад',
		description: 'Переглядайте план харчування',
		icon: LuCalendar,
		link: '/schedule',
		color: 'text-primary',
	},
];
