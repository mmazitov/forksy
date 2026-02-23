import { Card, CardContent, CardFooter } from './card';

import { cn } from '@/shared/lib/utils';

export const Skeleton = ({
	className,
}: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn('bg-muted animate-pulse rounded-md', className)}>
			<Card className="flex h-full flex-col justify-between gap-2 overflow-hidden">
				<CardContent className="flex flex-col gap-2 p-0">
					<Skeleton className="h-48 w-full rounded-b-none" />
					<div className="flex flex-col gap-1 p-4 pt-2 pb-0">
						<Skeleton className="h-6 w-3/4" />
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="mt-2 h-4 w-full" />
						<Skeleton className="h-4 w-5/6" />
					</div>
				</CardContent>
				<CardFooter className="flex gap-2 px-4 pb-4">
					<Skeleton className="h-5 w-16" />
					<Skeleton className="h-5 w-16" />
				</CardFooter>
			</Card>
		</div>
	);
};
