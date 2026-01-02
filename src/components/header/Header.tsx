import { Logo } from '@/components';
import { useState } from 'react';

import { MODAL_TYPES } from '@/constants';
import { useAuth } from '@/hooks';

import {
	MenuButton,
	Modal,
	NavigationDesktop,
	NavigationMobile,
} from '@/components';

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [authModalOpen, setAuthModalOpen] = useState(false);

	const { isLoggedIn, userName, handleLogout } = useAuth();

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Logo />

					{/* Desktop Navigation */}
					<NavigationDesktop
						isLoggedIn={isLoggedIn}
						userName={userName}
						handleLogout={handleLogout}
						setAuthModalOpen={setAuthModalOpen}
					/>

					{/* Mobile Menu Button */}
					<MenuButton
						mobileMenuOpen={mobileMenuOpen}
						setMobileMenuOpen={setMobileMenuOpen}
						isLoggedIn={isLoggedIn}
						userName={userName}
						handleLogout={handleLogout}
						setAuthModalOpen={setAuthModalOpen}
					/>
				</div>

				{/* Mobile Navigation */}
				<NavigationMobile
					mobileMenuOpen={mobileMenuOpen}
					setMobileMenuOpen={setMobileMenuOpen}
				/>
			</div>

			<Modal
				modalType={MODAL_TYPES.AUTH_MODAL}
				open={authModalOpen}
				onOpenChange={setAuthModalOpen}
			/>
		</nav>
	);
};

export default Header;
