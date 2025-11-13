import {
	Card,
	CardContent,
	Filter,
	MetaData,
	Modal,
	PageTitle,
} from '@/components';
import { CardPlaning } from '@/components/card';
import DaySummary from '@/components/daySummary/DaySummary';
import { CATEGORIES_DISHES, MODAL_TYPES } from '@/constants';
import { METADATA_CONFIG } from '@/lib/config';
import { weekDays } from '@/lib/utils/';
import { dishes } from '@/mock';
import { useState } from 'react';
import { LuSave } from 'react-icons/lu';
import { toast } from 'sonner';

interface DayMenuType {
	[day: string]: {
		[mealTime: string]: Array<{ id: string; name: string; calories: number }>;
	};
}

const MEAL_TIMES = CATEGORIES_DISHES.slice(1, 5).map((cat) => cat.name);

const MenuPlanner = () => {
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

	const weekDaysForFilter = weekDays.map((day, index) => ({
		id: index,
		name: day,
	}));

	// Open dialog to select a dish
	const openDialog = (meal: string) => {
		setSelectedMeal(meal);
		setIsDialogOpen(true);
		setSearchQuery('');
	};

	// Add dish to menu
	const addDishToMenu = (dish: (typeof dishes)[0]) => {
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
		setIsDialogOpen(false);
		setSelectedMeal(null);
	};

	// Remove dish from menu
	const removeDishFromMenu = (meal: string, dishId: string) => {
		setMenuPlan((prev) => ({
			...prev,
			[selectedDay]: {
				...prev[selectedDay],
				[meal]: prev[selectedDay]?.[meal]?.filter((d) => d.id !== dishId) || [],
			},
		}));

		toast.success('Блюдо видалено');
	};

	// Get daily statistics
	const getDailyStats = () => {
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
	};

	const dailyStats = getDailyStats();

	const handleSave = () => {
		toast.success('Меню успішно збережено!');
		// TODO: Тут можна додати логіку для збереження на сервер
	};

	return (
		<div className="container px-4 py-8 mx-auto">
			<MetaData
				title="Планувальник меню"
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>

			<PageTitle
				title="Планування меню"
				subtitle="Складіть ідеальне меню на тиждень"
				onClick={handleSave}
				buttonText="Зберегти меню"
				buttonIcon={<LuSave />}
			/>

			{/* Day Selector */}
			<Card className="mb-6">
				<CardContent className="p-6">
					<Filter
						selectedCategory={selectedDay}
						onCategoryChange={setSelectedDay}
						categories={weekDaysForFilter}
						tabListClassName="grid w-full grid-cols-7"
					/>
				</CardContent>
			</Card>

			{/* Meal Planning Cards */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{MEAL_TIMES.map((meal) => {
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
							onRemoveDish={removeDishFromMenu}
						/>
					);
				})}
			</div>

			{/* Daily Summary */}
			<DaySummary
				selectedDay={selectedDay}
				calories={dailyStats.calories}
				dishes={dailyStats.dishes}
			/>

			{/* Add Dish Modal */}
			<Modal
				modalType={MODAL_TYPES.ADD_DISH_MODAL}
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				selectedMeal={selectedMeal}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				onDishSelect={addDishToMenu}
			/>
		</div>
	);
};

export default MenuPlanner;
