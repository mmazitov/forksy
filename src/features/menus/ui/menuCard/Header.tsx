import dayjs from 'dayjs';

import { getWeekLabel } from '@/shared/lib/utils';

interface HeaderProps {
	startDate: string;
	endDate: string;
}

const Header = ({ startDate, endDate }: HeaderProps) => {
	const actualEndDate = dayjs(endDate).subtract(1, 'day');

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
					{getWeekLabel(startDate)}
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
