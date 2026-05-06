import dayjs, { type Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { LuChevronLeft, LuChevronRight, LuRefreshCw } from 'react-icons/lu';

import { Button } from './button';

dayjs.extend(isoWeek);

interface DateRangePickerProps {
	startDate: string;
	onDateChange: (startDate: string, endDate: string) => void;
}

export const DateRangePicker = ({
	startDate,
	onDateChange,
}: DateRangePickerProps) => {
	const currentStart = dayjs(startDate);

	const handlePreviousWeek = () => {
		const newStart = currentStart.subtract(1, 'week').startOf('isoWeek');
		const newEnd = newStart.add(7, 'day');
		onDateChange(newStart.format('YYYY-MM-DD'), newEnd.format('YYYY-MM-DD'));
	};

	const handleNextWeek = () => {
		const newStart = currentStart.add(1, 'week').startOf('isoWeek');
		const newEnd = newStart.add(7, 'day');
		onDateChange(newStart.format('YYYY-MM-DD'), newEnd.format('YYYY-MM-DD'));
	};

	const handleCurrentWeek = () => {
		const newStart = dayjs().startOf('isoWeek');
		const newEnd = newStart.add(7, 'day');
		onDateChange(newStart.format('YYYY-MM-DD'), newEnd.format('YYYY-MM-DD'));
	};

	const formatWeekRange = (start: Dayjs) => {
		const end = start.add(6, 'day');
		return `${start.format('D MMMM')} - ${end.format('D MMMM YYYY')}`;
	};

	const isCurrentWeek = currentStart.isSame(dayjs().startOf('isoWeek'), 'day');

	return (
		<div className="flex w-full items-center justify-between gap-2">
			<Button
				type="button"
				variant="outline"
				size="icon"
				onClick={handlePreviousWeek}
			>
				<LuChevronLeft className="h-4 w-4" />
			</Button>

			<div className="flex items-center gap-1">
				<span className="text-sm font-medium">
					{formatWeekRange(currentStart)}
				</span>
				{!isCurrentWeek && (
					<Button
						variant="link"
						className="text-primary h-auto cursor-pointer p-0"
						onClick={handleCurrentWeek}
						aria-label="Повернутися до поточного тижня"
					>
						<LuRefreshCw aria-hidden="true" />
					</Button>
				)}
			</div>

			<Button
				type="button"
				variant="outline"
				size="icon"
				onClick={handleNextWeek}
			>
				<LuChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
};
