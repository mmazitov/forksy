import { useFavoriteDish } from '@/features/dishes/hooks/useDish';
import { FavoriteButton } from '@/shared/components';
import { cn } from '@/shared/lib/utils';

interface ImageProps {
	id: string;
	name: string;
	imageUrl?: string | null;
	isFavorite?: boolean | null;
	variant?: 'compact' | 'full';
}

const Image = ({
	id,
	name,
	imageUrl,
	isFavorite: initialIsFavorite = false,
	variant = 'compact',
}: ImageProps) => {
	const { isFavorite, toggleFavorite } = useFavoriteDish(
		id,
		initialIsFavorite || false,
	);

	const handleFavoriteClick = (e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		toggleFavorite();
	};

	const isFull = variant === 'full';

	return (
		<div
			className={cn(
				'bg-muted relative overflow-hidden',
				isFull ? 'h-75 rounded-2xl lg:h-78.75' : 'h-44.25',
			)}
		>
			<FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick} />

			{!isFull && (
				<div
					className="bg-background/5 absolute inset-0 z-10 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
					aria-hidden="true"
				/>
			)}

			{imageUrl ? (
				<img
					src={imageUrl}
					alt={name}
					className={cn(
						'h-full w-full object-cover transition-transform duration-700 ease-out',
						!isFull && 'group-hover:scale-110',
					)}
				/>
			) : (
				<div className="bg-muted flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">
					<span
						className={cn(
							'text-muted-foreground',
							isFull ? 'text-9xl' : 'text-4xl',
						)}
					>
						🍽️
					</span>
				</div>
			)}
		</div>
	);
};

export default Image;
