import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFavoriteMenu } from '../../hooks/useFavoriteMenu';
import { useUpdateMenu } from '../../hooks/useUpdateMenu';
import Actions from './Actions';
import Header from './Header';
import Preview from './Preview';
import Stats from './Stats';

import { SavedMenuFieldsFragment } from '@/shared/api/graphql';
import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	DateRangePicker,
	Input,
} from '@/shared/components';

interface MenuCardProps {
	menu: SavedMenuFieldsFragment;
	onDelete: (id: string) => void;
	onDuplicate: (id: string) => void;
}

const MenuCard = ({ menu, onDelete, onDuplicate }: MenuCardProps) => {
	const navigate = useNavigate();
	const { toggleFavorite } = useFavoriteMenu(menu.id, menu.isFavorite);
	const { updateMenu, isUpdating } = useUpdateMenu();
	const [isEditing, setIsEditing] = useState(false);
	const [editName, setEditName] = useState(menu.name);
	const [editStartDate, setEditStartDate] = useState(menu.startDate);
	const [editEndDate, setEditEndDate] = useState(menu.endDate);

	const handleView = () => {
		navigate(`/menu/${menu.id}`);
	};

	const handleEdit = () => {
		setEditName(menu.name);
		setEditStartDate(menu.startDate);
		setEditEndDate(menu.endDate);
		setIsEditing(true);
	};

	const handleCancel = () => {
		setEditName(menu.name);
		setEditStartDate(menu.startDate);
		setEditEndDate(menu.endDate);
		setIsEditing(false);
	};

	const handleSave = async () => {
		if (editName.trim()) {
			await updateMenu(menu.id, editName.trim(), editStartDate, editEndDate);
			setIsEditing(false);
		}
	};

	const handleDateChange = (startDate: string, endDate: string) => {
		setEditStartDate(startDate);
		setEditEndDate(endDate);
	};

	const handleDuplicate = () => {
		onDuplicate(menu.id);
	};

	const handleDelete = () => {
		onDelete(menu.id);
	};

	return (
		<Card className="group flex h-full flex-col gap-3 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg">
			<CardHeader className="space-y-2 pb-3">
				{isEditing ? (
					<div className="space-y-3">
						<Input
							value={editName}
							onChange={(e) => setEditName(e.target.value)}
							placeholder="Назва меню"
							disabled={isUpdating}
						/>
						<DateRangePicker
							startDate={editStartDate}
							onDateChange={handleDateChange}
						/>
					</div>
				) : (
					<Header
						name={menu.name}
						startDate={menu.startDate}
						endDate={menu.endDate}
					/>
				)}
			</CardHeader>

			<CardContent className="flex-1 space-y-3 px-6 py-0">
				<Preview items={menu.items} />
				{!isEditing && (
					<Stats
						totalDishes={menu.totalDishes}
						totalCalories={menu.totalCalories}
						totalProtein={menu.totalProtein}
						totalFat={menu.totalFat}
						totalCarbs={menu.totalCarbs}
					/>
				)}
			</CardContent>

			<CardFooter className="px-6 pt-3 pb-6">
				{isEditing ? (
					<div className="flex w-full gap-2">
						<Button
							variant="outline"
							onClick={handleCancel}
							disabled={isUpdating}
							className="flex-1"
						>
							Скасувати
						</Button>
						<Button
							onClick={handleSave}
							disabled={isUpdating || !editName.trim()}
							className="flex-1"
						>
							{isUpdating ? 'Збереження...' : 'Зберегти'}
						</Button>
					</div>
				) : (
					<Actions
						onView={handleView}
						onEdit={handleEdit}
						onDuplicate={handleDuplicate}
						onDelete={handleDelete}
						onToggleFavorite={toggleFavorite}
						isFavorite={menu.isFavorite}
					/>
				)}
			</CardFooter>
		</Card>
	);
};

export default MenuCard;
