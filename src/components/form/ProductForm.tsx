import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import FormItem from './FormItem';

import {
	Button,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components';
import { CATEGORIES_PRODUCTS } from '@/constants';
import { useAddProduct, useEditProduct } from '@/hooks';
import type { ProductFieldsFragment } from '@/lib/graphql';

interface ProductFormProps {
	product?: ProductFieldsFragment | null;
	isEditMode?: boolean;
}

const ProductForm = ({ product, isEditMode = false }: ProductFormProps) => {
	const addProductHook = useAddProduct();
	const editProductHook = useEditProduct(
		product?.id || '',
		product
			? {
					name: product.name,
					category: product.category || '',
					imageUrl: product.imageUrl || '',
					calories: product.calories || 0,
					protein: product.protein || 0,
					fat: product.fat || 0,
					carbs: product.carbs || 0,
					description: product.description || '',
				}
			: undefined,
	);

	const { register, handleSubmit, control, errors, onSubmit, loading } =
		isEditMode ? editProductHook : addProductHook;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<FormItem
				id="name"
				label="Назва продукту *"
				error={errors.name}
				registration={register('name')}
				inputProps={{
					placeholder: 'Наприклад: Куряча грудка',
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
								{CATEGORIES_PRODUCTS.slice(1).map((category) => (
									<SelectItem key={category.id} value={category.name}>
										{category.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					)}
				/>
				{errors.category && (
					<p className="text-destructive text-sm">{errors.category.message}</p>
				)}
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

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<FormItem
					id="calories"
					label="Калорійність (на 100г) *"
					type="number"
					error={errors.calories}
					registration={register('calories', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
					}}
				/>

				<FormItem
					id="protein"
					label="Білки (г) *"
					type="number"
					step={0.1}
					error={errors.protein}
					registration={register('protein', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
					}}
				/>

				<FormItem
					id="fat"
					label="Жири (г) *"
					type="number"
					step={0.1}
					error={errors.fat}
					registration={register('fat', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
					}}
				/>

				<FormItem
					id="carbs"
					label="Вуглеводи (г) *"
					type="number"
					step={0.1}
					error={errors.carbs}
					registration={register('carbs', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
					}}
				/>
			</div>

			<FormItem
				itemType="textarea"
				id="description"
				label="Опис"
				error={errors.description}
				registration={register('description')}
				textareaProps={{
					placeholder: 'Короткий опис продукту...',
				}}
			/>

			<div className="flex flex-col gap-4 md:flex-row">
				<Button type="submit" size="lg" className="w-full" disabled={loading}>
					{loading
						? isEditMode
							? 'Оновлення...'
							: 'Додавання...'
						: isEditMode
							? 'Оновити продукт'
							: 'Додати продукт'}
				</Button>
				<Link to="/products" className="w-full">
					<Button type="button" variant="outline" size="lg" className="w-full">
						Скасувати
					</Button>
				</Link>
			</div>
		</form>
	);
};

export default ProductForm;
