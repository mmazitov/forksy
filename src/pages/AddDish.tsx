import { DishForm } from '@/features/dishes';
import { useProductsQuery } from '@/shared/api/graphql';
import {
	BackButton,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Loader,
	MetaData,
} from '@/shared/components';
import { METADATA_CONFIG } from '@/shared/lib/config';

const AddDish = () => {
	const { data, loading } = useProductsQuery();

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
					{loading ? <Loader /> : <DishForm products={data?.products || []} />}
				</CardContent>
			</Card>
		</div>
	);
};

export default AddDish;
