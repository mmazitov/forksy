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
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={name}
					className={cn(
						'h-full w-full object-cover',
						!isFull &&
							'transition-transform duration-300 group-hover:scale-110',
					)}
				/>
			) : (
				<div className="bg-muted flex h-full w-full items-center justify-center">
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
