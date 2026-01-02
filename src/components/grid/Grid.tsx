import { ReactNode } from 'react';

interface GridProps {
	items: Array<{ id: string; [key: string]: any }>;
	renderItem: (item: any) => ReactNode;
	emptyMessage?: string;
	showEmpty?: boolean;
}

const Grid = ({
	items,
	renderItem,
	emptyMessage = 'Нічого не знайдено',
	showEmpty = true,
}: GridProps) => {
	return (
		<>
			<div className="grid items-stretch grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
