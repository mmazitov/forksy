import { LuCopy, LuEye, LuTrash2 } from 'react-icons/lu';

import { Button } from '@/shared/components';

interface ActionsProps {
	onView: () => void;
	onDuplicate: () => void;
	onDelete: () => void;
}

const Actions = ({ onView, onDuplicate, onDelete }: ActionsProps) => {
	return (
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
			<Button
				variant="outline"
				size="sm"
				onClick={(e) => {
					e.preventDefault();
					onDuplicate();
				}}
				aria-label="Дублювати меню"
			>
				<LuCopy className="h-4 w-4" />
			</Button>
			<Button
				variant="outline"
				size="sm"
				onClick={(e) => {
					e.preventDefault();
					onDelete();
				}}
				aria-label="Видалити меню"
			>
				<LuTrash2 className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default Actions;
