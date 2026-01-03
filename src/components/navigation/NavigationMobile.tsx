import { Link } from 'react-router-dom';

import { useIsActive } from './utils';

import { Button } from '@/components';
import { NAVIGATION_ITEMS } from '@/constants';

interface NavigationMobileProps {
	mobileMenuOpen: boolean;
	setMobileMenuOpen: (value: boolean) => void;
}

const NavigationMobile = ({
	mobileMenuOpen,
	setMobileMenuOpen,
}: NavigationMobileProps) => {
	const isActive = useIsActive();

	return (
		<>
			{mobileMenuOpen && (
				<div className="animate-fade-in bg-card/95 absolute top-16.25 right-0 left-0 z-50 h-auto p-4 py-4 lg:hidden">
					<div className="flex flex-col gap-2">
						{NAVIGATION_ITEMS.map((item) => (
							<Link
								key={item.href}
								to={item.href}
								onClick={() => setMobileMenuOpen(false)}
							>
								<Button
									variant={isActive(item.href) ? 'default' : 'ghost'}
									className="w-full justify-start gap-2"
								>
									<item.icon className="h-4 w-4" />
									{item.name}
								</Button>
							</Link>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default NavigationMobile;
