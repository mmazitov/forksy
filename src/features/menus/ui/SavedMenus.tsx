import { LuCalendarX } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { useSavedMenus } from '../hooks/useSavedMenus';
import { useSavedMenuActions } from '../hooks/useSavedMenuActions';
import { MenuCard, MenuCardSkeleton } from './menuCard';

import { Button } from '@/shared/components';
import { ITEMS_PER_PAGE } from '@/shared/constants';

const SavedMenus = () => {
	const navigate = useNavigate();
	const { menus, loading } = useSavedMenus();
	const { handleDelete, handleDuplicate } = useSavedMenuActions();

	if (!loading && menus.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="bg-muted mb-4 rounded-full p-4">
					<LuCalendarX className="text-muted-foreground h-8 w-8" />
				</div>
				<h3 className="mb-2 text-xl font-semibold">Немає збережених меню</h3>
				<p className="text-muted-foreground mb-4">
					Створіть своє перше меню та збережіть його
				</p>
				<Button onClick={() => navigate('/menu-planner')}>Створити меню</Button>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
					<MenuCardSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{menus.map((menu) => (
				<MenuCard
					key={menu.id}
					menu={menu}
					onDelete={handleDelete}
					onDuplicate={handleDuplicate}
				/>
			))}
		</div>
	);
};

export default SavedMenus;
