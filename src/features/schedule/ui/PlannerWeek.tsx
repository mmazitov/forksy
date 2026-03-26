import CardPlaning from './CardPlaning';

import { Card, CardContent } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import { PlanningDish } from '@/shared/types';

interface PlannerWeekProps {
	weekDaysForFilter: { id: string | number; name: string }[];
	mealTimes: string[];
	menuPlan: Record<string, Record<string, PlanningDish[]>>;
	setSelectedDay: (day: string) => void;
	openDialog: (meal: string) => void;
	removeDishFromMenu: (meal: string, dishId: string) => void;
	weeklyTotalCalories: number;
	weeklyTotalDishes: number;
}

const PlannerWeek = ({
	weekDaysForFilter,
	mealTimes,
	menuPlan,
	setSelectedDay,
	openDialog,
	removeDishFromMenu,
	weeklyTotalCalories,
	weeklyTotalDishes,
}: PlannerWeekProps) => {
	return (
		<div className="animate-fade-up overflow-x-auto pb-4">
			<div className="inline-grid w-full grid-cols-1 gap-4 lg:grid-cols-7">
				{weekDaysForFilter.map((day) => {
					const dayKey = day.name;
					const dayMeals = menuPlan[dayKey] || {};
					const dayTotalCalories = Object.values(dayMeals).reduce(
						(sum, dishes) => sum + dishes.reduce((s, d) => s + d.calories, 0),
						0,
					);

					return (
						<div key={dayKey} className="flex flex-col gap-4">
							<div className="flex flex-col items-center border-b border-dashed pb-2">
								<span className="font-display text-foreground text-sm font-bold tracking-widest uppercase">
									{dayKey}
								</span>
								<span
									className={cn(
										'mt-1 rounded-full px-2 py-0.5 text-[10px] font-medium',
										dayTotalCalories > 2500
											? 'bg-red-100 text-red-700'
											: 'bg-emerald-100 text-emerald-700',
									)}
								>
									{dayTotalCalories} ккал
								</span>
							</div>

							<div className="space-y-3">
								{mealTimes.map((meal) => {
									const mealDishes = dayMeals[meal] || [];
									const mealCalories = mealDishes.reduce(
										(sum, dish) => sum + dish.calories,
										0,
									);
									return (
										<CardPlaning
											key={`${dayKey}-${meal}`}
											meal={meal}
											mealDishes={mealDishes}
											mealCalories={mealCalories}
											onAddDish={(m: string) => {
												setSelectedDay(dayKey);
												openDialog(m);
											}}
											onRemoveDish={(m: string, dId: string) => {
												setSelectedDay(dayKey);
												removeDishFromMenu(m, dId);
											}}
											isCompact
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>

			<Card className="bg-primary/5 mt-8 border-dashed">
				<CardContent className="flex items-center justify-between p-6">
					<div>
						<h4 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
							Підсумок тижня
						</h4>
						<p className="font-display text-foreground text-3xl font-black">
							{weeklyTotalCalories}{' '}
							<span className="text-muted-foreground text-sm font-normal">
								ккал
							</span>
						</p>
					</div>
					<div className="text-right">
						<p className="text-foreground font-display text-xl font-bold">
							{weeklyTotalDishes}{' '}
							<span className="text-muted-foreground text-sm font-normal">
								страв заплановано
							</span>
						</p>
						<p className="text-muted-foreground text-xs italic">
							Баланс вашого раціону на цей тиждень
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default PlannerWeek;
