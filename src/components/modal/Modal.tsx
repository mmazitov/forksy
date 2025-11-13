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

const { AUTH_MODAL, ADD_DISH_MODAL } = MODAL_TYPES;

interface ModalProps {
	modalType: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	selectedMeal?: string | null;
	searchQuery?: string;
	onSearchChange?: (query: string) => void;
	onDishSelect?: (dish: any) => void;
	[key: string]: any;
}

const Modal = ({
	modalType,
	open,
	onOpenChange,
	selectedMeal,
	searchQuery = '',
	onSearchChange,
	onDishSelect,
	...restProps
}: ModalProps) => {
	const [isLogin, setIsLogin] = useState(true);

	const getModalTitle = () => {
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
			case AUTH_MODAL:
				return (
					<AuthModal
						onOpenChange={onOpenChange}
						isLogin={isLogin}
						setIsLogin={setIsLogin}
						{...restProps}
					/>
				);
			case ADD_DISH_MODAL:
				return (
					<AddDishModal
						isOpen={open}
						onOpenChange={onOpenChange}
						selectedMeal={selectedMeal || null}
						searchQuery={searchQuery}
						onSearchChange={onSearchChange || (() => {})}
						onDishSelect={onDishSelect || (() => {})}
					/>
				);
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
