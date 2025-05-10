'use client';
import { Session } from 'next-auth';
import Link from 'next/link';

import DropdownMenu from './DropdownMenu';

// Type definitions
export type NavigationItem = {
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

// Styles
export const navigationStyle =
	'relative px-[10px] pb-[5px] text-[var(--black-color)] hover:text-[var(--main-color)] transition-link before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:bg-[var(--main-color)] hover:before:w-full before:w-0 before:transition-all before:duration-300 before:ease-in-out';
export const activeStyle = 'text-[var(--main-color)] before:w-full';

// Navigation Item Component
export const NavigationItem = ({
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
