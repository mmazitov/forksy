import { LuCopy, LuEye, LuPencil, LuTrash2 } from 'react-icons/lu';
import { MdMoreVert } from 'react-icons/md';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	FavoriteButton,
} from '@/shared/components';

interface ActionsProps {
	onView: () => void;
	onEdit: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
	onToggleFavorite: () => void;
	isFavorite: boolean;
}

const Actions = ({
	onView,
	onEdit,
	onDuplicate,
	onDelete,
	onToggleFavorite,
	isFavorite,
}: ActionsProps) => {
	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex gap-2">
				<Button
					variant="outline"
					size="sm"
					className="flex-1"
					onClick={(e) => {
						e.preventDefault();
						onView();
					}}
					aria-label="Переглянути меню"
				>
					<LuEye className="mr-1 h-4 w-4" />
					Переглянути
				</Button>
				<FavoriteButton
					isFavorite={isFavorite}
					onClick={onToggleFavorite}
					variant="inline"
				/>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="sm" aria-label="Більше дій">
						<MdMoreVert className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={(e) => {
							e.preventDefault();
							onEdit();
						}}
					>
						<LuPencil className="mr-2 h-4 w-4" />
						Редагувати
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={(e) => {
							e.preventDefault();
							onDuplicate();
						}}
					>
						<LuCopy className="mr-2 h-4 w-4" />
						Дублювати
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={(e) => {
							e.preventDefault();
							onDelete();
						}}
						className="text-destructive hover:text-(--color-destructive-foreground)"
					>
						<LuTrash2 className="mr-2 h-4 w-4" />
						Видалити
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default Actions;
