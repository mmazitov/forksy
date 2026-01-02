import { Badge, Card, CardContent } from '@/components';
import { categoryBadgeMap } from '@/lib/utils/categoryBadge';
import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardProductProps {
	id: string;
	name: string;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
}

const CardProduct = ({
	id,
	name,
	category,
	imageUrl,
	calories,
	protein,
	fat,
	carbs,
}: CardProductProps) => {
	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';
	return (
		<Link to={`/products/${id}`}>
			<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
				<div className="overflow-hidden h-44.25 bg-muted">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={name}
							className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
						/>
					) : (
						<div className="flex items-center justify-center w-full h-full bg-muted">
							<span className="text-4xl text-muted-foreground">🍽️</span>
						</div>
					)}
				</div>
				<CardContent className="p-4">
					<div className="flex items-start justify-between gap-2 mb-3">
						<h3 className="text-base font-semibold text-foreground">{name}</h3>
						{category && (
							<Badge
								className={`text-xs shrink-0 hover:${badgeClass} ${badgeClass}`}
							>
								{category}
							</Badge>
						)}
					</div>

					<div className="space-y-2">
						{calories !== null && calories !== undefined && (
							<div className="flex items-center gap-1 text-sm">
								<Flame className="w-4 h-4 text-secondary" />
								<span className="text-muted-foreground">
									{calories} ккал/100г
								</span>
							</div>
						)}

						{(protein !== null || fat !== null || carbs !== null) && (
							<div className="flex gap-3 text-xs justify-between text-muted-foreground">
								{protein !== null && <span>Білки: {protein}г</span>}
								{fat !== null && <span>Жири: {fat}г</span>}
								{carbs !== null && <span>Вуглеводи: {carbs}г</span>}
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default CardProduct;
