import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { useShoppingListState } from './useShoppingListState';

import { useGetPlannerItemsQuery } from '@/shared/api/graphql/planner.gen';
import { formatDateToISO, formatDayjsToISO } from '@/shared/lib/utils';

dayjs.extend(isoWeek);

export const useShoppingListPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const rawWeekDiff = parseInt(searchParams.get('week') || '0', 10);
	const weekDiff = isNaN(rawWeekDiff)
		? 0
		: Math.max(-52, Math.min(52, rawWeekDiff));

	// Normalize URL on mount if the raw param was invalid or out of range.
	// Empty deps array is intentional — this runs once to sanitize the initial URL.
	useEffect(() => {
		const raw = searchParams.get('week');
		if (raw === null) return;
		if (weekDiff === 0) {
			setSearchParams({}, { replace: true });
		} else if (String(rawWeekDiff) !== String(weekDiff)) {
			setSearchParams({ week: String(weekDiff) }, { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const currentWeek = dayjs().add(weekDiff, 'week');
	const startOfWeek = currentWeek.startOf('isoWeek');
	const endOfWeek = currentWeek.endOf('isoWeek');
	const startDate = formatDayjsToISO(startOfWeek);
	const endDate = formatDayjsToISO(endOfWeek.add(1, 'day'));

	const { data, loading, error } = useGetPlannerItemsQuery({
		variables: {
			startDate,
			endDate,
		},
		fetchPolicy: 'cache-and-network',
	});

	const plannerItemsData = data?.getPlannerItems || [];

	const { checkedCount, totalCount, categorizedIngredients } =
		useShoppingListState(plannerItemsData);

	const handleExport = () => {
		if (plannerItemsData.length === 0) return;

		const lines: string[] = ['Список покупок', ''];

		categorizedIngredients.forEach(([categoryName, ingredients]) => {
			lines.push(`\n${categoryName.toUpperCase()}`);
			lines.push('─'.repeat(40));

			ingredients.forEach((ingredient) => {
				const amount =
					ingredient.totalAmount > 0
						? `${ingredient.totalAmount} ${ingredient.unit}`
						: ingredient.unit;
				lines.push(`• ${ingredient.name} - ${amount}`);
			});
		});

		const text = lines.join('\n');
		const blob = new Blob([text], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `shopping-list-${formatDateToISO(new Date())}.txt`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const backHref =
		weekDiff !== 0 ? `/menu-planner?week=${weekDiff}` : '/menu-planner';

	return {
		weekDiff,
		loading,
		error,
		plannerItemsData,
		checkedCount,
		totalCount,
		handleExport,
		backHref,
	};
};
