import { useCallback, useMemo } from 'react';
import { LuTrendingUp } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import CardCompact from './cardCompact/CardCompact';

import { useDishesQuery } from '@/shared/api/graphql/dish.gen';
import { Grid } from '@/shared/components/grid';
import { Skeleton } from '@/shared/components/skeleton';
import { Button } from '@/shared/components/ui/button';

const FeaturedDishes = () => {
	const { data, loading, error } = useDishesQuery();

	const randomDishes = useMemo(() => {
		if (!data?.dishes) return [];
		return [...data.dishes].sort(() => 0.5 - Math.random()).slice(0, 5);
	}, [data?.dishes]);

	const skeletonItems = useMemo(
		() => Array.from({ length: 5 }).map((_, i) => ({ id: String(i) })),
		[],
	);

	const renderSkeleton = useCallback(() => <Skeleton />, []);
	const renderDishes = useCallback(
		(dish: (typeof randomDishes)[number]) => <CardCompact {...dish} />,
		[],
	);

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Помилка завантаження продуктів: {error.message}
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h2 className="text-foreground mb-2 text-3xl font-bold">
						Популярні страви
					</h2>
					<p className="text-muted-foreground">
						Рекомендуємо страви для здорового харчування
					</p>
				</div>
				<Link to="/dishes">
					<Button variant="ghost" className="gap-2">
						Всі страви
						<LuTrendingUp className="h-4 w-4" />
					</Button>
				</Link>
			</div>

			{loading ? (
				<Grid
					items={skeletonItems}
					renderItem={renderSkeleton}
					showEmpty={false}
				/>
			) : (
				<Grid
					items={randomDishes}
					renderItem={renderDishes}
					showEmpty={false}
				/>
			)}
		</>
	);
};

export default FeaturedDishes;
