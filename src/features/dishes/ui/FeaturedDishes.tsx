import { useMemo } from 'react';
import { LuTrendingUp } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import DishCardCompact from './DishCardCompact';

import { useDishesQuery } from '@/shared/api/graphql/dish.gen';
import { Loader } from '@/shared/components';
import { Grid } from '@/shared/components/grid';
import { Button } from '@/shared/components/ui/button';

const FeaturedDishes = () => {
	const { data, loading, error } = useDishesQuery();

	const randomDishes = useMemo(() => {
		if (!data?.dishes) return [];
		return [...data.dishes].sort(() => 0.5 - Math.random()).slice(0, 5);
	}, [data?.dishes]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return null;
	}

	return (
		<>
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h2 className="text-foreground mb-2 text-3xl font-bold">
						Популярні рецепти
					</h2>
					<p className="text-muted-foreground">
						Рекомендуємо рецепти для здорового харчування
					</p>
				</div>
				<Link to="/dishes">
					<Button variant="ghost" className="gap-2">
						Всі рецепти
						<LuTrendingUp className="h-4 w-4" />
					</Button>
				</Link>
			</div>

			{randomDishes.length > 0 && (
				<Grid
					items={randomDishes}
					renderItem={(item) => <DishCardCompact {...item} />}
					showEmpty={false}
				/>
			)}
		</>
	);
};

export default FeaturedDishes;
