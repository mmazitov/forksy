import { Badge, Card, CardContent } from '@/components';
import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardProductProps {
	id: string;
	name: string;
	category: string;
	image: string;
	calories?: number;
	protein?: number;
	fat?: number;
	carbs?: number;
}

const CardProduct = ({
	id,
	name,
	category,
	image,
	calories,
	protein,
	fat,
	carbs,
}: CardProductProps) => {
	return (
		<Link to={`/products/${id}`}>
			<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
				<div className="overflow-hidden aspect-square bg-muted">
					<img
						src={image}
						alt={name}
						className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<CardContent className="p-4">
					<div className="flex items-start justify-between gap-2 mb-3">
						<h3 className="text-base font-semibold text-foreground">{name}</h3>
						<Badge variant="outline" className="text-xs shrink-0">
							{category}
						</Badge>
					</div>

					<div className="space-y-2">
						<div className="flex items-center gap-1 text-sm">
							<Flame className="w-4 h-4 text-secondary" />
							<span className="text-muted-foreground">
								{calories} ккал/100г
							</span>
						</div>

						<div className="flex gap-3 text-xs text-muted-foreground">
							<span>Б: {protein}г</span>
							<span>Ж: {fat}г</span>
							<span>У: {carbs}г</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default CardProduct;
