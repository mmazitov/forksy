import { useParams } from 'react-router-dom';

import { ProductForm } from '@/features/products';
import { useProductQuery } from '@/shared/api/graphql';
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
				title={
					isEditMode
						? METADATA_CONFIG.titles.editProduct
						: METADATA_CONFIG.titles.addProduct
				}
				description={METADATA_CONFIG.descriptions.addProduct}
				keywords={METADATA_CONFIG.keywords.products}
				type="website"
			/>
			<BackButton
				title={isEditMode ? 'До продукту' : 'До списку продуктів'}
				href={isEditMode ? `/product/${id}` : '/products'}
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
