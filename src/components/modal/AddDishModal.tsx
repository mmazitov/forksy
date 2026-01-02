import { Card, Search } from '@/components';
import { dishes } from '@/mock';

interface AddDishModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	selectedMeal: string | null;
	searchQuery: string;
	onSearchChange: (query: string) => void;
	onDishSelect: (dish: (typeof dishes)[0]) => void;
}

const AddDishModal = ({
	isOpen,
	onOpenChange,
	selectedMeal,
	searchQuery,
	onSearchChange,
	onDishSelect,
}: AddDishModalProps) => {
	const filteredDishes = dishes.filter((dish) =>
		dish.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="space-y-4">
			<Search
				searchQuery={searchQuery}
				onSearchChange={onSearchChange}
				searchPlaceholder="Пошук блюд..."
			/>

			<div className="grid gap-2">
				{filteredDishes.map((dish) => (
					<Card
						key={dish.id}
						className="p-4 cursor-pointer hover:border-primary transition-colors"
						onClick={() => onDishSelect(dish)}
					>
						<div className="flex justify-between items-start gap-4">
							<div className="flex-1">
								<h4 className="font-medium">{dish.name}</h4>
								<p className="text-sm text-muted-foreground">{dish.category}</p>
								<p className="text-xs text-muted-foreground mt-1">
									{dish.description}
								</p>
							</div>
							<div className="text-sm font-medium text-foreground whitespace-nowrap">
								{dish.calories} ккал
							</div>
						</div>
					</Card>
				))}
			</div>

			{filteredDishes.length === 0 && (
				<div className="text-center py-8 text-muted-foreground">
					Блюда не знайдено
				</div>
			)}
		</div>
	);
};

export default AddDishModal;
