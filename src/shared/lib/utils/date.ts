import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(isoWeek);
dayjs.locale('uk');

export function formatDateToISO(date: Date | string): string {
	if (typeof date === 'string') {
		return date;
	}
	return date.toISOString().split('T')[0];
}

export function formatDateOrKeep(
	date: Date | string | undefined,
): string | undefined {
	if (!date) return undefined;
	return formatDateToISO(date);
}

export function formatDayjsToISO(date: Dayjs): string {
	return date.format('YYYY-MM-DD');
}

export function getToday(): string {
	return dayjs().format('D MMMM, YYYY');
}

export function getTodayWeek(): string {
	const startOfWeek = dayjs().startOf('isoWeek');
	const endOfWeek = dayjs().endOf('isoWeek');
	return `${startOfWeek.format('D MMMM')} – ${endOfWeek.format('D MMMM')}`;
}

export function getWeekDays(): string[] {
	return Array.from({ length: 7 }, (_, i) =>
		dayjs()
			.isoWeekday(i + 1)
			.format('dd'),
	);
}

export const today = getToday();
export const todayWeek = getTodayWeek();
export const weekDays = getWeekDays();
