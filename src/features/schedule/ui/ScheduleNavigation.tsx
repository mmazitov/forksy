import { LuChevronLeft, LuChevronRight, LuRefreshCw } from 'react-icons/lu';

import { Button, Card, CardContent } from '@/shared/components';

export interface ScheduleNavigationProps {
	todayWeek: string;
	weekDiff: number;
	handlePrevious: () => void;
	handleNext: () => void;
	handleReset: () => void;
}

const ScheduleNavigation = ({
	todayWeek,
	weekDiff,
	handlePrevious,
	handleNext,
	handleReset,
}: ScheduleNavigationProps) => {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<Button
						variant="outline"
						size="icon"
						onClick={handlePrevious}
						className="cursor-pointer"
						aria-label="Попередній тиждень"
					>
						<LuChevronLeft className="h-4 w-4" aria-hidden="true" />
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
										className="text-primary h-auto cursor-pointer p-0"
										onClick={handleReset}
										aria-label="Повернутися до поточного тижня"
									>
										<LuRefreshCw aria-hidden="true" />
									</Button>
								</>
							)}
						</p>
						<p className="text-muted-foreground text-sm">{todayWeek}</p>
					</div>

					<Button
						variant="outline"
						size="icon"
						onClick={handleNext}
						className="cursor-pointer"
						aria-label="Наступний тиждень"
					>
						<LuChevronRight className="h-4 w-4" aria-hidden="true" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default ScheduleNavigation;
