'use client';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { navigationItems } from '@/data/navigationData';

import type { NavigationItem as NavigationItemType } from './NavigationItem';
import { NavigationItem } from './NavigationItem';

interface NavigationProps {
	session: Session | null;
}

const Navigation = ({ session }: NavigationProps) => {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const pathname = usePathname();

	const handleMouseEnter = (itemName: string) => {
		setHoveredItem(itemName);
	};

	const handleMouseLeave = () => {
		setHoveredItem(null);
	};

	// Check if item or any of its children is active
	const isActive = (item: NavigationItemType) => {
		if (item.href === pathname) return true;
		return item.children?.some((child) => child.href === pathname) || false;
	};

	return (
		<nav role="navigation">
			<ul className="flex">
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
					/>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
