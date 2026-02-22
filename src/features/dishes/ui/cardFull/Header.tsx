import { LuClock } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { Badge, Button } from '@/shared/components';
import { createSlug } from '@/shared/lib/utils';
import { categoryBadgeMap } from '@/shared/lib/utils/categoryBadge';

interface HeaderProps {
	name: string;
	category?: string | null;
	description?: string | null;
	prepTime?: number | null;
	canEdit: boolean;
	handleDelete: () => void;
	deleteLoading: boolean;
}

const Header = ({
	name,
	category,
	description,
	prepTime,
	canEdit,
	handleDelete,
	deleteLoading,
}: HeaderProps) => {
	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';

	return (
		<>
			<div className="flex justify-between">
				{category && <Badge className={`mb-3 ${badgeClass}`}>{category}</Badge>}
				{canEdit && (
					<div className="flex flex-col gap-2 md:flex-row">
						<Link to={`/dish/edit/${createSlug(name)}`}>
							<Button variant="outline" size="sm">
								Редагувати страву
							</Button>
						</Link>
						<Button
							variant="destructive"
							onClick={handleDelete}
							size="sm"
							disabled={deleteLoading}
						>
							Видалити страву
						</Button>
					</div>
				)}
			</div>
			<div className="grid items-start justify-between">
				<h1 className="text-foreground mb-2 text-4xl font-bold">{name}</h1>
				<div className="flex items-center gap-2">
					<LuClock className="text-primary h-5 w-5" />
					<span>{prepTime} хв</span>
				</div>
				{description && (
					<p className="text-muted-foreground col-span-2 text-lg">
						{description}
					</p>
				)}
			</div>
		</>
	);
};

export default Header;
