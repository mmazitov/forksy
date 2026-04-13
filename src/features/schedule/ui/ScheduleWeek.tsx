import { Loader2 } from 'lucide-react';

import CardPlaning from './CardPlaning';
import ScheduleNavigation from './ScheduleNavigation';
import { useScheduleWeek } from '../hooks/useScheduleWeek';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components';
import { CATEGORIES_DISHES } from '@/shared/constants/categories';
import { cn, weekDays } from '@/shared/lib/utils';

const ScheduleWeek = () => {
	const { schedule, menuPlan, loading, error, todayDayIndex, isCurrentWeek } =
		useScheduleWeek();

	if (loading) {
		return (
			<div className="flex justify-center p-8">
				<Loader2 className="text-primary h-8 w-8 animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-destructive p-4 text-center">
				Помилка завантаження розкладу.
			</div>
		);
	}

	return (
		<>
			<ScheduleNavigation
				todayWeek={schedule.todayWeek}
				weekDiff={schedule.weekDiff}
				handlePrevious={schedule.handlePrevious}
				handleNext={schedule.handleNext}
				handleReset={schedule.handleReset}
			/>
			<div className="grid gap-2">
				{weekDays.map((day, index) => {
					const isToday = isCurrentWeek && index === todayDayIndex;
					const dayMeals = menuPlan[day] || {};
					const dayTotalCalories = Object.values(dayMeals).reduce(
						(sum, dishes) => sum + dishes.reduce((s, d) => s + d.calories, 0),
						0,
					);

					return (
						<Card
							key={day}
							className={cn(
								'overflow-hidden',
								isToday && 'border-primary border-2',
							)}
						>
							<CardHeader className="bg-muted/50 pb-3">
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg">{day}</CardTitle>
									{dayTotalCalories > 0 && (
										<span
											className={cn(
												'rounded-full px-2 py-0.5 text-xs font-medium',
												dayTotalCalories > 2500
													? 'bg-red-100 text-red-700'
													: 'bg-emerald-100 text-emerald-700',
											)}
										>
											{dayTotalCalories} ккал
										</span>
									)}
								</div>
							</CardHeader>
							<CardContent className="p-4">
								<div className="grid grid-cols-1 gap-3 md:grid-cols-4">
									{CATEGORIES_DISHES.slice(1, 5).map((mealCategory) => {
										const mealDishes = dayMeals[mealCategory.name] || [];
										const mealCalories = mealDishes.reduce(
											(sum, dish) => sum + dish.calories,
											0,
										);

										return (
											<CardPlaning
												key={mealCategory.id}
												meal={mealCategory.name}
												mealDishes={mealDishes}
												mealCalories={mealCalories}
												isCompact
												sourcePage="/schedule"
												readOnly
											/>
										);
									})}
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</>
	);
};

export default ScheduleWeek;
