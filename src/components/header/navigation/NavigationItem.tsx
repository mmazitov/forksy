'use client';
import Link from 'next/link';

import { NavigationItemProps } from '@/lib/types/types';

import DropdownMenu from './DropdownMenu';

// Styles
export const navigationStyle =
	'relative px-[10px] pb-[5px] text-[var(--navigation-color)] hover:text-[var(--main-color)] transition-link before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:bg-[var(--main-color)] hover:before:w-full before:w-0 before:transition-all before:duration-300 before:ease-in-out';
export const mobileNavigationStyle =
	'relative w-full px-[10px] pb-[5px] text-[var(--navigation-color)] hover:text-[var(--main-color)] transition-link before:content-[""] before:absolute before:left-0 before:bottom-0 before:h-[1px] before:bg-[var(--main-color)] hover:before:w-full before:w-0 before:transition-all before:duration-300 before:ease-in-out';
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
	isMobile,
	isDropdownOpen,
	onDropdownToggle,
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

	// Determine if we should show this item as a link or with a dropdown
	const shouldShowAsLink = !item.showChildrenOnlyWhenAuthed || !session;
	const displayHref =
		!item.children || shouldShowAsLink ? item.href : undefined;
	const displayChildren = shouldShowAsLink ? null : item.children;

	const handleItemClick = () => {
		if (isMobile && displayChildren && onDropdownToggle) {
			onDropdownToggle();
		}
	};

	return (
		<li
			className={`${isMobile ? 'w-full' : 'group relative'}`}
			onMouseEnter={isMobile ? undefined : onMouseEnter}
			onMouseLeave={isMobile ? undefined : onMouseLeave}
		>
			{displayHref ? (
				<Link
					href={displayHref}
					className={`${isMobile ? mobileNavigationStyle : navigationStyle} ${
						isActive ? activeStyle : ''
					} ${(isHovered || isDropdownOpen) && displayChildren ? activeStyle : ''} 
					${isMobile ? 'flex items-center justify-between' : ''}`}
					onClick={handleItemClick}
				>
					{item.name}
					{isMobile && displayChildren && (
						<svg
							className={`w-4 h-4 transform transition-transform duration-200 ${
								isDropdownOpen ? 'rotate-180' : ''
							}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					)}
				</Link>
			) : (
				<span
					className={`cursor-pointer ${
						isMobile ? mobileNavigationStyle : navigationStyle
					} ${isActive ? activeStyle : ''} ${
						(isHovered || isDropdownOpen) && displayChildren ? activeStyle : ''
					} ${isMobile ? 'flex items-center justify-between' : ''}`}
					onClick={handleItemClick}
				>
					{item.name}
					{isMobile && displayChildren && (
						<svg
							className={`w-4 h-4 transform transition-transform duration-200 ${
								isDropdownOpen ? 'rotate-180' : ''
							}`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					)}
				</span>
			)}
			{displayChildren && (
				<DropdownMenu
					isVisible={isMobile ? isDropdownOpen : isHovered}
					currentPath={currentPath}
					session={session}
					isMobile={isMobile}
				>
					{displayChildren}
				</DropdownMenu>
			)}
		</li>
	);
};
