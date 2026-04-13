import CardPlaning from './CardPlaning';

import { Card, CardContent, DaySummary, Filter } from '@/shared/components';
import { PlanningDish } from '@/shared/types';

interface PlannerDayProps {
	selectedDay: string;
	setSelectedDay: (day: string) => void;
	weekDaysForFilter: { id: string | number; name: string }[];
	mealTimes: string[];
	menuPlan: Record<string, Record<string, PlanningDish[]>>;
	dailyStats: { calories: number; dishes: number };
	openDialog: (meal: string) => void;
	removeDishFromMenu: (day: string, meal: string, dishId: string) => void;
}

const PlannerDay = ({
	selectedDay,
	setSelectedDay,
	weekDaysForFilter,
	mealTimes,
	menuPlan,
	dailyStats,
	openDialog,
	removeDishFromMenu,
}: PlannerDayProps) => {
	return (
		<div className="animate-fade-in space-y-6">
			<Card className="border-border/60 bg-card/50 shadow-sm backdrop-blur-sm">
				<CardContent className="p-4 md:p-6">
					<Filter
						selectedCategory={selectedDay}
						onCategoryChange={setSelectedDay}
						categories={weekDaysForFilter}
						tabListClassName="grid grid-cols-7 w-full gap-1 md:gap-2"
					/>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{mealTimes.map((meal) => {
					const mealDishes = menuPlan[selectedDay]?.[meal] || [];
					const mealCalories = mealDishes.reduce(
						(sum, dish) => sum + dish.calories,
						0,
					);

					return (
						<CardPlaning
							key={meal}
							meal={meal}
							mealDishes={mealDishes}
							mealCalories={mealCalories}
							onAddDish={openDialog}
							onRemoveDish={(m: string, dId: string) =>
								removeDishFromMenu(selectedDay, m, dId)
							}
							disableNavigation
						/>
					);
				})}
			</div>

			<DaySummary
				selectedDay={selectedDay}
				calories={dailyStats.calories}
				dishes={dailyStats.dishes}
			/>
		</div>
	);
};

export default PlannerDay;
