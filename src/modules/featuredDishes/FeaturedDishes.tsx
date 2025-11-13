import CardDish from '@/components/card/CardDish';
import { Grid } from '@/components/grid';
import { Button } from '@/components/ui';
import { dishes } from '@/mock';
import { LuTrendingUp } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const FeaturedDishes = () => {
	return (
		<>
			<div className="flex items-center justify-between mb-8">
				<div>
					<h2 className="mb-2 text-3xl font-bold text-foreground">
						Популярні рецепти
					</h2>
					<p className="text-muted-foreground">
						Рекомендуємо рецепти для здорового харчування
					</p>
				</div>
				<Link to="/dishes">
					<Button variant="ghost" className="gap-2">
						Всі рецепти
						<LuTrendingUp className="w-4 h-4" />
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
