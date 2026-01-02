import { Link } from 'react-router-dom';

import { Badge, Card, CardContent, NutritionCompact } from '@/components';
import { categoryBadgeMap } from '@/lib/utils/categoryBadge';

interface CardProductCompactProps {
	id: string;
	name: string;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
}

const CardProductCompact = ({
	id,
	name,
	category,
	imageUrl,
	calories,
	protein,
	fat,
	carbs,
}: CardProductCompactProps) => {
	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';
	return (
		<Link to={`/products/${id}`}>
			<Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
				<div className="bg-muted h-44.25 overflow-hidden">
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
					<div className="mb-3 flex items-start justify-between gap-2">
						<h3 className="text-foreground text-base font-semibold">{name}</h3>
						{category && (
							<Badge
								className={`shrink-0 text-xs hover:${badgeClass} ${badgeClass}`}
							>
								{category}
							</Badge>
						)}
					</div>

					<NutritionCompact
						calories={calories}
						protein={protein}
						fat={fat}
						carbs={carbs}
					/>
				</CardContent>
			</Card>
		</Link>
	);
};

export default CardProductCompact;
