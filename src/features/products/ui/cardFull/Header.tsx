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
		<div>
			{canEdit && (
				<div className="absolute top-2 left-2 z-10 flex flex-col gap-2 md:flex-row lg:top-0 lg:right-0 lg:left-auto">
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
			{category && <Badge className={`mb-3 ${badgeClass}`}>{category}</Badge>}
			<h1 className="text-foreground mb-4 text-4xl font-bold">{name}</h1>
			{description && (
				<p className="text-muted-foreground text-lg">{description}</p>
			)}
		</div>
	);
};

export default Header;
