import dayjs from 'dayjs';
import { useMemo } from 'react';

import { useGetPlannerItemsQuery } from '@/shared/api/graphql/planner.gen';
import { CATEGORIES_DISHES } from '@/shared/constants/categories';
import { useSchedule } from '@/shared/hooks';
import { uiToMealTime, weekDays } from '@/shared/lib/utils';
import { PlanningDish } from '@/shared/types';

export const useScheduleWeek = () => {
	const schedule = useSchedule();
	const { startDate, endDate } = schedule;

	const { data, loading, error } = useGetPlannerItemsQuery({
		variables: { startDate, endDate },
		fetchPolicy: 'cache-and-network',
	});

	const todayDayIndex = dayjs().isoWeekday() - 1;
	const currentWeekStart = dayjs().startOf('isoWeek');
	const scheduleWeekStart = dayjs(startDate);
	const isCurrentWeek = currentWeekStart.isSame(scheduleWeekStart, 'week');

	const menuPlan = useMemo(() => {
		return (data?.getPlannerItems || []).reduce(
			(acc, item) => {
				const timestamp = Number(item.date);
				const itemDay = weekDays[dayjs(timestamp).isoWeekday() - 1];
				if (!itemDay) return acc;
				if (!acc[itemDay]) acc[itemDay] = {};

				const mealTimeUI =
					CATEGORIES_DISHES.find(
						(cat) => uiToMealTime(cat.name) === item.mealTime,
					)?.name || item.mealTime;

				if (!acc[itemDay][mealTimeUI]) acc[itemDay][mealTimeUI] = [];

				const planningDish: PlanningDish = {
					id: item.dish.id,
					name: item.dish.name,
					calories: item.dish.calories || 0,
				};

				acc[itemDay][mealTimeUI].push(planningDish);
				return acc;
			},
			{} as Record<string, Record<string, PlanningDish[]>>,
		);
	}, [data?.getPlannerItems]);

	return {
		schedule,
		menuPlan,
		loading,
		error,
		todayDayIndex,
		isCurrentWeek,
	};
};
