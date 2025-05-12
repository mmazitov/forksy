'use client';
import { Session } from 'next-auth';
import Link from 'next/link';

import { activeStyle, NavigationItem, navigationStyle } from './NavigationItem';

interface DropdownMenuProps {
	children: NavigationItem[];
	isVisible: boolean;
	currentPath: string;
	session: Session | null;
}

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
