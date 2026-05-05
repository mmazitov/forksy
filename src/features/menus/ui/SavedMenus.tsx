import { useMemo, useState } from 'react';
import { LuCalendarX, LuHeart } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

import { useSavedMenuActions } from '../hooks/useSavedMenuActions';
import { useSavedMenus } from '../hooks/useSavedMenus';
import { MenuCard, MenuCardSkeleton } from './menuCard';

import { Button } from '@/shared/components';
import { ITEMS_PER_PAGE } from '@/shared/constants';

const SavedMenus = () => {
	const navigate = useNavigate();
	const { menus, loading } = useSavedMenus();
	const { handleDelete, handleDuplicate } = useSavedMenuActions();
	const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

	const filteredMenus = useMemo(
		() => (showOnlyFavorites ? menus.filter((menu) => menu.isFavorite) : menus),
		[menus, showOnlyFavorites],
	);

	if (loading) {
		return (
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
					<MenuCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (menus.length === 0) {
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

	return (
		<>
			<div className="mb-6">
				<Button
					variant={showOnlyFavorites ? 'default' : 'outline'}
					onClick={() => setShowOnlyFavorites((prev) => !prev)}
					className="w-40"
				>
					<LuHeart />
					{showOnlyFavorites ? 'Показати всі' : 'Тільки обрані'}
				</Button>
			</div>

			{filteredMenus.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-12 text-center">
					<div className="bg-muted mb-4 rounded-full p-4">
						<LuHeart className="text-muted-foreground h-8 w-8" />
					</div>
					<h3 className="mb-2 text-xl font-semibold">Немає обраних меню</h3>
					<p className="text-muted-foreground mb-4">
						Додайте меню до обраних, натиснувши на іконку серця
					</p>
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{filteredMenus.map((menu) => (
						<MenuCard
							key={menu.id}
							menu={menu}
							onDelete={handleDelete}
							onDuplicate={handleDuplicate}
						/>
					))}
				</div>
			)}
		</>
	);
};

export default SavedMenus;
