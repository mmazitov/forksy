import { cn } from '@/shared/lib/utils';

export const SkeletonBody = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn('bg-muted animate-pulse rounded-md', className)}
			{...props}
		/>
	);
};
