import type { ComponentProps } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

import { Input, Label, Textarea } from '@/components';

interface FormItemProps {
	itemType?: string;
	type?: string;
	id?: string;
	label?: string;
	step?: number;
	error?: FieldError;
	registration?: UseFormRegisterReturn;
	inputProps?: Omit<ComponentProps<typeof Input>, 'id'>;
	textareaProps?: Omit<ComponentProps<typeof Textarea>, 'id'>;
	className?: string;
}

const FormItem = ({
	itemType = 'input',
	type = 'text',
	id,
	label,
	step,
	error,
	registration,
	inputProps,
	textareaProps,
	className,
}: FormItemProps) => {
	return (
		<div className={`space-y-2 ${className}`}>
			<Label htmlFor={id}>{label}</Label>
			{itemType === 'textarea' ? (
				<Textarea id={id} {...registration} {...textareaProps} />
			) : (
				<Input
					id={id}
					{...registration}
					{...inputProps}
					type={type}
					step={step}
				/>
			)}
			{error && <p className="text-destructive text-sm">{error.message}</p>}
		</div>
	);
};

export default FormItem;
