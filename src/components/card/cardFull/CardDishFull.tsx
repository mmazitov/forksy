import { LuClock } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Counter,
	FavoriteButton,
	Separator,
} from '@/components';
import { useDeleteDish, useFavoriteDish } from '@/hooks/useDish';
import { categoryBadgeMap } from '@/lib/utils/categoryBadge';
import { Ingredient } from '@/types';

interface CardDishFullProps {
	id: string;
	name: string;
	description?: string | null;
	category?: string | null;
	imageUrl?: string | null;
	prepTime?: number | null;
	servings?: number | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	ingredients: Ingredient[];
	instructions: string[];
	isAdmin?: boolean;
	userId?: string;
	currentUserId?: string;
	isFavorite?: boolean | null;
}

const CardDishFull = ({
	id,
	name,
	description,
	category,
	imageUrl,
	prepTime,
	calories,
	protein,
	fat,
	carbs,
	ingredients,
	instructions,
	isAdmin = false,
	userId,
	currentUserId,
	isFavorite: initialIsFavorite = false,
}: CardDishFullProps) => {
	const canEdit =
		isAdmin || (userId && currentUserId && userId === currentUserId);

	const { isFavorite, toggleFavorite } = useFavoriteDish(
		id,
		initialIsFavorite || false,
	);

	const { handleDelete, loading: deleteLoading } = useDeleteDish(id);

	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';
	return (
		<>
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Main Content */}
				<div className="space-y-6 lg:col-span-2">
					<div className="bg-muted relative h-75 overflow-hidden rounded-2xl lg:h-78.75">
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
					<div className="flex justify-between">
						<Badge className={`mb-3 ${badgeClass}`}>{category}</Badge>
						{canEdit && (
							<div className="flex flex-col gap-2 md:flex-row">
								<Link to={`/dish/edit/${id}`}>
									<Button variant="outline" size="sm">
										Редагувати страву
									</Button>
								</Link>
								<Button
									variant="destructive"
									onClick={handleDelete}
									size="sm"
									disabled={deleteLoading}
								>
									Видалити страву
								</Button>
							</div>
						)}
					</div>
					<div className="grid items-start justify-between">
						<h1 className="text-foreground mb-4 text-4xl font-bold">{name}</h1>
						<div className="flex items-center gap-2">
							<LuClock className="text-primary h-5 w-5" />
							<span>{prepTime} хв</span>
						</div>
						<p className="text-muted-foreground col-span-2 text-lg">
							{description}
						</p>
					</div>

					<Separator />

					{/* Ingredients */}
					<Card>
						<CardHeader>
							<CardTitle>Інгредієнти</CardTitle>
						</CardHeader>
						<CardContent>
							<ol className="space-y-4">
								{ingredients.map((ingredient, index) => (
									<li key={index} className="flex items-center gap-4">
										<Counter index={index} />
										<p className="text-foreground flex flex-1 items-center justify-between">
											{ingredient.name}
											<span className="text-muted-foreground font-medium">
												{ingredient.amount}
											</span>
										</p>
									</li>
								))}
							</ol>
						</CardContent>
					</Card>

					{/* Instructions */}
					<Card>
						<CardHeader>
							<CardTitle>Приготування</CardTitle>
						</CardHeader>
						<CardContent>
							<ol className="space-y-4">
								{instructions.map((step, index) => (
									<li key={index} className="flex gap-4">
										<Counter index={index} />
										<p className="text-muted-foreground pt-1">{step}</p>
									</li>
								))}
							</ol>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Поживна цінність</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="bg-muted rounded-lg p-4 text-center">
								<div className="text-primary text-3xl font-bold">
									{calories}
								</div>
								<div className="text-muted-foreground text-sm">Калорії</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Білки</span>
									<span className="text-secondary font-medium">{protein}г</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Жири</span>
									<span className="text-accent font-medium">{fat}г</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Вуглеводи</span>
									<span className="text-primary font-medium">{carbs}г</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Button className="w-full" size="lg">
						Додати до плану харчування
					</Button>
				</div>
			</div>
		</>
	);
};

export default CardDishFull;
