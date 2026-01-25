import { Clock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
	Badge,
	Card,
	CardContent,
	CardFooter,
	FavoriteButton,
} from '@/components';
import { useFavoriteDish } from '@/hooks/useDish';
import { categoryBadgeMap } from '@/lib/utils/categoryBadge';

interface CardDishCompactProps {
	id: string;
	name: string;
	category: string;
	imageUrl?: string;
	calories?: number;
	prepTime?: number;
	description?: string;
	userId?: string | null;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardDishCompact = ({
	id,
	name,
	category,
	imageUrl,
	calories,
	prepTime,
	description,
	isFavorite: initialIsFavorite = false,
}: CardDishCompactProps) => {
	const { isFavorite, toggleFavorite } = useFavoriteDish(
		id,
		initialIsFavorite || false,
	);

	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';

	const handleFavoriteClick = (e?: React.MouseEvent) => {
		e?.preventDefault();
		e?.stopPropagation();
		toggleFavorite();
	};

	return (
		<Link to={`/dishes/${id}`}>
			<Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
				<div className="bg-muted relative aspect-video overflow-hidden">
					<FavoriteButton
						isFavorite={isFavorite}
						onClick={handleFavoriteClick}
					/>
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
				<CardContent className="p-4">
					<div className="mb-2 flex items-start justify-between gap-2">
						<h3 className="text-foreground line-clamp-1 text-lg font-semibold">
							{name}
						</h3>
						{category && (
							<Badge
								className={`shrink-0 text-xs hover:${badgeClass} ${badgeClass}`}
							>
								{category}
							</Badge>
						)}
					</div>
					{description && (
						<p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
							{description}
						</p>
					)}
				</CardContent>
				<CardFooter className="text-muted-foreground flex gap-4 px-4 pt-0 pb-4 text-sm">
					<div className="flex items-center gap-1">
						<Flame className="text-secondary h-4 w-4" />
						<span>{calories} ккал</span>
					</div>
					<div className="flex items-center gap-1">
						<Clock className="text-primary h-4 w-4" />
						<span>{prepTime} мин</span>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default CardDishCompact;
