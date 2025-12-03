import {
	AddDishModal,
	AuthModal,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components';
import { MODAL_TYPES } from '@/constants';
import { modalsConfig } from '@/lib/config';
import { useState } from 'react';
import { AddDishModalProps, AuthModalProps, Dish } from './types';

const { AUTH_MODAL, ADD_DISH_MODAL } = MODAL_TYPES;

interface ModalPropsBase {
	modalType: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

interface AuthModalPropsExtended extends ModalPropsBase {
	modalType: typeof AUTH_MODAL;
}

interface AddDishModalPropsExtended extends ModalPropsBase {
	modalType: typeof ADD_DISH_MODAL;
	selectedMeal?: string | null;
	searchQuery?: string;
	onSearchChange?: (query: string) => void;
	onDishSelect?: (dish: Dish) => void;
}

type ModalProps = (AuthModalPropsExtended | AddDishModalPropsExtended) &
	Record<string, unknown>;

const Modal = ({
	modalType,
	open,
	onOpenChange,
	selectedMeal = null,
	searchQuery = '',
	onSearchChange,
	onDishSelect,
	...restProps
}: ModalProps) => {
	const [isLogin, setIsLogin] = useState(true);

	const getModalTitle = (): string => {
		switch (modalType) {
			case AUTH_MODAL:
				const { LOGIN, REGISTER } = modalsConfig.AUTH_MODAL;
				return isLogin ? LOGIN.title : REGISTER.title;
			case ADD_DISH_MODAL:
				return `Виберіть блюдо для ${selectedMeal}`;
			default:
				return 'Modal';
		}
	};

	const getModalContent = () => {
		switch (modalType) {
			case AUTH_MODAL: {
				const authProps: AuthModalProps = {
					onOpenChange,
					isLogin,
					setIsLogin,
					...restProps,
				};
				return <AuthModal {...authProps} />;
			}
			case ADD_DISH_MODAL: {
				const dishProps: AddDishModalProps = {
					isOpen: open,
					onOpenChange,
					selectedMeal: (selectedMeal as string) || null,
					searchQuery: (searchQuery as string) || '',
					onSearchChange: (onSearchChange as (query: string) => void) || (() => {}),
					onDishSelect: (onDishSelect as (dish: Dish) => void) || (() => {}),
				};
				return <AddDishModal {...dishProps} />;
			}
			default:
				return <div>Unknown modal type: {modalType}</div>;
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className={
					modalType === ADD_DISH_MODAL
						? 'max-w-2xl max-h-[80vh] overflow-y-auto'
						: 'sm:max-w-md'
				}
			>
				<DialogHeader>
					<DialogTitle
						className={
							modalType === ADD_DISH_MODAL
								? ''
								: 'text-2xl font-bold text-center'
						}
					>
						{getModalTitle()}
					</DialogTitle>
				</DialogHeader>
				{getModalContent()}
			</DialogContent>
		</Dialog>
	);
};

export default Modal;
