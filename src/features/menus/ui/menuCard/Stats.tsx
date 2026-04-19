import { LuFlame, LuUtensils } from 'react-icons/lu';

interface StatsProps {
	totalDishes: number;
	totalCalories: number;
	totalProtein: number;
	totalFat: number;
	totalCarbs: number;
}

const Stats = ({
	totalDishes,
	totalCalories,
	totalProtein,
	totalFat,
	totalCarbs,
}: StatsProps) => {
	return (
		<div className="space-y-2">
			<div className="flex items-center gap-4 text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<LuUtensils className="h-4 w-4" />
					<span>{totalDishes} страв</span>
				</div>
				<div className="flex items-center gap-1">
					<LuFlame className="h-4 w-4" />
					<span>{totalCalories.toLocaleString()} ккал</span>
				</div>
			</div>
			<div className="flex gap-3 text-xs text-muted-foreground">
				<span>Б: {totalProtein}г</span>
				<span>Ж: {totalFat}г</span>
				<span>В: {totalCarbs}г</span>
			</div>
		</div>
	);
};

export default Stats;
