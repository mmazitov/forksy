import { Flame } from 'lucide-react';

interface NutritionCompactProps {
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
}

const NutritionCompact = ({
	calories,
	protein,
	fat,
	carbs,
}: NutritionCompactProps) => {
	return (
		<div className="space-y-2">
			{calories !== null && calories !== undefined && (
				<div className="flex items-center gap-1 text-sm">
					<Flame className="text-secondary h-4 w-4" />
					<span className="text-muted-foreground">{calories} ккал/100г</span>
				</div>
			)}

			{(protein !== null || fat !== null || carbs !== null) && (
				<div className="text-muted-foreground flex justify-between gap-3 text-xs">
					{protein !== null && <span>Білки: {protein}г</span>}
					{fat !== null && <span>Жири: {fat}г</span>}
					{carbs !== null && <span>Вуглеводи: {carbs}г</span>}
				</div>
			)}
		</div>
	);
};

export default NutritionCompact;
