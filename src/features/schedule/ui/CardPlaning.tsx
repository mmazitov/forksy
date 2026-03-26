import { LuPlus, LuX } from 'react-icons/lu';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { PlanningDish } from '@/shared/types';

interface CardPlaningProps {
	meal: string;
	mealDishes: PlanningDish[];
	mealCalories: number;
	onAddDish: (meal: string) => void;
	onRemoveDish: (meal: string, dishId: string) => void;
	isCompact?: boolean;
}

const CardPlaning = ({
	meal,
	mealDishes,
	mealCalories,
	onAddDish,
	onRemoveDish,
	isCompact = false,
}: CardPlaningProps) => {
	return (
		<Card
			className={cn(
				'group transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/20',
				isCompact ? 'border-border/50 bg-card/40' : 'bg-card',
			)}
		>
			<CardHeader className={cn(isCompact ? 'p-3 pb-1.5' : 'pb-3')}>
				<div className="flex items-center justify-between">
					<CardTitle className={cn(isCompact ? 'text-[11px] leading-none uppercase tracking-wider text-muted-foreground' : 'text-lg')}>
						{meal}
					</CardTitle>
					{isCompact && mealCalories > 0 && (
						<span className="text-primary font-display text-[10px] font-bold">
							{mealCalories}
						</span>
					)}
				</div>
			</CardHeader>
			<CardContent className={cn('flex flex-col gap-3', isCompact ? 'p-3 pt-0' : 'p-6 pt-0')}>
				{!isCompact && (
					<Button
						variant="outline"
						className="group/btn hover:border-primary hover:bg-primary/5 h-auto w-full justify-start gap-2 border-dashed py-8 transition-all active:scale-[0.98]"
						onClick={() => onAddDish(meal)}
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover/btn:bg-primary/20">
							<LuPlus className="text-primary h-5 w-5" />
						</div>
						<span className="font-medium">Додати страву</span>
					</Button>
				)}

				{/* Added dishes */}
				<div className="space-y-1.5">
					{mealDishes.map((dish, idx) => (
						<div
							key={`${dish.id}-${idx}`}
							className="border-border/40 group/item relative flex items-center justify-between rounded-lg border bg-background/50 p-2 transition-all hover:border-primary/30 hover:bg-background"
						>
							<div className="min-w-0 flex-1">
								<div className="truncate text-[13px] font-medium leading-tight">
									{dish.name}
								</div>
								{!isCompact && (
									<div className="text-muted-foreground mt-0.5 text-[10px]">
										{dish.calories} ккал
									</div>
								)}
							</div>
							<Button
								variant="ghost"
								size="icon"
								className={cn(
									'h-6 w-6 transition-all',
									isCompact ? 'opacity-0 scale-75 group-hover/item:opacity-100 group-hover/item:scale-100' : 'opacity-0 group-hover/item:opacity-100',
								)}
								onClick={() => onRemoveDish(meal, dish.id)}
							>
								<LuX className="h-3.5 w-3.5" />
							</Button>
						</div>
					))}

					{isCompact && mealDishes.length === 0 && (
						<button
							onClick={() => onAddDish(meal)}
							className="text-muted-foreground/20 hover:text-primary/40 hover:bg-primary/5 flex w-full items-center justify-center rounded-lg border border-dashed py-3 transition-all"
						>
							<LuPlus className="h-4 w-4" />
						</button>
					)}
				</div>

				{/* Summary stats - only in full mode */}
				{!isCompact && mealDishes.length > 0 && (
					<div className="mt-2 flex items-center justify-between border-t border-dashed pt-4">
						<div className="text-muted-foreground text-xs font-medium uppercase tracking-tight">
							{mealDishes.length} {mealDishes.length === 1 ? 'страва' : 'страви'}
						</div>
						<div className="text-primary font-display text-sm font-bold">
							{mealCalories} ккал
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default CardPlaning;
