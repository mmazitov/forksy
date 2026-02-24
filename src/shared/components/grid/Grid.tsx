import { ComponentType, ReactNode } from 'react';

interface GridProps<T extends { id: string }> {
	items: Array<T>;
	renderItem?: (item: T) => ReactNode;
	itemComponent?: ComponentType<T>;
	emptyMessage?: string;
	showEmpty?: boolean;
	isLoading?: boolean;
	renderSkeleton?: () => ReactNode;
	skeletonComponent?: ComponentType;
	skeletonCount?: number;
}
const Grid = <T extends { id: string }>({
	items,
	renderItem,
	itemComponent: ItemComponent,
	emptyMessage = 'Нічого не знайдено',
	showEmpty = true,
	isLoading = false,
	renderSkeleton,
	skeletonComponent: SkeletonComponent,
	skeletonCount = 5,
}: GridProps<T>) => {
	const hasSkeleton = renderSkeleton || SkeletonComponent;

	if (isLoading && hasSkeleton) {
		return (
			<div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{Array.from({ length: skeletonCount }).map((_, index) => (
					<div key={`skeleton-${index}`}>
						{SkeletonComponent ? <SkeletonComponent /> : renderSkeleton?.()}
					</div>
				))}
			</div>
		);
	}

	return (
		<>
			<div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{items.map((item) => (
					<div key={item.id}>
						{ItemComponent ? <ItemComponent {...item} /> : renderItem?.(item)}
					</div>
				))}
			</div>

			{showEmpty && items.length === 0 && (
				<div className="py-12 text-center">
					<p className="text-muted-foreground">{emptyMessage}</p>
				</div>
			)}
		</>
	);
};

export default Grid;
