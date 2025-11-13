import { Button, ThemeToggle, UserMenu } from '@/components';
import { NAVIGATION_ITEMS } from '@/constants';
import { Link } from 'react-router-dom';
import { useIsActive } from './utils';

interface NavigationDesktopProps {
	isLoggedIn: boolean;
	userName: string;
	handleLogout: () => void;
	setAuthModalOpen: (value: boolean) => void;
}

const NavigationDesktop = ({
	isLoggedIn,
	userName,
	handleLogout,
	setAuthModalOpen,
}: NavigationDesktopProps) => {
	const isActive = useIsActive();

	return (
		<div className="hidden md:flex items-center gap-1">
			{NAVIGATION_ITEMS.map((item) => (
				<Link key={item.href} to={item.href}>
					<Button
						variant={isActive(item.href) ? 'default' : 'ghost'}
						size="sm"
						className="gap-2"
					>
						<item.icon className="h-4 w-4" />
						{item.name}
					</Button>
				</Link>
			))}
			<ThemeToggle />
			<UserMenu
				isLoggedIn={isLoggedIn}
				userName={userName}
				onLogout={handleLogout}
				onOpenAuth={() => setAuthModalOpen(true)}
			/>
		</div>
	);
};

export default NavigationDesktop;
