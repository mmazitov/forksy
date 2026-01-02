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
import { MODAL_TYPES } from '@/constants';
import { useMenuPlanner } from '@/hooks/useMenuPlanner';
import { METADATA_CONFIG } from '@/lib/config';
import { LuSave } from 'react-icons/lu';

const MenuPlanner = () => {
	const {
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
		mealTimes,
	} = useMenuPlanner();

	const dailyStats = getDailyStats();

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
				onOpenChange={(open) => (open ? null : closeDialog())}
				selectedMeal={selectedMeal}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				onDishSelect={addDishToMenu}
			/>
		</div>
	);
};

export default MenuPlanner;
