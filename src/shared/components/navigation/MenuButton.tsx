import { Menu, X } from 'lucide-react';

import { UserMenu } from '@/features/profile';
import { Button } from '@/shared/components';

interface MenuButtonProps {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (value: boolean) => void;
	isLoggedIn: boolean;
	userName: string;
	handleLogout: () => void;
	setAuthModalOpen: (value: boolean) => void;
	userImage?: string | null;
}

const MenuButton = ({
	mobileMenuOpen,
	setMobileMenuOpen,
	isLoggedIn,
	userName,
	handleLogout,
	setAuthModalOpen,
	userImage,
}: MenuButtonProps) => {
	return (
		<div className="flex items-center gap-2 lg:hidden">
			<UserMenu
				isLoggedIn={isLoggedIn}
				userName={userName}
				userImage={userImage || undefined}
				onLogout={handleLogout}
				onOpenAuth={() => setAuthModalOpen(true)}
			/>
			<Button
				className="hover:bg-muted rounded-md p-2 transition-colors"
				onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				variant={'ghost'}
				aria-label={mobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
				aria-expanded={mobileMenuOpen}
			>
				{mobileMenuOpen ? (
					<X className="h-6 w-6" aria-hidden="true" />
				) : (
					<Menu className="h-6 w-6" aria-hidden="true" />
				)}
			</Button>
		</div>
	);
};

export default MenuButton;
