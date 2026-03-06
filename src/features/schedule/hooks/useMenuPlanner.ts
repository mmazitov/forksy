import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
	useGetPlannerItemsQuery,
	useSavePlannerItemsMutation,
} from '@/shared/api/graphql/planner.gen';
import { CATEGORIES_DISHES } from '@/shared/constants';
import { useSchedule } from '@/shared/hooks/useSchedule';
import { weekDays } from '@/shared/lib/utils/';
import { Dish, PlannerItemInput } from '@/shared/types/api';

export interface DayMenuType {
	[day: string]: {
		[mealTime: string]: Array<{ id: string; name: string; calories: number }>;
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
	const { weekStart } = schedule;

	const { data: plannerData } = useGetPlannerItemsQuery({
		variables: { weekStart },
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
				if (newPlan[item.day] && newPlan[item.day][item.mealTime]) {
					newPlan[item.day][item.mealTime].push({
						id: item.dish.id,
						name: item.dish.name,
						calories: item.dish.calories || 0,
					});
				}
			});
			setMenuPlan(newPlan);
		}
	}, [plannerData]);

	const [savePlannerMutation] = useSavePlannerItemsMutation();

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
						{ id: dish.id, name: dish.name, calories: dish.calories || 0 },
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
			Object.entries(meals).forEach(([mealTime, dishes]) => {
				dishes.forEach((dish) => {
					itemsToSave.push({
						day,
						mealTime,
						dishId: dish.id,
						weekStart,
					});
				});
			});
		});

		try {
			await savePlannerMutation({
				variables: { items: itemsToSave, weekStart },
			});
			toast.success('Меню успішно збережено!');
		} catch {
			toast.error('Помилка при збереженні меню');
		}
	}, [menuPlan, savePlannerMutation, weekStart]);

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
