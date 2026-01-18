import { LuTrendingUp } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import CardDish from '@/components/card/CardDish';
import { Grid } from '@/components/grid';
import { Button } from '@/components/ui';
import { dishes } from '@/mock';

const FeaturedDishes = () => {
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

			<Grid
				items={dishes.slice(0, 4)}
				renderItem={(item) => <CardDish {...item} />}
				showEmpty={false}
			/>
		</>
	);
};

export default FeaturedDishes;
