import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { LuPlus, LuX } from 'react-icons/lu';

interface Dish {
	id: string;
	name: string;
	calories: number;
}

interface CardPlaningProps {
	meal: string;
	mealDishes: Dish[];
	mealCalories: number;
	onAddDish: (meal: string) => void;
	onRemoveDish: (meal: string, dishId: string) => void;
}

const CardPlaning = ({
	meal,
	mealDishes,
	mealCalories,
	onAddDish,
	onRemoveDish,
}: CardPlaningProps) => {
	return (
		<Card className="transition-shadow hover:shadow-md">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">{meal}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Button
					variant="outline"
					className="justify-start w-full h-auto gap-2 py-8 border-dashed hover:border-primary hover:bg-primary/5"
					onClick={() => onAddDish(meal)}
				>
					<LuPlus className="w-5 h-5" />
					<span>Додати блюдо</span>
				</Button>

				{/* Added dishes */}
				<div className="space-y-2">
					{mealDishes.map((dish) => (
						<div
							key={dish.id}
							className="flex items-center justify-between p-2 rounded-lg border border-border group"
						>
							<div className="flex-1 min-w-0">
								<div className="text-sm font-medium truncate">{dish.name}</div>
								<div className="text-xs text-muted-foreground">
									{dish.calories} ккал
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => onRemoveDish(meal, dish.id)}
							>
								<LuX className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>

				{/* Summary stats */}
				<div className="space-y-1 pt-2 border-t">
					<div className="text-sm text-muted-foreground">
						Блюд: {mealDishes.length}
					</div>
					<div className="text-sm font-medium text-foreground">
						Всього: {mealCalories} ккал
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CardPlaning;
