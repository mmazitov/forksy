import { forwardRef } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/lib/utils';

export interface FormInputProps extends React.HTMLAttributes<HTMLDivElement> {
	label?: string;
	error?: FieldError;
	registration?: UseFormRegisterReturn;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
	itemType?: 'input' | 'textarea';
	id: string;
	showToggle?: boolean;
}

const FormInput = forwardRef<HTMLDivElement, FormInputProps>(
	(
		{
			className,
			label,
			error,
			registration,
			inputProps,
			textareaProps,
			itemType = 'input',
			id,
			showToggle,
			...props
		},
		ref,
	) => {
		return (
			<div ref={ref} className={cn('space-y-2', className)} {...props}>
				{label && (
					<Label htmlFor={id} className={error ? 'text-destructive' : ''}>
						{label}
					</Label>
				)}
				{itemType === 'textarea' ? (
					<Textarea
						id={id}
						className={cn(
							error && 'border-destructive focus-visible:ring-destructive',
						)}
						{...registration}
						{...textareaProps}
					/>
				) : (
					<Input
						id={id}
						className={cn(
							error && 'border-destructive focus-visible:ring-destructive',
						)}
						showToggle={showToggle}
						{...registration}
						{...inputProps}
					/>
				)}
				{error && (
					<p className="text-destructive text-sm font-medium">
						{error.message}
					</p>
				)}
			</div>
		);
	},
);

FormInput.displayName = 'FormInput';

export default FormInput;
