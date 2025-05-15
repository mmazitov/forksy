'use client';
import { forwardRef, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { InputProps } from '@/lib/types/types';
import { cn } from '@/lib/utils/cn';

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			type = 'text',
			id,
			name,
			placeholder,
			className,
			disabled,
			showToggle = false,
			showIcon,
			icon,
			value,
			onChange,
			onKeyDown,
			...props
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(!showToggle);

		return (
			<div className="relative w-full">
				<input
					ref={ref}
					type={showToggle ? (showPassword ? 'text' : 'password') : type}
					id={id}
					name={name}
					placeholder={placeholder}
					disabled={disabled}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
					className={cn(
						'w-full rounded-[var(--radius)] text-[10px] md:text-[14px] border-[var(--input-border)] border-[1px] bg-[var(--input-bg)] p-[8px] outline-none text-[var(--input-color)] placeholder:text-[var(--input-placeholder-color)]',
						className,
					)}
					{...props}
				/>
				{showToggle && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="right-[10px] absolute inset-y-0 flex justify-center items-center w-[40px] text-[var(--input-color)] cursor-pointer"
					>
						{showPassword ? (
							<FaRegEye size={20} className="" />
						) : (
							<FaRegEyeSlash size={20} className="" />
						)}
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

export default Input;
