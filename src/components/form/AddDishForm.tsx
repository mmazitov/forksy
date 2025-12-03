import {
	Button,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/components';
import { CATEGORIES_DISHES } from '@/constants';
import { useFormList } from '@/hooks/useFormList';
import { X } from 'lucide-react';
import { LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface AddDishFormProps {
	handleSubmit: (e: React.FormEvent) => void;
}

const AddDishForm = ({ handleSubmit }: AddDishFormProps) => {
	const {
		items: ingredients,
		addItem: addIngredient,
		removeItem: removeIngredient,
		updateItem: updateIngredient,
	} = useFormList({ name: '', amount: '' });

	const {
		items: steps,
		addItem: addStep,
		removeItem: removeStep,
		updateItem: updateStep,
	} = useFormList<string>('');

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Basic Info */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="name">Назва страви *</Label>
					<Input id="name" placeholder="Наприклад: Вівсяна каша" required />
				</div>

				<div className="space-y-2">
					<Label htmlFor="category">Категорія *</Label>
					<Select required>
						<SelectTrigger>
							<SelectValue placeholder="Виберіть категорію" />
						</SelectTrigger>
						<SelectContent>
							{CATEGORIES_DISHES.slice(1).map((category) => (
								<SelectItem key={category.id} value={category.name}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="image">URL зображення</Label>
				<Input id="image" type="url" placeholder="https://..." />
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Опис</Label>
				<Textarea
					id="description"
					placeholder="Короткий опис страви."
					rows={3}
				/>
			</div>

			{/* Nutrition & Time */}
			<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
				<div className="space-y-2">
					<Label htmlFor="calories">Калорії</Label>
					<Input id="calories" type="number" placeholder="0" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="protein">Білки (г)</Label>
					<Input id="protein" type="number" step="0.1" placeholder="0" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="fat">Жири (г)</Label>
					<Input id="fat" type="number" step="0.1" placeholder="0" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="carbs">Вуглеводи (г)</Label>
					<Input id="carbs" type="number" step="0.1" placeholder="0" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="time">Час (хв)</Label>
					<Input id="time" type="number" placeholder="0" />
				</div>
			</div>

			{/* Ingredients */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Label>Інгредієнти</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={addIngredient}
					>
						<LuPlus className="h-4 w-4 mr-1" />
						Додати
					</Button>
				</div>
				{ingredients.map((ingredient, index) => (
					<div key={index} className="flex gap-2">
						<Input
							placeholder="Назва"
							value={ingredient.name}
							onChange={(e) =>
								updateIngredient(index, { name: e.target.value })
							}
							className="flex-1"
						/>
						<Input
							placeholder="Кількість"
							value={ingredient.amount}
							onChange={(e) =>
								updateIngredient(index, { amount: e.target.value })
							}
							className="w-32"
						/>
						{ingredients.length > 1 && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => removeIngredient(index)}
							>
								<LuPlus className="h-4 w-4" />
							</Button>
						)}
					</div>
				))}
			</div>

			{/* Instructions */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Label>Шаги приготування</Label>
					<Button type="button" variant="outline" size="sm" onClick={addStep}>
						<LuPlus className="h-4 w-4 mr-1" />
						Додати шаг
					</Button>
				</div>
				{steps.map((step, index) => (
					<div key={index} className="flex gap-2 items-start">
						<span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm mt-2">
							{index + 1}
						</span>
						<Textarea
							placeholder="Опишіть крок приготування..."
							value={step as string}
							onChange={(e) => updateStep(index, e.target.value as never)}
							rows={2}
							className="flex-1"
						/>
						{steps.length > 1 && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => removeStep(index)}
								className="mt-2"
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				))}
			</div>

			<div className="flex gap-4">
				<Button type="submit" size="lg" className="flex-1">
					Додати страву
				</Button>
				<Link to="/dishes" className="flex-1">
					<Button type="button" variant="outline" size="lg" className="w-full">
						Скасувати
					</Button>
				</Link>
			</div>
		</form>
	);
};

export default AddDishForm;
