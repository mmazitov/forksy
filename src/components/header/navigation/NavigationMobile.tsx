'use client';

import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { navigationItems } from '@/data/navigationData';
import { toggleMenu } from '@/lib/redux/mobileMenu/slice';
import { RootState } from '@/lib/types/store';
import { NavigationItem as NavigationItemType } from '@/lib/types/types';

import { NavigationItem } from './NavigationItem';

interface NavigationMobileProps {
	session: Session | null;
}

const NavigationMobile = ({ session }: NavigationMobileProps) => {
	const dispatch = useDispatch();
	const isMenuOpen = useSelector(
		(state: RootState) => state.persisted.menuSlice.isOpen,
	);
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const pathname = usePathname();

	const handleMouseEnter = (itemName: string) => {
		setHoveredItem(itemName);
	};

	const handleMouseLeave = () => {
		setHoveredItem(null);
	};

	const handleDropdownToggle = (itemName: string) => {
		setOpenDropdown(openDropdown === itemName ? null : itemName);
	};

	const isActive = (item: NavigationItemType) => {
		if (item.href === pathname) return true;
		return item.children?.some((child) => child.href === pathname) || false;
	};

	return (
		<div className="md:hidden">
			<button
				onClick={() => dispatch(toggleMenu(!isMenuOpen))}
				className={`relative z-50 w-8 h-8 flex flex-col justify-between items-center group ${
					isMenuOpen ? 'open' : ''
				}`}
			>
				<span
					className={`block absolute h-0.5 w-full bg-[var(--foreground)] transform transition duration-300 ease-in-out  
          ${isMenuOpen ? 'rotate-45 top-3.5' : 'top-1'}`}
				></span>
				<span
					className={`block absolute h-0.5 w-full bg-[var(--foreground)] transform transition duration-300 ease-in-out top-3.5 
          ${isMenuOpen ? 'opacity-0' : ''}`}
				></span>
				<span
					className={`block absolute h-0.5 w-full bg-[var(--foreground)] transform transition duration-300 ease-in-out  
          ${isMenuOpen ? '-rotate-45 top-3.5' : 'top-6'}`}
				></span>
			</button>

			<div
				className={`fixed inset-0 w-64 bg-[var(--background)] transform transition-transform duration-300 ease-in-out z-10 ${
					isMenuOpen ? 'translate-x-[0]' : 'translate-x-[-200%]'
				}`}
			>
				<div className="px-6 pt-20">
					<nav className="flex flex-col">
						<ul className="flex flex-col space-y-4">
							{navigationItems.map((item) => (
								<NavigationItem
									key={item.name}
									item={item}
									isActive={isActive(item)}
									isHovered={hoveredItem === item.name}
									onMouseEnter={() => handleMouseEnter(item.name)}
									onMouseLeave={handleMouseLeave}
									currentPath={pathname}
									session={session}
									isMobile={true}
									isDropdownOpen={openDropdown === item.name}
									onDropdownToggle={() => handleDropdownToggle(item.name)}
								/>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default NavigationMobile;
