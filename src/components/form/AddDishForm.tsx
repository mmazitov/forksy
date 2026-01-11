import { X } from 'lucide-react';
import { useState } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

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
import { ProductFieldsFragment } from '@/lib/graphql';

interface AddDishFormProps {
	handleSubmit: (e: React.FormEvent) => void;
	products?: ProductFieldsFragment[];
}

const AddDishForm = ({ handleSubmit, products = [] }: AddDishFormProps) => {
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

	const [searchQueries, setSearchQueries] = useState<Record<number, string>>(
		{},
	);

	const handleSearchChange = (index: number, value: string) => {
		setSearchQueries((prev) => ({ ...prev, [index]: value }));
	};

	const getFilteredProducts = (index: number) => {
		const query = searchQueries[index]?.toLowerCase() || '';
		if (!query) return products;
		return products.filter((product) =>
			product.name.toLowerCase().includes(query),
		);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Basic Info */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
			<div className="grid grid-cols-1 gap-4 md:grid-cols-5">
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
						<LuPlus className="mr-1 h-4 w-4" />
						Додати
					</Button>
				</div>
				{ingredients.map((ingredient, index) => (
					<div
						key={index}
						className="grid gap-2"
						style={{
							gridTemplateColumns: '1fr 128px 40px',
						}}
					>
						<Select
							value={ingredient.name}
							onValueChange={(value) => {
								updateIngredient(index, { name: value });
								setSearchQueries((prev) => ({ ...prev, [index]: '' }));
							}}
						>
							<SelectTrigger>
								<SelectValue placeholder="Виберіть продукт" />
							</SelectTrigger>
							<SelectContent>
								<div className="px-2 pb-2">
									<Input
										placeholder="Пошук продукту..."
										value={searchQueries[index] || ''}
										onChange={(e) => handleSearchChange(index, e.target.value)}
										className="h-8"
										onClick={(e) => e.stopPropagation()}
									/>
								</div>
								<div className="max-h-50 overflow-y-auto">
									{getFilteredProducts(index).length > 0 ? (
										getFilteredProducts(index).map((product) => (
											<SelectItem key={product.id} value={product.name}>
												{product.name}
											</SelectItem>
										))
									) : (
										<div className="text-muted-foreground px-2 py-6 text-center text-sm">
											Продукт не знайдено
										</div>
									)}
								</div>
							</SelectContent>
						</Select>
						<Input
							placeholder="Кількість"
							value={ingredient.amount}
							onChange={(e) =>
								updateIngredient(index, { amount: e.target.value })
							}
						/>
						{ingredients.length > 1 ? (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => removeIngredient(index)}
							>
								<LuMinus className="h-4 w-4" />
							</Button>
						) : (
							<div />
						)}
					</div>
				))}
			</div>

			{/* Instructions */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<Label>Шаги приготування</Label>
					<Button type="button" variant="outline" size="sm" onClick={addStep}>
						<LuPlus className="mr-1 h-4 w-4" />
						Додати шаг
					</Button>
				</div>
				{steps.map((step, index) => (
					<div key={index} className="flex items-start gap-2">
						<span className="bg-primary text-primary-foreground mt-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
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
