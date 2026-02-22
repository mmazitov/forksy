import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAddProduct, useEditProduct } from '../hooks/useProduct';

import type { ProductFieldsFragment } from '@/shared/api/graphql';
import {
	Button,
	FormInput,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components';
import { CATEGORIES_PRODUCTS } from '@/shared/constants';

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
			<FormInput
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

			<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
				<FormInput
					id="calories"
					label="Калорійність (на 100г) *"
					error={errors.calories}
					registration={register('calories', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
						type: 'number',
					}}
				/>

				<FormInput
					id="protein"
					label="Білки (г) *"
					error={errors.protein}
					registration={register('protein', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
						type: 'number',
						step: 0.1,
					}}
				/>

				<FormInput
					id="fat"
					label="Жири (г) *"
					error={errors.fat}
					registration={register('fat', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
						type: 'number',
						step: 0.1,
					}}
				/>

				<FormInput
					id="carbs"
					label="Вуглеводи (г) *"
					error={errors.carbs}
					registration={register('carbs', { valueAsNumber: true })}
					inputProps={{
						placeholder: '0',
						type: 'number',
						step: 0.1,
					}}
				/>
			</div>

			<FormInput
				itemType="textarea"
				id="description"
				label="Опис"
				error={errors.description}
				registration={register('description')}
				textareaProps={{
					placeholder: 'Короткий опис продукту...',
				}}
			/>

			<div className="flex flex-col gap-2 md:flex-row">
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
