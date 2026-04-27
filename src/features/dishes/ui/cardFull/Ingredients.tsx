import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Counter,
} from '@/shared/components';

interface IngredientsProps {
	ingredients: { name: string; amount: string; productId?: string | null }[];
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
						<li key={`${ingredient.name}-${ingredient.amount}`} className="flex items-center gap-2">
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
