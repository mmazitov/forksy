'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { navigationItems } from '@/data/navigationData';

const navigationStyle =
	'relative px-[10px] pb-[5px] text-[var(--black-color)] hover:text-[var(--main-color)] transition-link before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:bg-[var(--main-color)] hover:before:w-full before:w-0 before:transition-all before:duration-300 before:ease-in-out';
const activeStyle = 'text-[var(--main-color)] before:w-full';
const dropStyle =
	'left-0 absolute bg-[var(--white-color)] shadow-drop border border-[var(--black-color-weak)] rounded-[var(--radius)] w-[150px] z-100 drop-hidden';
const dropStyleVisible = 'drop-visible';

const Navigation = () => {
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const pathname = usePathname();

	const handleMouseEnter = (itemName: string) => {
		setHoveredItem(itemName);
	};

	const handleMouseLeave = () => {
		setHoveredItem(null);
	};

	// Check if item or any of its children is active
	type NavigationItem = {
		name: string;
		href?: string;
		children?: NavigationItem[];
	};

	const isActive = (item: NavigationItem) => {
		if (item.href === pathname) return true;
		if (item.children) {
			return item.children.some(
				(child: NavigationItem) => child.href === pathname,
			);
		}
		return false;
	};

	return (
		<nav role="navigation">
			<ul className="flex">
				{navigationItems.map((item) => {
					const active = isActive(item);
					const hovered = hoveredItem === item.name;

					return (
						<li
							key={item.name}
							className="group relative"
							onMouseEnter={() => handleMouseEnter(item.name)}
							onMouseLeave={handleMouseLeave}
						>
							{item.href ? (
								<Link
									href={item.href}
									className={`${navigationStyle} ${active ? activeStyle : ''} ${hovered && item.children ? activeStyle : ''}`}
								>
									{item.name}
								</Link>
							) : (
								<span
									className={`cursor-pointer ${navigationStyle} ${active ? activeStyle : ''} ${hovered && item.children ? activeStyle : ''}`}
								>
									{item.name}
								</span>
							)}
							{item.children && (
								<ul
									className={`${dropStyle} ${hoveredItem === item.name ? dropStyleVisible : ''}`}
								>
									{item.children.map((child) => (
										<li className="p-[10px]" key={child.name}>
											<Link
												href={child.href}
												className={`block !p-0 before:content-none ${navigationStyle} ${child.href === pathname ? activeStyle : ''}`}
											>
												{child.name}
											</Link>
										</li>
									))}
								</ul>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
