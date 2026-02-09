import { Badge } from '@/components';
import { categoryBadgeMap } from '@/lib/utils/categoryBadge';

interface CardCompactTitleProps {
	name: string;
	category: string | null | undefined;
	description?: string | null;
}

const CardCompactTitle = ({
	name,
	category,
	description,
}: CardCompactTitleProps) => {
	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';
	return (
		<div className="grid grid-cols-2 items-start justify-between gap-2 px-4">
			<h3 className="text-foreground line-clamp-4 text-base font-semibold">
				{name}
			</h3>
			{category && (
				<Badge className={`shrink-0 text-xs hover:${badgeClass} ${badgeClass}`}>
					{category}
				</Badge>
			)}
			{description && (
				<p className="text-muted-foreground col-span-2 line-clamp-1 text-sm">
					{description}
				</p>
			)}
		</div>
	);
};

export default CardCompactTitle;
