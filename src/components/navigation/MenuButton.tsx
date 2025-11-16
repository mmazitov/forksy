import { Button, UserMenu } from '@/components';
import { Menu, X } from 'lucide-react';

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
		<div className="flex md:hidden items-center gap-2">
			<UserMenu
				isLoggedIn={isLoggedIn}
				userName={userName}
				onLogout={handleLogout}
				onOpenAuth={() => setAuthModalOpen(true)}
			/>
			<Button
				className="p-2 hover:bg-muted rounded-md transition-colors"
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
