import {
	AddDishForm,
	BackButton,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components';
import { toast } from 'sonner';

const AddDish = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		toast.success('Страва успішно додана!');
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			<BackButton title="До списку страв" href="/dishes" />

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Додати нову страву</CardTitle>
				</CardHeader>
				<CardContent>
					<AddDishForm handleSubmit={handleSubmit} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AddDish;
