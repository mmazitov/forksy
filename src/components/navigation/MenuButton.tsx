import { Menu, X } from 'lucide-react';

import { Button, UserMenu } from '@/components';

interface MenuButtonProps {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (value: boolean) => void;
	isLoggedIn: boolean;
	userName: string;
	handleLogout: () => void;
	setAuthModalOpen: (value: boolean) => void;
}

const MenuButton = ({
	mobileMenuOpen,
	setMobileMenuOpen,
	isLoggedIn,
	userName,
	handleLogout,
	setAuthModalOpen,
}: MenuButtonProps) => {
	return (
		<div className="flex items-center gap-2 lg:hidden">
			<UserMenu
				isLoggedIn={isLoggedIn}
				userName={userName}
				onLogout={handleLogout}
				onOpenAuth={() => setAuthModalOpen(true)}
			/>
			<Button
				className="hover:bg-muted rounded-md p-2 transition-colors"
				onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				variant={'ghost'}
			>
				{mobileMenuOpen ? (
					<X className="h-6 w-6" />
				) : (
					<Menu className="h-6 w-6" />
				)}
			</Button>
		</div>
	);
};

export default MenuButton;
