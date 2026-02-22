import { Clock, Flame } from 'lucide-react';

interface CardCompactFooterProps {
	prepTime?: number | null;
	calories?: number | null;
}

const CardCompactFooter = ({ calories, prepTime }: CardCompactFooterProps) => {
	return (
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
	);
};

export default CardCompactFooter;
