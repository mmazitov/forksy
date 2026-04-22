import { CheckCircle2, Circle } from 'lucide-react';

import {
	PlannerItemData,
	useShoppingListState,
} from '../hooks/useShoppingListState';

import { Badge, Checkbox } from '@/shared/components';

interface ShoppingListContentProps {
	plannerItemsData: PlannerItemData[];
}

export const ShoppingListContent = ({
	plannerItemsData,
}: ShoppingListContentProps) => {
	const {
		aggregatedIngredients,
		categorizedIngredients,
		getCategoryBadgeClass,
		toggleItem,
		toggleCategory,
		checkedItems,
	} = useShoppingListState(plannerItemsData);

	if (aggregatedIngredients.length === 0) {
		return (
			<div className="text-muted-foreground flex h-[50vh] items-center justify-center text-center">
				<div>
					<p className="text-lg font-medium">
						Немає інгредієнтів у вашому меню
					</p>
					<p className="text-muted-foreground mt-2 text-sm">
						Додайте страви до планувальника меню, щоб побачити список покупок
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{categorizedIngredients.map(([categoryName, ingredients]) => {
				const categoryCheckedCount = ingredients.filter((ing) =>
					checkedItems.has(`${ing.name.toLowerCase()}-${ing.unit}`),
				).length;
				const allCategoryChecked = categoryCheckedCount === ingredients.length;

				return (
					<div key={categoryName} className="space-y-3">
						<div className="flex items-center">
							<button
								onClick={() => toggleCategory(categoryName)}
								className="transition-opacity hover:opacity-80"
								aria-label={
									allCategoryChecked
										? `Зняти позначки з усіх інгредієнтів ${categoryName}`
										: `Позначити усі інгредієнти ${categoryName}`
								}
							>
								{allCategoryChecked ? (
									<CheckCircle2
										className="text-primary h-5 w-5"
										aria-hidden="true"
									/>
								) : (
									<Circle
										className="text-muted-foreground h-5 w-5"
										aria-hidden="true"
									/>
								)}
							</button>
							<Badge className={getCategoryBadgeClass(categoryName)}>
								{categoryName}
							</Badge>
							<span className="text-muted-foreground text-sm">
								{categoryCheckedCount > 0 && (
									<span className="text-primary font-medium">
										{categoryCheckedCount}/
									</span>
								)}
								{ingredients.length}
							</span>
						</div>
						<ul className="space-y-2 pl-0">
							{ingredients.map((ingredient) => {
								const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
								const isChecked = checkedItems.has(key);

								return (
									<li
										key={key}
										className={`hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 transition-all ${
											isChecked ? 'bg-accent/30 opacity-60' : ''
										}`}
									>
										<Checkbox
											checked={isChecked}
											onCheckedChange={() => toggleItem(key)}
											id={key}
										/>
										<label
											htmlFor={key}
											className="flex flex-1 cursor-pointer items-center justify-between"
										>
											<span
												className={`font-medium ${isChecked ? 'line-through' : ''}`}
											>
												{ingredient.name}
											</span>
											<span className="text-muted-foreground text-sm">
												{ingredient.totalAmount > 0
													? `${ingredient.totalAmount} ${ingredient.unit}`
													: ingredient.unit}
											</span>
										</label>
									</li>
								);
							})}
						</ul>
					</div>
				);
			})}
		</div>
	);
};
