import { useParams } from 'react-router-dom';

import {
	BackButton,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Loader,
	MetaData,
	ProductForm,
} from '@/components';
import { METADATA_CONFIG } from '@/lib/config';
import { useProductQuery } from '@/lib/graphql';

const AddProduct = () => {
	const { id } = useParams<{ id: string }>();
	const isEditMode = !!id;

	const { data, loading } = useProductQuery({
		variables: { id: id! },
		skip: !id,
	});

	if (loading && isEditMode) {
		return <Loader />;
	}

	const product = data?.product;

	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<MetaData
				title={isEditMode ? 'Редагувати продукт' : 'Додати продукт'}
				description={METADATA_CONFIG.descriptions.addProduct}
				keywords={METADATA_CONFIG.keywords.products}
				type="website"
			/>
			<BackButton
			title={isEditMode ? 'До продукту' : 'До списку продуктів'}
			href={isEditMode ? `/products/${id}` : '/products'}
		/>

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">
						{isEditMode ? 'Редагувати продукт' : 'Додати новий продукт'}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ProductForm product={product} isEditMode={isEditMode} />
				</CardContent>
			</Card>
		</div>
	);
};

export default AddProduct;
