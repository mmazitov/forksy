import { LuFlame } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	FavoriteButton,
	NutritionCard,
} from '@/components';
import { useFavoriteProduct } from '@/hooks';
import { useDeleteProduct } from '@/hooks/';
import { categoryBadgeMap } from '@/lib/utils/categoryBadge';

interface CardProductFullProps {
	id: string;
	name: string;
	description?: string | null;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	isAdmin?: boolean;
	userId?: string | null;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardProductFull = ({
	id,
	name,
	description,
	category,
	imageUrl,
	calories,
	protein,
	fat,
	carbs,
	isAdmin = false,
	userId,
	currentUserId,
	isFavorite: initialIsFavorite = false,
}: CardProductFullProps) => {
	const canEdit =
		isAdmin || (userId && currentUserId && userId === currentUserId);

	const { isFavorite, toggleFavorite } = useFavoriteProduct(
		id,
		initialIsFavorite || false,
	);

	const { handleDelete, loading: deleteLoading } = useDeleteProduct(id);

	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';

	return (
		<div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
			{/* Image */}
			<div className="bg-muted relative h-75 overflow-hidden rounded-2xl lg:h-full">
				<FavoriteButton isFavorite={isFavorite} onClick={toggleFavorite} />
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="bg-muted flex h-full w-full items-center justify-center">
						<span className="text-9xl">🍽️</span>
					</div>
				)}
			</div>

			{/* Info */}
			<div className="space-y-6">
				<div>
					{canEdit && (
						<div className="absolute top-2 left-2 z-10 flex flex-col gap-2 md:flex-row lg:top-0 lg:right-0 lg:left-auto">
							<Link to={`/product/edit/${id}`}>
								<Button variant="outline" size="sm">
									Редагувати продукт
								</Button>
							</Link>
							<Button
								variant="destructive"
								onClick={handleDelete}
								size="sm"
								disabled={deleteLoading}
							>
								Видалити продукт
							</Button>
						</div>
					)}
					{category && (
						<Badge className={`mb-3 ${badgeClass}`}>{category}</Badge>
					)}
					<h1 className="text-foreground mb-4 text-4xl font-bold">{name}</h1>
					{description && (
						<p className="text-muted-foreground text-lg">{description}</p>
					)}
				</div>

				{/* Nutrition Facts */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<LuFlame className="text-secondary h-5 w-5" />
							Поживна цінність (на 100г)
						</CardTitle>
					</CardHeader>
					<CardContent>
						<NutritionCard
							calories={calories}
							protein={protein}
							fat={fat}
							carbs={carbs}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default CardProductFull;
