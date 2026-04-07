import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

dayjs.extend(isoWeek);
dayjs.locale('uk');

export const useSchedule = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const weekParam = searchParams.get('week');
	const initialWeekDiff = weekParam ? parseInt(weekParam, 10) : 0;

	const [currentWeek, setCurrentWeek] = useState(
		dayjs().add(initialWeekDiff, 'week'),
	);

	useEffect(() => {
		if (weekParam) {
			const weekDiff = parseInt(weekParam, 10);
			setCurrentWeek(dayjs().add(weekDiff, 'week'));
		}
	}, [weekParam]);

	const startOfWeek = currentWeek.startOf('isoWeek');
	const endOfWeek = currentWeek.endOf('isoWeek');

	const todayWeek = `${startOfWeek.format('D MMMM')} – ${endOfWeek.format('D MMMM')}`;
	const startDate = startOfWeek.format('YYYY-MM-DD');
	const endDate = endOfWeek.add(1, 'day').format('YYYY-MM-DD'); // Exclusive end date for database query

	const weekDiff = currentWeek
		.startOf('isoWeek')
		.diff(dayjs().startOf('isoWeek'), 'week');

	const handlePrevious = () => {
		const newWeek = currentWeek.subtract(1, 'week');
		const newWeekDiff = newWeek
			.startOf('isoWeek')
			.diff(dayjs().startOf('isoWeek'), 'week');
		setCurrentWeek(newWeek);
		setSearchParams(newWeekDiff !== 0 ? { week: newWeekDiff.toString() } : {});
	};

	const handleNext = () => {
		const newWeek = currentWeek.add(1, 'week');
		const newWeekDiff = newWeek
			.startOf('isoWeek')
			.diff(dayjs().startOf('isoWeek'), 'week');
		setCurrentWeek(newWeek);
		setSearchParams(newWeekDiff !== 0 ? { week: newWeekDiff.toString() } : {});
	};

	const handleReset = () => {
		setCurrentWeek(dayjs());
		setSearchParams({});
	};

	return {
		currentWeek,
		todayWeek,
		startDate,
		endDate,
		weekDiff,
		handlePrevious,
		handleNext,
		handleReset,
	};
};
