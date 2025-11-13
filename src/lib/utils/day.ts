import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(isoWeek);
dayjs.locale('uk');

const startOfWeek = dayjs().startOf('isoWeek');
const endOfWeek = dayjs().endOf('isoWeek');

export const today = dayjs().format('D MMMM, YYYY');

export const todayWeek = `${startOfWeek.format('D MMMM')} – ${endOfWeek.format('D MMMM')}`;

export const weekDays = Array.from({ length: 7 }, (_, i) =>
	dayjs()
		.isoWeekday(i + 1)
		.format('dd'),
);
