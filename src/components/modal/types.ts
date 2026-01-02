export interface Dish {
	id: string;
	name: string;
	calories: number;
	description?: string;
	image?: string;
	category?: string;
}

export interface AuthModalProps {
	onOpenChange: (open: boolean) => void;
	isLogin: boolean;
	setIsLogin: (isLogin: boolean) => void;
	[key: string]: unknown;
}

export interface AddDishModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	selectedMeal: string | null;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onDishSelect: (dish: Dish) => void;
}

export interface BaseModalProps {
	modalType: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export interface AuthModalState extends BaseModalProps {
	modalType: 'auth';
}

export interface AddDishModalState extends BaseModalProps {
	modalType: 'addDish';
	selectedMeal: string | null;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onDishSelect: (dish: Dish) => void;
}

export type ModalState = AuthModalState | AddDishModalState;
