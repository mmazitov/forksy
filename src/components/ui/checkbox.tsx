import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import * as React from 'react';
import { LuCheck } from 'react-icons/lu';
import { Label } from './label';

interface Props
	extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
	label?: string;
	subLabel?: string;
	setChecked?: (checked: boolean) => void;
}

function Checkbox({ label, subLabel, className, setChecked, ...props }: Props) {
	return (
		<label className="flex items-center gap-2 justify-between cursor-pointer select-none">
			<div className="flex flex-col">
				{label && <Label>{label}</Label>}{' '}
				{subLabel && (
					<p className="text-sm text-muted-foreground">{subLabel}</p>
				)}
			</div>
			<CheckboxPrimitive.Root
				className={clsx(
					'peer h-5 min-w-5 border border-input bg-background',
					'data-[state=checked]:bg-ring data-[state=checked]:border-ring',
					'data-[state=unchecked]:bg-background',
					'transition-colors',
					className,
				)}
				{...props}
				onCheckedChange={setChecked}
			>
				<CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
					<LuCheck size={16} strokeWidth={3} />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
		</label>
	);
}

export { Checkbox };
