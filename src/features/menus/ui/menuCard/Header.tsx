import dayjs from 'dayjs';

interface HeaderProps {
	startDate: string;
	endDate: string;
	weekNumber: number;
}

const Header = ({ startDate, endDate, weekNumber }: HeaderProps) => {
	const actualEndDate = dayjs(endDate).subtract(1, 'day');

	const formatDate = (dateString: string) => {
		return dayjs(dateString).format('D MMMM');
	};

	const getWeekday = (dateString: string) => {
		return dayjs(dateString).format('dddd');
	};

	const getWeekLabel = (weekNum: number) => {
		if (weekNum === 0) return 'Поточний тиждень';
		if (weekNum > 0) return `Тиждень +${weekNum}`;
		return `Тиждень ${weekNum}`;
	};

	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between">
				<h3 className="text-lg leading-tight font-semibold">
					{getWeekLabel(weekNumber)}
				</h3>
				<span className="text-muted-foreground text-xs">
					{getWeekday(startDate)} - {actualEndDate.format('dddd')}
				</span>
			</div>
			<p className="text-muted-foreground text-sm">
				{formatDate(startDate)} - {actualEndDate.format('D MMMM')}
			</p>
		</div>
	);
};

export default Header;
