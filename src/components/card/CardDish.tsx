import { Clock, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge, Card, CardContent, CardFooter } from '@/components';

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
			<Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
				<div className="bg-muted aspect-video overflow-hidden">
					<img
						src={image}
						alt={name}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<CardContent className="p-4">
					<div className="mb-2 flex items-start justify-between gap-2">
						<h3 className="text-foreground line-clamp-1 text-lg font-semibold">
							{name}
						</h3>
						<Badge variant="secondary" className="shrink-0">
							{category}
						</Badge>
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
						<span>{cookTime} мин</span>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default CardDish;
