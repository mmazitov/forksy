import { useCallback, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'sonner';

import { useSaveMenuPlanMutation } from '@/shared/api/graphql';
import {
	useGetPlannerItemsQuery,
	useSavePlannerItemsMutation,
} from '@/shared/api/graphql/planner.gen';
import { CATEGORIES_DISHES } from '@/shared/constants';
import { useSchedule } from '@/shared/hooks/useSchedule';
import {
	formatDayjsToISO,
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

	const [initialPlan, setInitialPlan] = useState<string>('');
	const [hasSavedData, setHasSavedData] = useState<boolean | undefined>(
		undefined,
	);

	const schedule = useSchedule();
	const { startDate, endDate } = schedule;

	const { data: plannerItemsData, loading } = useGetPlannerItemsQuery({
		variables: { startDate, endDate },
		fetchPolicy: 'cache-and-network',
	});

	useEffect(() => {
		if (plannerItemsData?.getPlannerItems) {
			const newPlan: DayMenuType = Object.fromEntries(
				weekDays.map((day) => [
					day,
					Object.fromEntries(MEAL_TIMES.map((meal) => [meal, []])),
				]),
			) as DayMenuType;

			plannerItemsData.getPlannerItems.forEach((item) => {
				const timestamp = Number(item.date);
				const finalDate = isNaN(timestamp) ? item.date : timestamp;
				const itemDay = weekDays[dayjs(finalDate).isoWeekday() - 1];
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
			setInitialPlan(JSON.stringify(newPlan));
			setHasSavedData(plannerItemsData.getPlannerItems.length > 0);
		}
	}, [plannerItemsData, startDate, endDate]);

	const isDirty = useMemo(
		() => initialPlan !== JSON.stringify(menuPlan),
		[initialPlan, menuPlan],
	);

	const [savePlannerMutation] = useSavePlannerItemsMutation({
		refetchQueries: ['GetPlannerItems'],
		awaitRefetchQueries: true,
	});

	const [saveMenuPlanMutation] = useSaveMenuPlanMutation({
		refetchQueries: ['SavedMenus'],
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
		(day: string, meal: string, dishId: string) => {
			setMenuPlan((prev) => ({
				...prev,
				[day]: {
					...prev[day],
					[meal]: prev[day]?.[meal]?.filter((d) => d.id !== dishId) || [],
				},
			}));

			toast.success('Блюдо видалено');
		},
		[],
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

	const weeklyTotalCalories = useMemo(
		() =>
			Object.values(menuPlan).reduce(
				(total, dayMeals) =>
					total +
					Object.values(dayMeals).reduce(
						(dayTotal, dishes) =>
							dayTotal + dishes.reduce((sum, dish) => sum + dish.calories, 0),
						0,
					),
				0,
			),
		[menuPlan],
	);

	const weeklyTotalDishes = useMemo(
		() =>
			Object.values(menuPlan).reduce(
				(total, dayMeals) =>
					total +
					Object.values(dayMeals).reduce(
						(dayTotal, dishes) => dayTotal + dishes.length,
						0,
					),
				0,
			),
		[menuPlan],
	);

	const handleSave = useCallback(async () => {
		const itemsToSave: PlannerItemInput[] = [];

		Object.entries(menuPlan).forEach(([day, meals]) => {
			const dayIndex = weekDays.indexOf(day);
			const date = formatDayjsToISO(dayjs(startDate).add(dayIndex, 'day'));

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

			const weekDiff = dayjs(startDate)
				.startOf('isoWeek')
				.diff(dayjs().startOf('isoWeek'), 'week');
			const weekNumber = weekDiff;
			const menuName =
				weekDiff === 0
					? 'Меню поточного тижня'
					: weekDiff > 0
						? `Меню тижня +${weekDiff}`
						: `Меню тижня ${weekDiff}`;

			await saveMenuPlanMutation({
				variables: {
					name: menuName,
					startDate,
					endDate,
					weekNumber,
				},
			});

			toast.success('Меню успішно збережено!');
		} catch (error) {
			console.error('Save error:', error);
			toast.error('Помилка при збереженні меню');
		}
	}, [menuPlan, savePlannerMutation, saveMenuPlanMutation, startDate, endDate]);

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
		weeklyTotalCalories,
		weeklyTotalDishes,
		handleSave,
		weekDaysForFilter,
		mealTimes: MEAL_TIMES,
		schedule,
		isDirty,
		hasSavedData,
		isLoading: loading,
		plannerItemsData: plannerItemsData?.getPlannerItems || [],
	};
};
