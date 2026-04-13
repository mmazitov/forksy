import { LuPlus, LuX } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui';
import { cn, createSlug } from '@/shared/lib/utils';
import { PlanningDish } from '@/shared/types';

interface CardPlaningProps {
	meal: string;
	mealDishes: PlanningDish[];
	mealCalories: number;
	onAddDish?: (meal: string) => void;
	onRemoveDish?: (meal: string, dishId: string) => void;
	isCompact?: boolean;
	sourcePage?: string;
	readOnly?: boolean;
	disableNavigation?: boolean;
}

interface DishItemProps {
	dish: PlanningDish;
	isCompact: boolean;
	disableNavigation: boolean;
	sourcePage?: string;
	readOnly: boolean;
	meal: string;
	onRemove?: (meal: string, dishId: string) => void;
}

interface AddDishButtonProps {
	isCompact: boolean;
	meal: string;
	onAdd?: (meal: string) => void;
}

interface EmptyStateProps {
	isCompact: boolean;
	readOnly: boolean;
	meal: string;
	onAdd?: (meal: string) => void;
}

const DishItem = ({
	dish,
	isCompact,
	disableNavigation,
	sourcePage,
	readOnly,
	meal,
	onRemove,
}: DishItemProps) => {
	const dishContent = (
		<>
			<div className="truncate text-[13px] leading-tight font-medium">
				{dish.name}
			</div>
			{!isCompact && (
				<div className="text-muted-foreground mt-0.5 text-[10px]">
					{dish.calories} ккал
				</div>
			)}
		</>
	);

	return (
		<div className="border-border/40 group/item bg-background/50 hover:border-primary/30 hover:bg-background relative flex items-center justify-between rounded-lg border p-2 transition-all">
			{disableNavigation ? (
				<div className="min-w-0 flex-1">{dishContent}</div>
			) : (
				<Link
					to={`/dish/${createSlug(dish.name)}`}
					state={{ from: sourcePage }}
					className="hover:text-primary min-w-0 flex-1 transition-colors"
				>
					{dishContent}
				</Link>
			)}
			{!readOnly && onRemove && (
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						'h-6 w-6 transition-all',
						isCompact
							? 'scale-75 opacity-0 group-hover/item:scale-100 group-hover/item:opacity-100'
							: 'opacity-0 group-hover/item:opacity-100',
					)}
					onClick={() => onRemove(meal, dish.id)}
				>
					<LuX className="h-3.5 w-3.5" />
				</Button>
			)}
		</div>
	);
};

const AddDishButton = ({ isCompact, meal, onAdd }: AddDishButtonProps) => {
	if (!onAdd) return null;

	if (isCompact) {
		return (
			<button
				onClick={() => onAdd(meal)}
				className="text-muted-foreground/20 hover:text-primary/40 hover:bg-primary/5 flex w-full items-center justify-center rounded-lg border border-dashed py-3 transition-all"
			>
				<LuPlus className="h-4 w-4" />
			</button>
		);
	}

	return (
		<Button
			variant="outline"
			className="group/btn hover:border-primary hover:bg-primary/5 h-auto w-full justify-start gap-2 border-dashed py-8 transition-all active:scale-[0.98]"
			onClick={() => onAdd(meal)}
		>
			<div className="bg-primary/10 group-hover/btn:bg-primary/20 flex h-8 w-8 items-center justify-center rounded-full transition-colors">
				<LuPlus className="text-primary h-5 w-5" />
			</div>
			<span className="font-medium">Додати страву</span>
		</Button>
	);
};

const EmptyState = ({ isCompact, readOnly, meal, onAdd }: EmptyStateProps) => {
	if (!isCompact) return null;

	if (readOnly) {
		return <div className="text-muted-foreground text-sm">Не заплановано</div>;
	}

	return <AddDishButton isCompact meal={meal} onAdd={onAdd} />;
};

const CardPlaning = ({
	meal,
	mealDishes,
	mealCalories,
	onAddDish,
	onRemoveDish,
	isCompact = false,
	sourcePage,
	readOnly = false,
	disableNavigation = false,
}: CardPlaningProps) => {
	return (
		<Card
			className={cn(
				'group focus-within:ring-primary/20 transition-all duration-300 focus-within:ring-2 hover:shadow-lg',
				isCompact ? 'border-border/50 bg-card/40' : 'bg-card',
			)}
		>
			<CardHeader className={cn(isCompact ? 'p-3 pb-1.5' : 'pb-3')}>
				<div className="flex items-center justify-between">
					<CardTitle
						className={cn(
							isCompact
								? 'text-muted-foreground text-[11px] leading-none tracking-wider uppercase'
								: 'text-lg',
						)}
					>
						{meal}
					</CardTitle>
					{isCompact && mealCalories > 0 && (
						<span className="text-primary font-display text-[10px] font-bold">
							{mealCalories}
						</span>
					)}
				</div>
			</CardHeader>
			<CardContent
				className={cn(
					'flex flex-col gap-3',
					isCompact ? 'p-3 pt-0' : 'p-6 pt-0',
				)}
			>
				{!isCompact && !readOnly && (
					<AddDishButton isCompact={false} meal={meal} onAdd={onAddDish} />
				)}

				<div className="space-y-1.5">
					{mealDishes.length > 0 ? (
						mealDishes.map((dish, idx) => (
							<DishItem
								key={`${dish.id}-${idx}`}
								dish={dish}
								isCompact={isCompact}
								disableNavigation={disableNavigation}
								sourcePage={sourcePage}
								readOnly={readOnly}
								meal={meal}
								onRemove={onRemoveDish}
							/>
						))
					) : (
						<EmptyState
							isCompact={isCompact}
							readOnly={readOnly}
							meal={meal}
							onAdd={onAddDish}
						/>
					)}
				</div>

				{!isCompact && mealDishes.length > 0 && (
					<div className="mt-2 flex items-center justify-between border-t border-dashed pt-4">
						<div className="text-muted-foreground text-xs font-medium tracking-tight uppercase">
							{mealDishes.length}{' '}
							{mealDishes.length === 1 ? 'страва' : 'страви'}
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
