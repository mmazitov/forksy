import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import * as React from 'react';
import { LuCheck } from 'react-icons/lu';

import { Label } from './label';

interface Props extends React.ComponentPropsWithoutRef<
	typeof CheckboxPrimitive.Root
> {
	label?: string;
	subLabel?: string;
}

const Checkbox = ({ label, subLabel, className, ...props }: Props) => {
	return (
		<label className="flex cursor-pointer items-center justify-between gap-2 select-none">
			<div className="flex flex-col">
				{label && <Label>{label}</Label>}{' '}
				{subLabel && (
					<p className="text-muted-foreground text-sm">{subLabel}</p>
				)}
			</div>
			<CheckboxPrimitive.Root
				className={clsx(
					'peer border-input bg-background h-5 min-w-5 border',
					'data-[state=checked]:bg-ring data-[state=checked]:border-ring',
					'data-[state=unchecked]:bg-background',
					'transition-colors',
					className,
				)}
				{...props}
			>
				<CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
					<LuCheck size={16} strokeWidth={3} />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		</label>
	);
};

export { Checkbox };
