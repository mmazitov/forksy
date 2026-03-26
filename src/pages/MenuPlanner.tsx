import { useState } from 'react';
import { LuCalendarDays, LuLayoutGrid, LuSave } from 'react-icons/lu';

import { CardPlaning, useMenuPlanner } from '@/features/schedule';
import {
	Button,
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
import { cn } from '@/shared/lib/utils';

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

	const [isWeeklyView, setIsWeeklyView] = useState(false);

	const dailyStats = getDailyStats();

	// Calculate weekly total calories
	const weeklyTotalCalories = Object.values(menuPlan).reduce((total, dayMeals) => {
		return (
			total +
			Object.values(dayMeals).reduce((dayTotal, dishes) => {
				return dayTotal + dishes.reduce((dishTotal, dish) => dishTotal + dish.calories, 0);
			}, 0)
		);
	}, 0);

	const weeklyTotalDishes = Object.values(menuPlan).reduce((total, dayMeals) => {
		return total + Object.values(dayMeals).reduce((dayTotal, dishes) => dayTotal + dishes.length, 0);
	}, 0);

	return (
		<div className="container mx-auto max-w-7xl px-4 py-8">
			<MetaData
				title={METADATA_CONFIG.titles.menu}
				description={METADATA_CONFIG.descriptions.menu}
				keywords={METADATA_CONFIG.keywords.menu}
				type="website"
			/>

			<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<PageTitle
					title={PAGE_TITLE.planer.title}
					subtitle={PAGE_TITLE.planer.subtitle}
					onClick={handleSave}
					buttonText={PAGE_TITLE.planer.button}
					buttonIcon={<LuSave />}
				/>

				<div className="bg-muted/50 hidden items-center rounded-xl p-1 lg:flex">
					<button
						onClick={() => setIsWeeklyView(false)}
						className={cn(
							'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
							!isWeeklyView ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
						)}
					>
						<LuCalendarDays className="h-4 w-4" />
						День
					</button>
					<button
						onClick={() => setIsWeeklyView(true)}
						className={cn(
							'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
							isWeeklyView ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
						)}
					>
						<LuLayoutGrid className="h-4 w-4" />
						Тиждень
					</button>
				</div>
			</div>

			<div className="mt-8 mb-6">
				<ScheduleNavigation
					todayWeek={schedule.todayWeek}
					weekDiff={schedule.weekDiff}
					handlePrevious={schedule.handlePrevious}
					handleNext={schedule.handleNext}
					handleReset={schedule.handleReset}
				/>
			</div>

			{/* Views Section */}
			<div className="relative min-h-[400px]">
				{/* Day View */}
				{!isWeeklyView && (
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

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							{mealTimes.map((meal) => {
								const mealDishes = menuPlan[selectedDay]?.[meal] || [];
								const mealCalories = mealDishes.reduce((sum, dish) => sum + dish.calories, 0);

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

						<DaySummary
							selectedDay={selectedDay}
							calories={dailyStats.calories}
							dishes={dailyStats.dishes}
						/>
					</div>
				)}

				{/* Weekly Grid View (Desktop only for now as defined by lg switcher) */}
				{isWeeklyView && (
					<div className="animate-fade-up overflow-x-auto pb-4">
						<div className="inline-grid min-w-[1200px] grid-cols-7 gap-4">
							{weekDaysForFilter.map((day) => {
								const dayKey = day.name;
								const dayMeals = menuPlan[dayKey] || {};
								const dayTotalCalories = Object.values(dayMeals).reduce(
									(sum, dishes) => sum + dishes.reduce((s, d) => s + d.calories, 0),
									0,
								);

								return (
									<div key={dayKey} className="flex flex-col gap-4">
										<div className="flex flex-col items-center border-b border-dashed pb-2">
											<span className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
												{dayKey}
											</span>
											<span className={cn(
												"text-[10px] font-medium px-2 py-0.5 rounded-full mt-1",
												dayTotalCalories > 2500 ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
											)}>
												{dayTotalCalories} ккал
											</span>
										</div>

										<div className="space-y-3">
											{mealTimes.map((meal) => {
												const mealDishes = dayMeals[meal] || [];
												const mealCalories = mealDishes.reduce((sum, dish) => sum + dish.calories, 0);
												return (
													<CardPlaning
														key={`${dayKey}-${meal}`}
														meal={meal}
														mealDishes={mealDishes}
														mealCalories={mealCalories}
														onAddDish={(m) => {
															setSelectedDay(dayKey);
															openDialog(m);
														}}
														onRemoveDish={(m, dId) => {
															setSelectedDay(dayKey);
															removeDishFromMenu(m, dId);
														}}
														isCompact
													/>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>

						<Card className="bg-primary/5 mt-8 border-dashed">
							<CardContent className="flex items-center justify-between p-6">
								<div>
									<h4 className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
										Підсумок тижня
									</h4>
									<p className="font-display text-3xl font-black text-foreground">
										{weeklyTotalCalories} <span className="text-sm font-normal text-muted-foreground">ккал</span>
									</p>
								</div>
								<div className="text-right">
									<p className="text-foreground font-display text-xl font-bold">
										{weeklyTotalDishes} <span className="text-sm font-normal text-muted-foreground">страв заплановано</span>
									</p>
									<p className="text-muted-foreground text-xs italic">
										Баланс вашого раціону на цей тиждень
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</div>

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
