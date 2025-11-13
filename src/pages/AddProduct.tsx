import {
	AddProductForm,
	BackButton,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components';
import { toast } from 'sonner';

const AddProduct = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		toast.success('Продукт успішно додано!');
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-3xl">
			<BackButton title="До списку продуктів" href="/products" />

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Додати новий продукт</CardTitle>
				</CardHeader>
				<CardContent>
					<AddProductForm handleSubmit={handleSubmit} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AddProduct;
