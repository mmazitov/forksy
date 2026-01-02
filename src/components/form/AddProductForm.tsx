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
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { useAddProduct } from '@/hooks';
import FormItem from './FormItem';

const AddProductForm = () => {
	const { register, handleSubmit, control, errors, onSubmit, loading } =
		useAddProduct();

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
					<p className="text-sm text-destructive">{errors.category.message}</p>
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

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

			<div className="flex gap-4">
				<Button type="submit" size="lg" className="flex-1" disabled={loading}>
					{loading ? 'Додавання...' : 'Додати продукт'}
				</Button>
				<Link to="/products" className="flex-1">
					<Button type="button" variant="outline" size="lg" className="w-full">
						Скасувати
					</Button>
				</Link>
			</div>
		</form>
	);
};

export default AddProductForm;
