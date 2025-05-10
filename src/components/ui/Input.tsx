'use client';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { cn } from '@/lib/utils/cn';

interface InputProps {
	type: string;
	id?: string;
	name: string;
	placeholder?: string;
	showToggle?: boolean;
	showIcon?: boolean;
	className?: string;
	icon?: React.ReactNode;
	disabled?: boolean;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
	type,
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
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(!showToggle);

	return (
		<div className="relative w-full">
			<input
				type={showToggle ? (showPassword ? 'text' : 'password') : type}
				id={id}
				name={name}
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				onChange={onChange}
				className={cn(
					'w-full rounded-[var(--radius)] text-[10px] md:text-[14px] border-[var(--input-border)] border-[1px] bg-[var(--input-bg)] p-[8px] outline-none text-[var(--input-color)] placeholder:text-[var(--input-placeholder-color)]',
					className,
				)}
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
};

export default Input;
