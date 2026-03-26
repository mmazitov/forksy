import { UserMenu } from '@/features/profile';
import {
	Logo,
	Modal,
	NavigationBottomBar,
	NavigationDesktop,
	ThemeToggle,
} from '@/shared/components';
import { useAuthContext } from '@/features/auth';
import { MODAL_TYPES } from '@/shared/constants';
import { useModal } from '@/shared/hooks';

const Header = () => {
	const { isOpen: authModalOpen, setIsOpen: setAuthModalOpen } = useModal();

	const { isLoggedIn, userName, handleLogout, user } = useAuthContext();

	return (
		<>
			<nav className="border-border bg-card/95 supports-backdrop-filter:bg-card/80 sticky top-0 z-50 w-full border-b backdrop-blur">
				<div className="container mx-auto px-4">
					<div className="flex h-16 items-center justify-between">
						{/* Logo */}
						<Logo />

						{/* Desktop Navigation */}
						<NavigationDesktop
							isLoggedIn={isLoggedIn}
							userName={userName}
							userImage={user?.avatar}
							handleLogout={handleLogout}
							setAuthModalOpen={setAuthModalOpen}
						/>

						{/* Mobile: Theme toggle + User menu (visible only on mobile) */}
						<div className="flex items-center gap-1 lg:hidden">
							<ThemeToggle />
							<UserMenu
								isLoggedIn={isLoggedIn}
								userName={userName}
								userImage={user?.avatar || undefined}
								onLogout={handleLogout}
								onOpenAuth={() => setAuthModalOpen(true)}
							/>
						</div>
					</div>
				</div>

				<Modal
					modalType={MODAL_TYPES.AUTH_MODAL}
					open={authModalOpen}
					onOpenChange={setAuthModalOpen}
				/>
			</nav>

			{/* Mobile Bottom Navigation Bar */}
			<NavigationBottomBar />
		</>
	);
};

export default Header;
