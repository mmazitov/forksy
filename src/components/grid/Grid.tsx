import { ReactNode } from 'react';

interface GridProps<T extends { id: string }> {
	items: Array<T>;
	renderItem: (item: T) => ReactNode;
	emptyMessage?: string;
	showEmpty?: boolean;
}
const Grid = <T extends { id: string }>({
	items,
	renderItem,
	emptyMessage = 'Нічого не знайдено',
	showEmpty = true,
}: GridProps<T>) => {
	return (
		<>
			<div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
				{items.map((item) => (
					<div key={item.id}>{renderItem(item)}</div>
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
