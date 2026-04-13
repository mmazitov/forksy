import { useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { FloatingMenuItem } from '@/shared/types';

interface FloatingMenuProps {
	icon?: React.ReactNode;
	position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
	items?: FloatingMenuItem[];
	className?: string;
	mobileVisible?: boolean;
	closeOnClick?: boolean;
}

const BASE_BUTTON =
	'fixed flex items-center justify-center w-[50px] h-[50px] rounded-full z-50 transition-all duration-300';

const MAIN_BUTTON =
	'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg cursor-pointer';

const MENU_ITEM =
	'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] shadow-md';

const POSITION_CLASSES = {
	'bottom-right': 'bottom-17.5 md:bottom-4 right-4',
	'bottom-left': 'bottom-17.5 md:bottom-4 left-4',
	'top-right': 'top-4 right-4',
	'top-left': 'top-4 left-4',
} as const;

const ITEM_SPACING = 55;
const TRANSITION_DELAY = 50;

const getItemPosition = (index: number, isTop: boolean) => {
	const offset = (index + 1) * ITEM_SPACING * (isTop ? 1 : -1);
	return { x: 0, y: offset };
};

const getItemClasses = (position: string) => {
	const isBottom = position.includes('bottom');
	const isRight = position.includes('right');

	return cn(
		isBottom ? 'bottom-17.5 md:bottom-4' : 'top-4',
		isRight ? 'right-4' : 'left-4',
	);
};

const FloatingMenu = ({
	position = 'bottom-right',
	icon = '+',
	items = [],
	className,
	mobileVisible = true,
	closeOnClick = true,
}: FloatingMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const isTop = position.includes('top');
	const itemPositionClasses = getItemClasses(position);

	const handleItemClick = (onClick: () => void) => {
		onClick();
		if (closeOnClick) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
			)}

			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					BASE_BUTTON,
					MAIN_BUTTON,
					POSITION_CLASSES[position],
					mobileVisible && 'md:hidden',
					className,
				)}
			>
				<span className="text-xl">{icon}</span>
			</button>

			{items.map((item, index) => {
				const { x, y } = getItemPosition(index, isTop);

				return (
					<button
						key={`${item.label}-${index}`}
						onClick={() => !item.disabled && handleItemClick(item.onClick)}
						disabled={item.disabled}
						className={cn(
							BASE_BUTTON,
							MENU_ITEM,
							itemPositionClasses,
							isOpen
								? 'pointer-events-auto opacity-100'
								: 'pointer-events-none opacity-0',
							item.disabled && isOpen && 'disabled:opacity-50',
						)}
						style={{
							transform: isOpen
								? `translate(${x}px, ${y}px)`
								: 'translate(0, 0)',
							transitionDelay: isOpen ? `${index * TRANSITION_DELAY}ms` : '0ms',
						}}
						title={item.label}
					>
						{item.icon}
					</button>
				);
			})}
		</>
	);
};

export default FloatingMenu;
