import * as React from 'react';
import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

import { cn } from '@/lib/utils/cn';

interface InputProps extends React.ComponentProps<'input'> {
	showToggle?: boolean;
	showIcon?: boolean;
	icon?: React.ReactNode;
	placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, type, showToggle, showIcon, icon, placeholder, ...props },
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);

		return (
			<div className="relative w-full">
				<input
					type={showToggle ? (showPassword ? 'text' : 'password') : type}
					className={cn(
						'border-input bg-background ring-offset-background file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring hover:border-ring flex h-10 w-full rounded-md border px-3 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						className,
					)}
					placeholder={placeholder}
					ref={ref}
					{...props}
				/>
				{showToggle && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute inset-y-0 right-[10px] flex w-[40px] cursor-pointer items-center justify-center text-[var(--input-color)]"
					>
						{showPassword ? <LuEye size={20} /> : <LuEyeOff size={20} />}
					</button>
				)}
				{showIcon && (
					<div className="absolute top-1/2 right-4 -translate-y-1/2 transform text-inherit">
						{icon}
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
