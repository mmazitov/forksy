import { Link } from 'react-router-dom';

import { Badge, Button } from '@/shared/components';
import { createSlug } from '@/shared/lib/utils';
import { categoryBadgeMap } from '@/shared/lib/utils/categoryBadge';

interface HeaderProps {
	name: string;
	category?: string | null;
	description?: string | null;
	canEdit: boolean;
	handleDelete: () => void;
	deleteLoading: boolean;
}

const Header = ({
	name,
	category,
	description,
	canEdit,
	handleDelete,
	deleteLoading,
}: HeaderProps) => {
	const badgeClass =
		category && categoryBadgeMap[category]
			? categoryBadgeMap[category]
			: 'bg-muted text-muted-foreground';

	return (
		<div className="flex flex-col gap-2">
			{canEdit && (
				<div className="flex flex-col justify-end gap-2 md:flex-row">
					<Link to={`/product/edit/${createSlug(name)}`}>
						<Button variant="outline" size="sm">
							Редагувати продукт
						</Button>
					</Link>
					<Button
						variant="destructive"
						onClick={handleDelete}
						size="sm"
						disabled={deleteLoading}
					>
						Видалити продукт
					</Button>
				</div>
			)}
			<div className="grid grid-cols-2 grid-rows-2">
				<h1 className="text-foreground col-span-1 text-4xl font-bold">
					{name}
				</h1>
				{category && (
					<Badge className={`col-span-1 ${badgeClass} hover:${badgeClass}`}>
						{category}
					</Badge>
				)}
				{description && (
					<p className="text-muted-foreground col-span-2 text-lg">
						{description}
					</p>
				)}
			</div>
		</div>
	);
};

export default Header;
