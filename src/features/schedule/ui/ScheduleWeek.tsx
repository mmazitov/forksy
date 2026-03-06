import dayjs from 'dayjs';
import { Loader2 } from 'lucide-react';

import { useGetPlannerItemsQuery } from '@/shared/api/graphql/planner.gen';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components';
import ScheduleNavigation from '@/shared/components/scheduleNavigation/ScheduleNavigation';
import { CATEGORIES_DISHES } from '@/shared/constants/categories';
import { useSchedule } from '@/shared/hooks';
import { weekDays } from '@/shared/lib/utils';

const ScheduleWeek = () => {
	const schedule = useSchedule();
	const { startDate, endDate } = schedule;

	const { data, loading, error } = useGetPlannerItemsQuery({
		variables: { startDate, endDate },
		fetchPolicy: 'cache-and-network',
	});

	// Group planner items by day and mealTime for easy lookup
	const plannerMap = (data?.getPlannerItems || []).reduce(
		(acc, item) => {
			const itemDay = weekDays[dayjs(item.date).isoWeekday() - 1];
			if (!itemDay) return acc;
			if (!acc[itemDay]) acc[itemDay] = {};
			if (!acc[itemDay][item.mealTime]) acc[itemDay][item.mealTime] = [];
			acc[itemDay][item.mealTime].push(item);
			return acc;
		},
		{} as Record<
			string,
			Record<string, NonNullable<typeof data>['getPlannerItems']>
		>,
	);

	if (loading && !data) {
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
				{weekDays.map((day) => (
					<Card key={day} className="overflow-hidden">
						<CardHeader className="bg-muted/50 pb-3">
							<CardTitle className="text-lg">{day}</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<div className="grid grid-cols-1 gap-3 md:grid-cols-4">
								{CATEGORIES_DISHES.slice(1, 5).map((mealCategory) => {
									const mealsList = plannerMap[day]?.[mealCategory.name] || [];
									const hasMeals = mealsList.length > 0;
									const totalCalories = mealsList.reduce(
										(sum, item) => sum + (item.dish.calories || 0),
										0,
									);
									const dishNames = mealsList
										.map((item) => item.dish.name)
										.join(', ');

									return (
										<div
											key={mealCategory.id}
											className="border-border hover:border-primary cursor-pointer rounded-lg border p-3 transition-colors"
										>
											<div className="text-muted-foreground mb-1 text-xs">
												{mealCategory.name}
											</div>
											{hasMeals ? (
												<>
													<div className="mb-1 line-clamp-2 text-sm font-medium">
														{dishNames}
													</div>
													<div className="text-muted-foreground text-xs">
														{totalCalories} ккал
													</div>
												</>
											) : (
												<div className="text-muted-foreground text-sm">
													Не заплановано
												</div>
											)}
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
};

export default ScheduleWeek;
