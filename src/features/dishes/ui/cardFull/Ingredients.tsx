import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Counter,
} from '@/shared/components';
import { Ingredient } from '@/shared/types';

interface IngredientsProps {
	ingredients: Ingredient[];
}

const Ingredients = ({ ingredients }: IngredientsProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Інгредієнти</CardTitle>
			</CardHeader>
			<CardContent>
				<ol className="space-y-4">
					{ingredients.map((ingredient, index) => (
						<li key={index} className="flex items-center gap-2">
							<Counter index={index} />
							<p className="text-foreground flex flex-1 items-center justify-between">
								{ingredient.name}
								<span className="text-muted-foreground font-medium">
									{ingredient.amount}
								</span>
							</p>
						</li>
					))}
				</ol>
			</CardContent>
		</Card>
	);
};

export default Ingredients;
