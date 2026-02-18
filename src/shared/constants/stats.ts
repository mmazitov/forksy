export interface Stat {
	id: number;
	value: string;
	label: string;
	color: string;
}

export const STATS_ITEMS: Stat[] = [
	{
		id: 1,
		value: '500+',
		label: 'Рецептів',
		color: 'text-primary',
	},
	{
		id: 2,
		value: '1000+',
		label: 'Продуктів',
		color: 'text-secondary',
	},
	{
		id: 3,
		value: '24/7',
		label: 'Доступність',
		color: 'text-accent',
	},
];
