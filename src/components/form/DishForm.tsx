import { X } from 'lucide-react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import FormItem from './FormItem';

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
import { useAddDish, useEditDish } from '@/hooks';
import { Ingredient } from '@/hooks/useFormList';
import { DishFieldsFragment, ProductFieldsFragment } from '@/lib/graphql';

// Helper to parse ingredient string "name - amount" back to object
const parseIngredient = (str: string): Ingredient => {
	const parts = str.split(' - ');
	return {
		name: parts[0] || '',
		amount: parts[1] || '',
	};
};

interface DishFormProps {
	dish?: DishFieldsFragment | null;
	products: ProductFieldsFragment[];
	isEditMode?: boolean;
}

const DishForm = ({ dish, products, isEditMode = false }: DishFormProps) => {
	// Parse existing ingredients and instructions for edit mode
	const existingIngredients = dish?.ingredients?.map(parseIngredient);
	const existingInstructions = dish?.instructions;

	const addDishHook = useAddDish();
	const editDishHook = useEditDish(
		dish?.id || '',
		dish
			? {
					name: dish.name,
					category: dish.category || '',
					imageUrl: dish.imageUrl || '',
					calories: dish.calories || 0,
					description: dish.description || '',
					prepTime: dish.prepTime || 0,
					servings: dish.servings || 0,
				}
			: undefined,
		dish
			? {
					ingredients: existingIngredients,
					instructions: existingInstructions,
				}
			: undefined,
	);

	const {
		register,
		handleSubmit,
		control,
		errors,
		onSubmit,
		loading,
		ingredientsList,
		instructionsList,
	} = isEditMode ? editDishHook : addDishHook;

	// Destructure list helpers
	const {
		items: ingredients,
		addItem: addIngredient,
		removeItem: removeIngredient,
		updateItem: updateIngredient,
	} = ingredientsList;

	const {
		items: instructions,
		addItem: addInstruction,
		removeItem: removeInstruction,
		updateItem: updateInstruction,
	} = instructionsList;

	// Search state for product selection
	const [searchQueries, setSearchQueries] = useState<Record<number, string>>(
		{},
	);

	const handleSearchChange = (index: number, value: string) => {
		setSearchQueries((prev) => ({ ...prev, [index]: value }));
	};

	const getFilteredProducts = (index: number) => {
		const query = searchQueries[index]?.toLowerCase() || '';
		if (!query) return products;
		return products.filter((p) => p.name.toLowerCase().includes(query));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Basic Info */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<FormItem
					id="name"
					label="Назва страви *"
					error={errors.name}
					registration={register('name')}
					inputProps={{
						placeholder: 'Наприклад: Вівсяна каша',
					}}
				/>

				<div className="space-y-2">
					<Label htmlFor="category">Категорія *</Label>
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<Select onValueChange={field.onChange} value={field.value}>
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
						)}
					/>
					{errors.category && (
						<p className="text-destructive text-sm">
							{errors.category.message}
						</p>
					)}
				</div>
			</div>

			<FormItem
				id="imageUrl"
				label="URL зображення"
				type="url"
				error={errors.imageUrl}
				registration={register('imageUrl')}
				inputProps={{
					placeholder: 'https://...',
				}}
			/>

			<FormItem
				itemType="textarea"
				id="description"
				label="Опис"
				error={errors.description}
				registration={register('description')}
				textareaProps={{
					placeholder: 'Короткий опис страви...',
				}}
			/>

			{/* Nutrition & Time */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-5">
				{/* <div className="space-y-2">
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
				</div> */}
				<FormItem
					id="prepTime"
					label="Час приготування (хв) *"
					type="number"
					error={errors.prepTime}
					registration={register('prepTime', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
					}}
				/>
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
										onKeyDown={(e) => e.stopPropagation()}
										onKeyUp={(e) => e.stopPropagation()}
										autoFocus
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
					<Label>Кроки приготування</Label>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={addInstruction}
					>
						<LuPlus className="mr-1 h-4 w-4" />
						Додати крок
					</Button>
				</div>
				{instructions.map((instruction, index) => (
					<div key={index} className="flex items-start gap-2">
						<span className="bg-primary text-primary-foreground mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
							{index + 1}
						</span>
						<Textarea
							placeholder="Опишіть крок приготування..."
							value={instruction}
							onChange={(e) => updateInstruction(index, e.target.value)}
							rows={2}
							className="flex-1"
						/>
						{instructions.length > 1 && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => removeInstruction(index)}
								className="mt-2"
							>
								<X className="h-4 w-4" />
							</Button>
						)}
					</div>
				))}
			</div>

			<div className="flex flex-col gap-4 md:flex-row">
				<Button type="submit" size="lg" className="w-full" disabled={loading}>
					{loading
						? isEditMode
							? 'Оновлення...'
							: 'Додавання...'
						: isEditMode
							? 'Оновити страву'
							: 'Додати страву'}
				</Button>
				<Link to="/dishes" className="w-full">
					<Button type="button" variant="outline" size="lg" className="w-full">
						Скасувати
					</Button>
				</Link>
			</div>
		</form>
	);
};

export default DishForm;
