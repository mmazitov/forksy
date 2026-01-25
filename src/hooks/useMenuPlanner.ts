import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { CATEGORIES_DISHES } from '@/constants';
import { weekDays } from '@/lib/utils/';
import { dishes } from '@/mock';

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
		(dish: (typeof dishes)[0]) => {
			if (!selectedMeal) return;

			setMenuPlan((prev) => ({
				...prev,
				[selectedDay]: {
					...prev[selectedDay],
					[selectedMeal]: [
						...(prev[selectedDay]?.[selectedMeal] || []),
						{ id: dish.id, name: dish.name, calories: dish.calories },
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

	const handleSave = useCallback(() => {
		toast.success('Меню успішно збережено!');
	}, []);

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
	};
};
