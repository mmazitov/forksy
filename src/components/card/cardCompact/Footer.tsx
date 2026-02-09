import { Clock, Flame } from 'lucide-react';

import { NutritionCompact } from '@/components/nutrition';

interface CardCompactFooterProps {
	prepTime?: number;
	footerType?: string;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	userId?: string | null;
}

const CardCompactFooter = ({
	calories,
	prepTime,
	footerType = 'product',
	protein,
	fat,
	carbs,
}: CardCompactFooterProps) => {
	return (
		<>
			{footerType === 'product' ? (
				<NutritionCompact
					calories={calories}
					protein={protein}
					fat={fat}
					carbs={carbs}
				/>
			) : (
				<>
					<div className="flex items-center gap-1">
						<Flame className="text-secondary h-4 w-4" />
						<span>{calories} ккал</span>
					</div>
					<div className="flex items-center gap-1">
						<Clock className="text-primary h-4 w-4" />
						<span>{prepTime} мин</span>
					</div>
				</>
			)}
		</>
	);
};

export default CardCompactFooter;
