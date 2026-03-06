import { LuSave } from 'react-icons/lu';

import { CardPlaning, useMenuPlanner } from '@/features/schedule';
import {
	Card,
	CardContent,
	Filter,
	MetaData,
	Modal,
	PageTitle,
	ScheduleNavigation,
} from '@/shared/components';
import DaySummary from '@/shared/components/daySummary/DaySummary';
import { MODAL_TYPES, PAGE_TITLE } from '@/shared/constants';
import { METADATA_CONFIG } from '@/shared/lib/config';

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
		schedule,
	} = useMenuPlanner();

	const dailyStats = getDailyStats();

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={METADATA_CONFIG.titles.menu}
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>

			<PageTitle
				title={PAGE_TITLE.planer.title}
				subtitle={PAGE_TITLE.planer.subtitle}
				onClick={handleSave}
				buttonText={PAGE_TITLE.planer.button}
				buttonIcon={<LuSave />}
			/>

			<div className="mb-6">
				<ScheduleNavigation
					todayWeek={schedule.todayWeek}
					weekDiff={schedule.weekDiff}
					handlePrevious={schedule.handlePrevious}
					handleNext={schedule.handleNext}
					handleReset={schedule.handleReset}
				/>
			</div>

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
