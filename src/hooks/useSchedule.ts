import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useState } from 'react';

dayjs.extend(isoWeek);
dayjs.locale('uk');

export const useSchedule = () => {
	const [currentWeek, setCurrentWeek] = useState(dayjs());

	const startOfWeek = currentWeek.startOf('isoWeek');
	const endOfWeek = currentWeek.endOf('isoWeek');

	const todayWeek = `${startOfWeek.format('D MMMM')} – ${endOfWeek.format('D MMMM')}`;

	const weekDiff = currentWeek
		.startOf('isoWeek')
		.diff(dayjs().startOf('isoWeek'), 'week');

	const handlePrevious = () =>
		setCurrentWeek((prev) => prev.subtract(1, 'week'));

	const handleNext = () => setCurrentWeek((prev) => prev.add(1, 'week'));

	const handleReset = () => setCurrentWeek(dayjs());

	return {
		currentWeek,
		todayWeek,
		weekDiff,
		handlePrevious,
		handleNext,
		handleReset,
	};
};
