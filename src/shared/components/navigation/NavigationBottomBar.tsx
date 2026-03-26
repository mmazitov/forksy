import { Link } from 'react-router-dom';

import { useIsActive } from './utils';

import { NAVIGATION_ITEMS } from '@/shared/constants';

const NavigationBottomBar = () => {
	const isActive = useIsActive();

	return (
		<nav
			className="bg-card/95 border-border supports-backdrop-filter:bg-card/85 fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-lg lg:hidden"
			aria-label="Mobile navigation"
		>
			<ul className="flex h-16 items-stretch justify-around px-1">
				{NAVIGATION_ITEMS.map((item) => {
					const active = isActive(item.href);
					return (
						<li key={item.href} className="flex flex-1">
							<Link
								to={item.href}
								className={`group flex flex-1 flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
									active
										? 'text-primary'
										: 'text-muted-foreground hover:text-foreground'
								}`}
							>
								<span
									className={`relative flex h-8 w-12 items-center justify-center rounded-xl transition-all duration-200 ${
										active
											? 'bg-primary/12 scale-105'
											: 'group-hover:bg-muted'
									}`}
								>
									<item.icon
										className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110' : ''}`}
									/>
									{active && (
										<span className="bg-primary absolute -top-0.5 left-1/2 h-1 w-5 -translate-x-1/2 rounded-b-full" />
									)}
								</span>
								<span
									className={`text-[10px] leading-none font-medium transition-all duration-200 ${
										active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
									}`}
								>
									{item.name}
								</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default NavigationBottomBar;
