import { Button, Card, CardContent } from '@/components';
import { useSchedule } from '@/hooks';
import { LuChevronLeft, LuChevronRight, LuRefreshCw } from 'react-icons/lu';

const ScheduleNavigation = () => {
	const { todayWeek, weekDiff, handlePrevious, handleNext, handleReset } =
		useSchedule();

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<Button
						variant="outline"
						size="icon"
						onClick={handlePrevious}
						className="cursor-pointer"
					>
						<LuChevronLeft className="w-4 h-4" />
					</Button>

					<div className="text-center">
						<p className="flex items-center justify-center gap-2 font-medium">
							{weekDiff === 0 ? (
								'Поточний тиждень'
							) : (
								<>
									Тиждень {weekDiff > 0 ? `+${weekDiff}` : weekDiff}
									<Button
										variant="link"
										className="h-auto p-0 cursor-pointer text-primary"
										onClick={handleReset}
									>
										<LuRefreshCw />
									</Button>
								</>
							)}
						</p>
						<p className="text-sm text-muted-foreground">{todayWeek}</p>
					</div>

					<Button
						variant="outline"
						size="icon"
						onClick={handleNext}
						className="cursor-pointer"
					>
						<LuChevronRight className="w-4 h-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ScheduleNavigation;
