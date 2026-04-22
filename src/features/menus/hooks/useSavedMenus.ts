import { useMemo } from 'react';

import { useSavedMenusQuery } from '@/shared/api/graphql';
import { getWeekDiff } from '@/shared/lib/utils';

export const useSavedMenus = () => {
	const { data, loading, error, refetch } = useSavedMenusQuery({
		fetchPolicy: 'cache-and-network',
	});

	const sortedMenus = useMemo(() => {
		if (!data?.savedMenus) return [];

		return [...data.savedMenus].sort((a, b) => {
			const diffA = Math.abs(getWeekDiff(a.startDate));
			const diffB = Math.abs(getWeekDiff(b.startDate));

			if (diffA === diffB) {
				const weekDiffA = getWeekDiff(a.startDate);
				const weekDiffB = getWeekDiff(b.startDate);
				return weekDiffB - weekDiffA;
			}

			return diffA - diffB;
		});
	}, [data?.savedMenus]);

	return {
		menus: sortedMenus,
		loading,
		error,
		refetch,
	};
};
