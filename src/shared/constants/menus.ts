export interface MenuTab {
	title: string;
	value: string;
	disabled: boolean;
}

export const MENU_TABS: MenuTab[] = [
	{ title: 'Мої меню', value: 'my', disabled: false },
	{ title: 'Shared зі мною', value: 'shared', disabled: false },
];
