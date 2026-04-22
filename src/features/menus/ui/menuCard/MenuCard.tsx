import { useNavigate } from 'react-router-dom';

import Actions from './Actions';
import Header from './Header';
import Preview from './Preview';
import Stats from './Stats';

import { SavedMenuFieldsFragment } from '@/shared/api/graphql';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components';

interface MenuCardProps {
	menu: SavedMenuFieldsFragment;
	onDelete: (id: string) => void;
	onDuplicate: (id: string) => void;
}

const MenuCard = ({ menu, onDelete, onDuplicate }: MenuCardProps) => {
	const navigate = useNavigate();

	const handleView = () => {
		navigate(`/menu/${menu.id}`);
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
				<Header startDate={menu.startDate} endDate={menu.endDate} />
			</CardHeader>

			<CardContent className="flex-1 space-y-3 px-6 py-0">
				<Preview items={menu.items} />
				<Stats
					totalDishes={menu.totalDishes}
					totalCalories={menu.totalCalories}
					totalProtein={menu.totalProtein}
					totalFat={menu.totalFat}
					totalCarbs={menu.totalCarbs}
				/>
			</CardContent>

			<CardFooter className="px-6 pt-3 pb-6">
				<Actions
					onView={handleView}
					onDuplicate={handleDuplicate}
					onDelete={handleDelete}
				/>
			</CardFooter>
		</Card>
	);
};

export default MenuCard;
