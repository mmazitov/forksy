import {
	AddProductForm,
	BackButton,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components';

const AddProduct = () => {
	return (
		<div className="container mx-auto px-4 py-8 max-w-3xl">
			<BackButton title="До списку продуктів" href="/products" />

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Додати новий продукт</CardTitle>
				</CardHeader>
				<CardContent>
					<AddProductForm />
				</CardContent>
			</Card>
		</div>
	);
};

export default AddProduct;
