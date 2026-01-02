import { LuPlus, LuX } from 'react-icons/lu';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui';

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
					className="hover:border-primary hover:bg-primary/5 h-auto w-full justify-start gap-2 border-dashed py-8"
					onClick={() => onAddDish(meal)}
				>
					<LuPlus className="h-5 w-5" />
					<span>Додати блюдо</span>
				</Button>

				{/* Added dishes */}
				<div className="space-y-2">
					{mealDishes.map((dish) => (
						<div
							key={dish.id}
							className="border-border group flex items-center justify-between rounded-lg border p-2"
						>
							<div className="min-w-0 flex-1">
								<div className="truncate text-sm font-medium">{dish.name}</div>
								<div className="text-muted-foreground text-xs">
									{dish.calories} ккал
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
								onClick={() => onRemoveDish(meal, dish.id)}
							>
								<LuX className="h-4 w-4" />
							</Button>
						</div>
					))}
				</div>

				{/* Summary stats */}
				<div className="space-y-1 border-t pt-2">
					<div className="text-muted-foreground text-sm">
						Блюд: {mealDishes.length}
					</div>
					<div className="text-foreground text-sm font-medium">
						Всього: {mealCalories} ккал
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CardPlaning;
