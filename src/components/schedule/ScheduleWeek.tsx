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
						<CardHeader className="bg-muted/50 pb-3">
							<CardTitle className="text-lg">{day}</CardTitle>
						</CardHeader>
						<CardContent className="p-4">
							<div className="grid grid-cols-1 gap-3 md:grid-cols-4">
								{CATEGORIES_DISHES.slice(1, 5).map((item) => {
									const mealData = null;
									return (
										<div
											key={item.id}
											className="border-border hover:border-primary cursor-pointer rounded-lg border p-3 transition-colors"
										>
											<div className="text-muted-foreground mb-1 text-xs">
												{item.name}
											</div>
											{mealData ? (
												<>
													<div className="mb-1 text-sm font-medium">
														{mealData}
													</div>
													<div className="text-muted-foreground text-xs">
														{mealData} ккал
													</div>
												</>
											) : (
												<div className="text-muted-foreground text-sm">
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
