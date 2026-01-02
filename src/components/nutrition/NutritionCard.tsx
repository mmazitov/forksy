interface NutritionCardProps {
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
}

const NutritionCard = ({
	calories,
	protein,
	fat,
	carbs,
}: NutritionCardProps) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			{calories !== null && calories !== undefined && (
				<div className="bg-muted rounded-lg p-4 text-center">
					<div className="text-primary text-3xl font-bold">{calories}</div>
					<div className="text-muted-foreground text-sm">Калорії</div>
				</div>
			)}
			{protein !== null && protein !== undefined && (
				<div className="bg-muted rounded-lg p-4 text-center">
					<div className="text-secondary text-3xl font-bold">{protein}г</div>
					<div className="text-muted-foreground text-sm">Білки</div>
				</div>
			)}
			{fat !== null && fat !== undefined && (
				<div className="bg-muted rounded-lg p-4 text-center">
					<div className="text-accent text-3xl font-bold">{fat}г</div>
					<div className="text-muted-foreground text-sm">Жири</div>
				</div>
			)}
			{carbs !== null && carbs !== undefined && (
				<div className="bg-muted rounded-lg p-4 text-center">
					<div className="text-primary text-3xl font-bold">{carbs}г</div>
					<div className="text-muted-foreground text-sm">Вуглеводи</div>
				</div>
			)}
		</div>
	);
};

export default NutritionCard;
