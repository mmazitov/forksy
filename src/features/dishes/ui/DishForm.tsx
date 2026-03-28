import { X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { useAddDish, useEditDish } from '../hooks';

import { useProductSearch } from '@/features/products';
import {
	DishFieldsFragment,
	ProductFieldsFragment,
} from '@/shared/api/graphql';
import { FormInput } from '@/shared/components';
import { Button } from '@/shared/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { CATEGORIES_DISHES } from '@/shared/constants';
import {
	calculateNutrition,
	createProductsMap,
	parseIngredients,
} from '@/shared/lib/utils';
import { FormIngredient } from '@/shared/types';

interface DishFormProps {
	dish?: DishFieldsFragment | null;
	products: ProductFieldsFragment[];
	isEditMode?: boolean;
}

const DishForm = ({ dish, products, isEditMode = false }: DishFormProps) => {
	const productsByName = useMemo(() => createProductsMap(products), [products]);

	const existingIngredients = useMemo(() => {
		if (!dish?.ingredients) return undefined;
		return parseIngredients(dish.ingredients, productsByName);
	}, [dish?.ingredients, productsByName]);

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
					protein: dish.protein || 0,
					fat: dish.fat || 0,
					carbs: dish.carbs || 0,
					prepTime: dish.prepTime || 0,
					servings: dish.servings || 0,
					description: dish.description || '',
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
		setValue,
	} = isEditMode ? editDishHook : addDishHook;

	const {
		items: ingredients,
		ids: ingredientIds,
		addItem: addIngredient,
		removeItem: removeIngredient,
		updateItem: updateIngredient,
	} = ingredientsList;

	const {
		items: instructions,
		ids: instructionIds,
		addItem: addInstruction,
		removeItem: removeInstruction,
		updateItem: updateInstruction,
	} = instructionsList;

	const calculatedNutrition = useMemo(() => {
		const ingredientsWithNutrition = ingredients.map(
			(ingredient: FormIngredient) => {
				const product = productsByName.get(ingredient.name);
				return {
					amount: ingredient.amount,
					nutrition: product
						? {
								calories: product.calories ?? 0,
								protein: product.protein ?? 0,
								fat: product.fat ?? 0,
								carbs: product.carbs ?? 0,
							}
						: null,
				};
			},
		);

		return calculateNutrition(ingredientsWithNutrition);
	}, [ingredients, productsByName]);

	useEffect(() => {
		setValue('calories', calculatedNutrition.calories);
		setValue('protein', calculatedNutrition.protein);
		setValue('fat', calculatedNutrition.fat);
		setValue('carbs', calculatedNutrition.carbs);
	}, [calculatedNutrition, setValue]);

	const {
		handleSearchChange,
		getFilteredProducts,
		handleProductSelect,
		getSearchQuery,
	} = useProductSearch({
		products,
		updateIngredient,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			{/* Basic Info */}
			<div className="grid grid-cols-[1fr_1fr] grid-rows-[auto_auto] gap-2 md:grid-cols-[1fr_260px_170px] md:grid-rows-[auto]">
				<FormInput
					id="name"
					label="Назва страви *"
					error={errors.name}
					registration={register('name')}
					className="col-span-2 md:col-span-1"
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
				<FormInput
					id="prepTime"
					label="Час приготування (хв) *"
					error={errors.prepTime}
					registration={register('prepTime', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
						type: 'number',
					}}
				/>
			</div>

			<FormInput
				id="imageUrl"
				label="URL зображення"
				error={errors.imageUrl}
				registration={register('imageUrl')}
				inputProps={{
					placeholder: 'https://...',
					type: 'url',
				}}
			/>

			<FormInput
				itemType="textarea"
				id="description"
				label="Опис"
				error={errors.description}
				registration={register('description')}
				textareaProps={{
					placeholder: 'Короткий опис страви...',
				}}
			/>

			{/* Calculated Nutrition */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-base">
						Поживна цінність (розраховується автоматично)
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-2 md:grid-cols-4">
						<div className="bg-muted rounded-lg p-3 text-center">
							<div className="text-primary text-2xl font-bold">
								{calculatedNutrition.calories}
							</div>
							<div className="text-muted-foreground text-xs">Калорії</div>
						</div>
						<div className="bg-muted rounded-lg p-3 text-center">
							<div className="text-secondary text-2xl font-bold">
								{calculatedNutrition.protein}г
							</div>
							<div className="text-muted-foreground text-xs">Білки</div>
						</div>
						<div className="bg-muted rounded-lg p-3 text-center">
							<div className="text-accent text-2xl font-bold">
								{calculatedNutrition.fat}г
							</div>
							<div className="text-muted-foreground text-xs">Жири</div>
						</div>
						<div className="bg-muted rounded-lg p-3 text-center">
							<div className="text-primary text-2xl font-bold">
								{calculatedNutrition.carbs}г
							</div>
							<div className="text-muted-foreground text-xs">Вуглеводи</div>
						</div>
					</div>
					<p className="text-muted-foreground mt-3 text-xs">
						💡 Підтримувані одиниці: г, шт, ст.л., ч.л., склянка, мл, кг
						(наприклад: 100г, 2 шт, 1 ст.л.)
					</p>
				</CardContent>
			</Card>

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
				{ingredients.map((ingredient: FormIngredient, index: number) => (
					<div
						key={ingredientIds[index]}
						className="grid gap-2"
						style={{
							gridTemplateColumns: '1fr 128px 40px',
						}}
					>
						<Select
							value={ingredient.name}
							onValueChange={(value) => handleProductSelect(index, value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Виберіть продукт" />
							</SelectTrigger>
							<SelectContent>
								<div className="px-2 pb-2">
									<Input
										placeholder="Пошук продукту..."
										value={getSearchQuery(index)}
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
										getFilteredProducts(index).map(
											(product: ProductFieldsFragment) => (
												<SelectItem key={product.id} value={product.name}>
													{product.name}
												</SelectItem>
											),
										)
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
				{instructions.map((instruction: string, index: number) => (
					<div key={instructionIds[index]} className="flex items-start gap-2">
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

			<div className="flex flex-col gap-2 md:flex-row">
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
