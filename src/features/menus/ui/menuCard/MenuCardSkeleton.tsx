import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components';

const MenuCardSkeleton = () => {
	return (
		<Card className="flex h-full flex-col gap-3 overflow-hidden shadow-sm">
			<CardHeader className="space-y-2 pb-3">
				<div className="bg-muted h-5 w-32 animate-pulse rounded" />
				<div className="bg-muted h-4 w-24 animate-pulse rounded" />
			</CardHeader>

			<CardContent className="flex-1 space-y-3 px-6 py-0">
				<div className="grid grid-cols-7 gap-1">
					{Array.from({ length: 7 }).map((_, i) => (
						<div key={i} className="bg-muted h-16 animate-pulse rounded" />
					))}
				</div>

				<div className="grid grid-cols-2 gap-2">
					<div className="bg-muted h-4 animate-pulse rounded" />
					<div className="bg-muted h-4 animate-pulse rounded" />
					<div className="bg-muted h-4 animate-pulse rounded" />
					<div className="bg-muted h-4 animate-pulse rounded" />
				</div>
			</CardContent>

			<CardFooter className="px-6 pt-3 pb-6">
				<div className="flex w-full gap-2">
					<div className="bg-muted h-9 flex-1 animate-pulse rounded" />
					<div className="bg-muted h-9 w-9 animate-pulse rounded" />
					<div className="bg-muted h-9 w-9 animate-pulse rounded" />
				</div>
			</CardFooter>
		</Card>
	);
};

export default MenuCardSkeleton;
