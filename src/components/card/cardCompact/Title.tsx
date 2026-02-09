import { Badge } from '@/components';
import { categoryBadgeMap } from '@/lib/utils/categoryBadge';

interface CardCompactTitleProps {
	name: string;
	category: string | null | undefined;
}

const CardCompactTitle = ({ name, category }: CardCompactTitleProps) => {
	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';
	return (
		<div className="flex items-start justify-between gap-2 px-4">
			<h3 className="text-foreground text-base font-semibold">{name}</h3>
			{category && (
				<Badge className={`shrink-0 text-xs hover:${badgeClass} ${badgeClass}`}>
					{category}
				</Badge>
			)}
		</div>
	);
};

export default CardCompactTitle;
