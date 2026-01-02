import { Button } from '@/components';
import { NAVIGATION_ITEMS } from '@/constants';
import { Link } from 'react-router-dom';
import { useIsActive } from './utils';

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
				<div className="md:hidden py-4 animate-fade-in absolute left-0 right-0 top-[65px] bg-card/95 z-50 p-4 h-auto">
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
