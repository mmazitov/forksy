import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	ScheduleNavigation,
} from '@/components';
import { CATEGORIES_DISHES } from '@/constants/categories';
import { weekDays } from '@/lib/utils';

const ScheduleWeek = () => {
	return (
		<>
			<ScheduleNavigation />
			<div className="grid gap-4">
				{weekDays.map((day) => (
					<Card key={day} className="overflow-hidden">
						<CardHeader className="pb-3 bg-muted/50">
							<CardTitle className="text-lg">{day}</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<div className="grid grid-cols-1 gap-3 md:grid-cols-4">
								{CATEGORIES_DISHES.slice(1, 5).map((item) => {
									const mealData = null; // Replace with actual data fetching logic
									return (
										<div
											key={item.id}
											className="p-3 transition-colors border rounded-lg cursor-pointer border-border hover:border-primary"
										>
											<div className="mb-1 text-xs text-muted-foreground">
												{item.name}
											</div>
											{mealData ? (
												<>
													<div className="mb-1 text-sm font-medium">
														{mealData}
													</div>
													<div className="text-xs text-muted-foreground">
														{mealData} ккал
													</div>
												</>
											) : (
												<div className="text-sm text-muted-foreground">
													Не заплановано
												</div>
											)}
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</>
	);
};

export default ScheduleWeek;
