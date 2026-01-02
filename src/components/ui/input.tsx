import * as React from 'react';

import { cn } from '@/lib/utils/cn';
import { useState } from 'react';
import { LuEye, LuEyeOff } from 'react-icons/lu';

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
						'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hover:border-ring transition-colors',
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
						className="right-[10px] absolute inset-y-0 flex justify-center items-center w-[40px] text-[var(--input-color)] cursor-pointer"
					>
						{showPassword ? <LuEye size={20} /> : <LuEyeOff size={20} />}
					</button>
				)}
				{showIcon && (
					<div className="top-1/2 right-4 absolute text-inherit -translate-y-1/2 transform">
						{icon}
					</div>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
