import { Logo } from '@/components';

import { MODAL_TYPES } from '@/constants';
import { useAuthContext, useModal, useToggle } from '@/hooks';

import {
	MenuButton,
	Modal,
	NavigationDesktop,
	NavigationMobile,
} from '@/components';

const Header = () => {
	const [mobileMenuOpen, toggleMobileMenu, setMobileMenuOpen] = useToggle();
	const { isOpen: authModalOpen, setIsOpen: setAuthModalOpen } = useModal();

	const { isLoggedIn, userName, handleLogout } = useAuthContext();

	return (
		<nav className="border-border bg-card/95 supports-[backdrop-filter]:bg-card/80 sticky top-0 z-50 w-full border-b backdrop-blur">
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
