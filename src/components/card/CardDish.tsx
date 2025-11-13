import { Badge, Card, CardContent, CardFooter } from '@/components';
import { Clock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardDishProps {
	id: string;
	name: string;
	category: string;
	image: string;
	calories?: number;
	cookTime?: number;
	description?: string;
}

const CardDish = ({
	id,
	name,
	category,
	image,
	calories,
	cookTime,
	description,
}: CardDishProps) => {
	return (
		<Link to={`/dishes/${id}`}>
			<Card className="group overflow-hidden transition-all duration-300 h-full hover:shadow-lg hover:scale-[1.02] cursor-pointer">
				<div className="overflow-hidden aspect-video bg-muted">
					<img
						src={image}
						alt={name}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<CardContent className="p-4">
					<div className="flex items-start justify-between gap-2 mb-2">
						<h3 className="text-lg font-semibold text-foreground line-clamp-1">
							{name}
						</h3>
						<Badge variant="secondary" className="shrink-0">
							{category}
						</Badge>
					</div>
					{description && (
						<p className="mb-3 text-sm text-muted-foreground line-clamp-2">
							{description}
						</p>
					)}
				</CardContent>
				<CardFooter className="flex gap-4 px-4 pt-0 pb-4 text-sm text-muted-foreground">
					<div className="flex items-center gap-1">
						<Flame className="w-4 h-4 text-secondary" />
						<span>{calories} ккал</span>
					</div>
					<div className="flex items-center gap-1">
						<Clock className="w-4 h-4 text-primary" />
						<span>{cookTime} мин</span>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default CardDish;
