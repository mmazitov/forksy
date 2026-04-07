import { BsCalendar2Day, BsCalendar2Week } from 'react-icons/bs';
import { LuList, LuSave } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import {
	PlannerDay,
	PlannerWeek,
	ScheduleNavigation,
	useMenuPlanner,
} from '@/features/schedule';
import {
	MetaData,
	Modal,
	PageTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
import { MODAL_TYPES, PAGE_TITLE } from '@/shared/constants';
import { METADATA_CONFIG } from '@/shared/lib/config';

const MenuPlanner = () => {
	const navigate = useNavigate();

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
		weeklyTotalCalories,
		weeklyTotalDishes,
		handleSave,
		weekDaysForFilter,
		mealTimes,
		schedule,
		isDirty,
		hasSavedData,
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
				buttonDisable={!isDirty}
				secondaryButtonVisible={true}
				secondaryButtonText="Список продуктів"
				secondaryButtonIcon={<LuList />}
				secondaryButtonDisable={isDirty || !hasSavedData}
				secondaryButtonOnClick={() =>
					navigate(`/shopping-list?week=${schedule.weekDiff}`)
				}
			/>
			<Tabs defaultValue="day" className="space-y-6">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="day" className="flex gap-1">
						<BsCalendar2Day className="h-4 w-4" />
						День
					</TabsTrigger>
					<TabsTrigger value="week" className="flex gap-1">
						<BsCalendar2Week className="h-4 w-4" />
						Тиждень
					</TabsTrigger>
				</TabsList>

				<div className="mt-8 mb-6">
					<ScheduleNavigation
						todayWeek={schedule.todayWeek}
						weekDiff={schedule.weekDiff}
						handlePrevious={schedule.handlePrevious}
						handleNext={schedule.handleNext}
						handleReset={schedule.handleReset}
					/>
				</div>

				<TabsContent value="day" className="space-y-6">
					<PlannerDay
						selectedDay={selectedDay}
						setSelectedDay={setSelectedDay}
						weekDaysForFilter={weekDaysForFilter}
						mealTimes={mealTimes}
						menuPlan={menuPlan}
						dailyStats={dailyStats}
						openDialog={openDialog}
						removeDishFromMenu={removeDishFromMenu}
					/>
				</TabsContent>

				<TabsContent value="week" className="space-y-6">
					<PlannerWeek
						weekDaysForFilter={weekDaysForFilter}
						mealTimes={mealTimes}
						menuPlan={menuPlan}
						setSelectedDay={setSelectedDay}
						openDialog={openDialog}
						removeDishFromMenu={removeDishFromMenu}
						weeklyTotalCalories={weeklyTotalCalories}
						weeklyTotalDishes={weeklyTotalDishes}
					/>
				</TabsContent>
			</Tabs>

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
