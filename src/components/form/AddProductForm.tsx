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
import { CATEGORIES_PRODUCTS } from '@/constants';
import { Link } from 'react-router-dom';

interface AddProductFormProps {
	handleSubmit: (e: React.FormEvent) => void;
}
const AddProductForm = ({ handleSubmit }: AddProductFormProps) => {
	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label htmlFor="name">Назва продукту *</Label>
				<Input id="name" placeholder="Наприклад: Куряча грудка" required />
			</div>

			<div className="space-y-2">
				<Label htmlFor="category">Категорія *</Label>
				<Select required>
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
			</div>

			<div className="space-y-2">
				<Label htmlFor="image">URL зображення</Label>
				<Input id="image" type="url" placeholder="https://..." />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="calories">Калорійність (на 100г) *</Label>
					<Input id="calories" type="number" placeholder="0" required />
				</div>

				<div className="space-y-2">
					<Label htmlFor="protein">Білки (г) *</Label>
					<Input
						id="protein"
						type="number"
						step="0.1"
						placeholder="0"
						required
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="fat">Жири (г) *</Label>
					<Input id="fat" type="number" step="0.1" placeholder="0" required />
				</div>

				<div className="space-y-2">
					<Label htmlFor="carbs">Вуглеводи (г) *</Label>
					<Input id="carbs" type="number" step="0.1" placeholder="0" required />
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Опис</Label>
				<Textarea
					id="description"
					placeholder="Короткий опис продукту..."
					rows={4}
				/>
			</div>

			<div className="flex gap-4">
				<Button type="submit" size="lg" className="flex-1">
					Додати продукт
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
