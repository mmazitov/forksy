'use client';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { navigationItems } from '@/data/navigationData';

// Type definitions
type NavigationItem = {
	name: string;
	href?: string;
	children?: NavigationItem[];
	authRequired?: boolean;
};

interface NavigationItemProps {
	item: NavigationItem;
	isActive: boolean;
	isHovered: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	currentPath: string;
	session: Session | null;
}

interface DropdownMenuProps {
	children: NavigationItem[];
	isVisible: boolean;
	currentPath: string;
	session: Session | null;
}

// Styles
const navigationStyle =
	'relative px-[10px] pb-[5px] text-[var(--black-color)] hover:text-[var(--main-color)] transition-link before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:bg-[var(--main-color)] hover:before:w-full before:w-0 before:transition-all before:duration-300 before:ease-in-out';
const activeStyle = 'text-[var(--main-color)] before:w-full';
const dropStyle =
	'left-0 absolute bg-[var(--white-color)] shadow-drop border border-[var(--black-color-weak)] rounded-[var(--radius)] w-[150px] z-100 drop-hidden';
const dropStyleVisible = 'drop-visible';

// Dropdown Menu Component
const DropdownMenu = ({
	children,
	isVisible,
	currentPath,
	session,
}: DropdownMenuProps) => (
	<ul className={`${dropStyle} ${isVisible ? dropStyleVisible : ''}`}>
		{children
			.filter((child) => !child.authRequired || (child.authRequired && session))
			.map((child) => (
				<li className="p-[10px]" key={child.name}>
					<Link
						href={child.href || '#'}
						className={`block !p-0 before:content-none ${navigationStyle} ${
							child.href === currentPath ? activeStyle : ''
						}`}
					>
						{child.name}
					</Link>
				</li>
			))}
	</ul>
);

// Navigation Item Component
const NavigationItem = ({
	item,
	isActive,
	isHovered,
	onMouseEnter,
	onMouseLeave,
	currentPath,
	session,
}: NavigationItemProps) => {
	// Don't render auth-required items for non-authenticated users
	if (item.authRequired && !session) {
		return null;
	}

	// Don't render parent items if all children require auth and user is not authenticated
	if (
		item.children &&
		item.children.every((child) => child.authRequired) &&
		!session
	) {
		return null;
	}

	return (
		<li
			className="group relative"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{item.href ? (
				<Link
					href={item.href}
					className={`${navigationStyle} ${isActive ? activeStyle : ''} ${
						isHovered && item.children ? activeStyle : ''
					}`}
				>
					{item.name}
				</Link>
			) : (
				<span
					className={`cursor-pointer ${navigationStyle} ${isActive ? activeStyle : ''} ${
						isHovered && item.children ? activeStyle : ''
					}`}
				>
					{item.name}
				</span>
			)}
			{item.children && (
				<DropdownMenu
					isVisible={isHovered}
					currentPath={currentPath}
					session={session}
				>
					{item.children}
				</DropdownMenu>
			)}
		</li>
	);
};

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
	const isActive = (item: NavigationItem) => {
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
