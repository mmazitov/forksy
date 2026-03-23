import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
	useGetPlannerItemsQuery,
	useSavePlannerItemsMutation,
} from '@/shared/api/graphql/planner.gen';
import { CATEGORIES_DISHES } from '@/shared/constants';
import { useSchedule } from '@/shared/hooks/useSchedule';
import {
	mealTimeToUI,
	UI_NAME_TO_MEAL_TIME,
	weekDays,
} from '@/shared/lib/utils/';
import { Dish, PlannerItemInput } from '@/shared/types/api';

export interface DayMenuType {
	[day: string]: {
		[mealTime: string]: Array<{
			plannerItemId: string | null;
			id: string; // Dish ID
			name: string;
			calories: number;
		}>;
	};
}

const MEAL_TIMES = CATEGORIES_DISHES.slice(1, 5).map((cat) => cat.name);

export const useMenuPlanner = () => {
	const [selectedDay, setSelectedDay] = useState('пн');
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [menuPlan, setMenuPlan] = useState<DayMenuType>(
		Object.fromEntries(
			weekDays.map((day) => [
				day,
				Object.fromEntries(MEAL_TIMES.map((meal) => [meal, []])),
			]),
		),
	);

	const schedule = useSchedule();
	const { startDate, endDate } = schedule;

	const { data: plannerData } = useGetPlannerItemsQuery({
		variables: { startDate, endDate },
		fetchPolicy: 'cache-and-network',
	});

	useEffect(() => {
		if (plannerData?.getPlannerItems) {
			const newPlan: DayMenuType = Object.fromEntries(
				weekDays.map((day) => [
					day,
					Object.fromEntries(MEAL_TIMES.map((meal) => [meal, []])),
				]),
			) as DayMenuType;
			plannerData.getPlannerItems.forEach((item) => {
				const timestamp = Number(item.date);
				const itemDay = weekDays[dayjs(timestamp).isoWeekday() - 1];
				const uiMealTime = mealTimeToUI(item.mealTime);
				if (itemDay && newPlan[itemDay] && newPlan[itemDay][uiMealTime]) {
					newPlan[itemDay][uiMealTime].push({
						plannerItemId: item.id,
						id: item.dish.id,
						name: item.dish.name,
						calories: item.dish.calories || 0,
					});
				}
			});
			setMenuPlan(newPlan);
		}
	}, [plannerData, startDate, endDate]);

	const [savePlannerMutation] = useSavePlannerItemsMutation({
		refetchQueries: ['GetPlannerItems'],
		awaitRefetchQueries: true,
	});

	const openDialog = useCallback((meal: string) => {
		setSelectedMeal(meal);
		setIsDialogOpen(true);
		setSearchQuery('');
	}, []);

	const closeDialog = useCallback(() => {
		setIsDialogOpen(false);
		setSelectedMeal(null);
		setSearchQuery('');
	}, []);

	const addDishToMenu = useCallback(
		(dish: Pick<Dish, 'id' | 'name' | 'calories'>) => {
			if (!selectedMeal) return;

			setMenuPlan((prev) => ({
				...prev,
				[selectedDay]: {
					...prev[selectedDay],
					[selectedMeal]: [
						...(prev[selectedDay]?.[selectedMeal] || []),
						{
							plannerItemId: null,
							id: dish.id,
							name: dish.name,
							calories: dish.calories || 0,
						},
					],
				},
			}));

			toast.success(`${dish.name} додано до ${selectedMeal}`);
			closeDialog();
		},
		[selectedDay, selectedMeal, closeDialog],
	);

	const removeDishFromMenu = useCallback(
		(meal: string, dishId: string) => {
			setMenuPlan((prev) => ({
				...prev,
				[selectedDay]: {
					...prev[selectedDay],
					[meal]:
						prev[selectedDay]?.[meal]?.filter((d) => d.id !== dishId) || [],
				},
			}));

			toast.success('Блюдо видалено');
		},
		[selectedDay],
	);

	const getDailyStats = useCallback(() => {
		const dayMeals = menuPlan[selectedDay] || {};
		const allDishes = Object.values(dayMeals).flat();
		const totalCalories = allDishes.reduce(
			(sum, dish) => sum + dish.calories,
			0,
		);

		return {
			dishes: allDishes.length,
			calories: totalCalories,
		};
	}, [menuPlan, selectedDay]);

	const handleSave = useCallback(async () => {
		const itemsToSave: PlannerItemInput[] = [];

		Object.entries(menuPlan).forEach(([day, meals]) => {
			const dayIndex = weekDays.indexOf(day);
			const date = dayjs(startDate).add(dayIndex, 'day').format('YYYY-MM-DD');

			Object.entries(meals).forEach(([mealTime, dishes]) => {
				const enumMealTime = UI_NAME_TO_MEAL_TIME[mealTime];
				dishes.forEach((dish) => {
					itemsToSave.push({
						id: dish.plannerItemId,
						date,
						mealTime: enumMealTime,
						dishId: dish.id,
					});
				});
			});
		});

		try {
			await savePlannerMutation({
				variables: { items: itemsToSave, startDate, endDate },
			});
			toast.success('Меню успішно збережено!');
		} catch {
			toast.error('Помилка при збереженні меню');
		}
	}, [menuPlan, savePlannerMutation, startDate, endDate]);

	const weekDaysForFilter = weekDays.map((day, index) => ({
		id: index,
		name: day,
	}));

	return {
		selectedDay,
		setSelectedDay,
		isDialogOpen,
		openDialog,
		closeDialog,
		selectedMeal,
		searchQuery,
		setSearchQuery,
		menuPlan,
		addDishToMenu,
		removeDishFromMenu,
		getDailyStats,
		handleSave,
		weekDaysForFilter,
		mealTimes: MEAL_TIMES,
		schedule,
	};
};
