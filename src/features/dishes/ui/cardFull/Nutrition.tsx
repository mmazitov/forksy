import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Separator,
} from '@/shared/components';

interface NutritionProps {
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
}

const Nutrition = ({ calories, protein, fat, carbs }: NutritionProps) => {
	return (
		<div className="space-y-6">
			<Card>
				<CardHeader>
					<CardTitle>Поживна цінність</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="bg-muted rounded-lg p-4 text-center">
						<div className="text-primary text-3xl font-bold">{calories}</div>
						<div className="text-muted-foreground text-sm">Калорії</div>
					</div>

					<Separator />

					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Білки</span>
							<span className="text-secondary font-medium">{protein}г</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Жири</span>
							<span className="text-accent font-medium">{fat}г</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Вуглеводи</span>
							<span className="text-primary font-medium">{carbs}г</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Button className="w-full" size="lg">
				Додати до плану харчування
			</Button>
		</div>
	);
};

export default Nutrition;
