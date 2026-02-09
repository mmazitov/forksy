import { FavoriteButton } from '@/components';
import { useFavoriteProduct } from '@/hooks';

interface CardCompactImageProps {
	id: string;
	name: string;
	imageUrl?: string | null;
	isFavorite?: boolean | null;
}

const CardCompactImage = ({
	id,
	name,
	imageUrl,
	isFavorite: initialIsFavorite = false,
}: CardCompactImageProps) => {
	const { isFavorite, toggleFavorite } = useFavoriteProduct(
		id,
		initialIsFavorite || false,
	);

	const handleFavoriteClick = (e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		toggleFavorite();
	};
	return (
		<div className="bg-muted relative h-44.25 overflow-hidden">
			<FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick} />
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={name}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
				/>
			) : (
				<div className="bg-muted flex h-full w-full items-center justify-center">
					<span className="text-muted-foreground text-4xl">🍽️</span>
				</div>
			)}
		</div>
	);
};

export default CardCompactImage;
