'use client';
import Link from 'next/link';

import { DropdownMenuProps } from '@/lib/types/types';

import { activeStyle, navigationStyle } from './NavigationItem';

// Styles
const dropStyle =
	'left-0 absolute shadow-drop border bg-[var(--drop-bg)] border-[var(--drop-border)] rounded-[var(--radius)] w-[150px] z-100 drop-hidden';
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

export default DropdownMenu;
