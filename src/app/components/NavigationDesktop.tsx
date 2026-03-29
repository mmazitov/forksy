import { Link } from 'react-router-dom';

import { ThemeToggle } from '@/shared/components';
import { NAVIGATION_ITEMS } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { useIsActive } from '@/shared/components/navigation/utils';
import { UserMenu } from '@/features/profile';

interface NavigationDesktopProps {
	isLoggedIn: boolean;
	userName: string;
	handleLogout: () => void;
	setAuthModalOpen: (value: boolean) => void;
	userImage?: string | null;
}

const NavigationDesktop = ({
	isLoggedIn,
	userName,
	handleLogout,
	setAuthModalOpen,
	userImage,
}: NavigationDesktopProps) => {
	const isActive = useIsActive();

	return (
		<div className="hidden items-center gap-1 lg:flex">
			{NAVIGATION_ITEMS.map((item) => {
				const active = isActive(item.href);
				return (
					<Link
						key={item.href}
						to={item.href}
						className={cn(
							'relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
							active
								? 'bg-primary text-primary-foreground shadow-sm'
								: 'text-muted-foreground hover:bg-muted hover:text-foreground',
						)}
					>
						<item.icon
							className={cn(
								'h-4 w-4 transition-transform duration-300',
								active ? 'scale-110' : 'group-hover:-translate-y-0.5',
							)}
						/>
						{item.name}
					</Link>
				);
			})}
			<ThemeToggle />
			<UserMenu
				isLoggedIn={isLoggedIn}
				userName={userName}
				userImage={userImage || undefined}
				onLogout={handleLogout}
				onOpenAuth={() => setAuthModalOpen(true)}
			/>
		</div>
	);
};

export default NavigationDesktop;
