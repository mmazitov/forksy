import { toast } from 'sonner';

import {
	AddDishForm,
	BackButton,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Loader,
	MetaData,
} from '@/components';
import { METADATA_CONFIG } from '@/lib/config';
import { useProductsQuery } from '@/lib/graphql';

const AddDish = () => {
	const { data, loading } = useProductsQuery();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		toast.success('Страва успішно додана!');
	};

	return (
		<div className="container mx-auto max-w-4xl px-4 py-8">
			<MetaData
				// title={isEditMode ? 'Редагувати страву' : 'Додати страву'}
				title="Додати страву"
				description={METADATA_CONFIG.descriptions.addDish}
				keywords={METADATA_CONFIG.keywords.dishes}
				type="website"
			/>
			<BackButton title="До списку страв" href="/dishes" />

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Додати нову страву</CardTitle>
				</CardHeader>
				<CardContent>
					{loading ? (
						<Loader />
					) : (
						<AddDishForm
							handleSubmit={handleSubmit}
							products={data?.products || []}
						/>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AddDish;
