import dayjs from 'dayjs';
import 'dayjs/locale/uk';

interface HeaderProps {
	startDate: string;
	endDate: string;
	weekNumber: number;
}

const Header = ({ startDate, endDate, weekNumber }: HeaderProps) => {
	dayjs.locale('uk');

	const formatDate = (dateString: string) => {
		return dayjs(dateString).format('D MMMM');
	};

	const getWeekday = (dateString: string) => {
		return dayjs(dateString).format('dddd');
	};

	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between">
				<h3 className="text-lg leading-tight font-semibold">
					Тиждень {weekNumber}
				</h3>
				<span className="text-muted-foreground text-xs">
					{getWeekday(startDate)} - {getWeekday(endDate)}
				</span>
			</div>
			<p className="text-muted-foreground text-sm">
				{formatDate(startDate)} - {formatDate(endDate)}
			</p>
		</div>
	);
};

export default Header;
