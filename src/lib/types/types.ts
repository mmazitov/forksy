import { Product } from '@prisma/client';
import { Session } from 'next-auth';
import { ReactNode } from 'react';

import { NutritionData } from './nutrition';

export interface ProductProps {
	product: Product;
	session: Session | null;
}

export interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	variant?: 'default' | 'ghost' | 'roundedColor' | 'roundedWhite';
	disabled?: boolean;
}

export interface FormHeaderProps {
	title?: string;
	caption?: string;
	showCancel?: boolean;
	modalType?: 'isSignIn' | 'isSignUp';
}

export interface ProductAddFormProps {
	selectedNutrition?: NutritionData;
}

export interface DropdownMenuProps {
	children: NavigationItem[];
	isVisible: boolean;
	currentPath: string;
	session: Session | null;
}

// Type definitions
export type NavigationItem = {
	name: string;
	href?: string;
	children?: NavigationItem[];
	authRequired?: boolean;
	showChildrenOnlyWhenAuthed?: boolean;
};

export interface NavigationItemProps {
	item: NavigationItem;
	isActive: boolean;
	isHovered: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	currentPath: string;
	session: Session | null;
}

export interface PageHeaderProps {
	children?: ReactNode;
	className?: string;
	pageTitle?: string;
}

export interface CheckboxProps {
	label: string;
	checked?: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface CloseButtonProps {
	modalType: 'isSignIn' | 'isSignUp' | 'isProductEdit';
	className?: string;
}

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	showToggle?: boolean;
	showIcon?: boolean;
	icon?: React.ReactNode;
}
