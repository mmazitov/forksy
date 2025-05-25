'use client';
import Link from 'next/link';

import { DropdownMenuProps } from '@/lib/types/types';

import { activeStyle, navigationStyle } from './NavigationItem';

// Styles
const dropStyle =
	'left-0 absolute shadow-drop border bg-[var(--drop-bg)] border-[var(--drop-border)] rounded-[var(--radius)] w-[150px] z-100 drop-hidden';
const mobileDropStyle =
	'w-full pl-4 space-y-2 overflow-hidden transition-all duration-300';

// Dropdown Menu Component
const DropdownMenu = ({
	children,
	isVisible,
	currentPath,
	session,
	isMobile,
}: DropdownMenuProps & { isMobile?: boolean }) => (
	<ul
		className={
			isMobile
				? `${mobileDropStyle} ${isVisible ? 'max-h-96' : 'max-h-0'}`
				: `${dropStyle} ${isVisible ? 'drop-visible' : ''}`
		}
	>
		{children
			.filter((child) => !child.authRequired || (child.authRequired && session))
			.map((child) => (
				<li className={isMobile ? 'py-2' : 'p-[10px]'} key={child.name}>
					<Link
						href={child.href || '#'}
						className={`block !p-0 ${
							isMobile ? '' : 'before:content-none'
						} ${navigationStyle} ${
							child.href === currentPath ? activeStyle : ''
						}`}
					>
						{child.name}
					</Link>
				</li>
			))}
	</ul>
);

export default DropdownMenu;
