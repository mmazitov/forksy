import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils/cn';

const buttonVariants = cva(
	'p-[var(--btn-padding)] border-[1px] border-[var(--btn-border)] rounded-[var(--radius)] min-w-[140px] font-medium text-[12px] text-[14px] transition-colors duration-300 ease-in-out cursor-pointer',
	{
		variants: {
			variant: {
				default:
					'bg-[var(--btn-bg)] text-[var(--btn-color)] hover:bg-[var(--btn-bg-hover)] hover:text-[var(--btn-color-hover)]',
				ghost:
					'hover:bg-[var(--btn-bg)] hover:text-[var(--btn-color)] bg-[var(--btn-bg-hover)] text-[var(--btn-color-hover)]',
				roundedColor:
					'rounded-[var(--radius)] p-0 flex justify-center items-center bg-linear-to-t from-[var(--gradient-start-color)] to-[var(--gradient-end-color)] min-w-[48px] h-[48px] text-[var(--btn-color)] ',
				roundedWhite:
					'rounded-[var(--radius)] p-0 flex justify-center items-center min-w-[48px] h-[48px] bg-[var(--rounded-btn-bg)] border-0',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	variant?: 'default' | 'ghost' | 'roundedColor' | 'roundedWhite';
	disabled?: boolean;
}
const Button = ({
	children,
	className,
	variant,
	type = 'button',
	onClick,
	disabled = false,
}: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={cn(buttonVariants({ variant }), className)}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
