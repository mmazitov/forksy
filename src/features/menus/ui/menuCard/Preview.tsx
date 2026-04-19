import { SavedMenuFieldsFragment } from '@/shared/api/graphql';

interface PreviewProps {
	items: SavedMenuFieldsFragment['items'];
}

const Preview = ({ items }: PreviewProps) => {
	const dishesWithImages = items
		.filter((item) => item.dish.imageUrl)
		.slice(0, 4);

	if (dishesWithImages.length === 0) {
		return (
			<div className="bg-muted flex h-24 items-center justify-center rounded-md">
				<span className="text-muted-foreground text-sm">Немає зображень</span>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-4 gap-1 overflow-hidden rounded-md">
			{dishesWithImages.map((item, index) => (
				<div
					key={item.id}
					className="relative aspect-square overflow-hidden bg-muted"
				>
					<img
						src={item.dish.imageUrl!}
						alt={item.dish.name}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
						loading="lazy"
					/>
					{index === 3 && items.length > 4 && (
						<div className="absolute inset-0 flex items-center justify-center bg-black/60">
							<span className="text-sm font-semibold text-white">
								+{items.length - 4}
							</span>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Preview;
