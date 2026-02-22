import { useParams } from 'react-router-dom';

import { ProductForm } from '@/features/products';
import { useProductByNameQuery } from '@/shared/api/graphql';
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
import { createSlug } from '@/shared/lib/utils';
import { fromSlug } from '@/shared/lib/utils/slug';

const AddProduct = () => {
	const { id } = useParams<{ id: string }>();
	const isEditMode = !!id;
	const productName = id ? fromSlug(id) : '';

	const { data, loading } = useProductByNameQuery({
		variables: { name: productName },
		skip: !productName,
	});

	if (loading && isEditMode) {
		return <Loader />;
	}

	const product = data?.productByName;

	return (
		<div className="container mx-auto max-w-3xl px-4 py-8">
			<MetaData
				title={
					isEditMode
						? METADATA_CONFIG.titles.editProduct + ' ' + product?.name
						: METADATA_CONFIG.titles.addProduct
				}
				description={
					isEditMode
						? METADATA_CONFIG.descriptions.editProduct + ' ' + product?.name
						: METADATA_CONFIG.descriptions.addProduct
				}
				keywords={METADATA_CONFIG.keywords.products}
				type="website"
			/>
			<BackButton
				title={isEditMode ? 'До продукту' : 'До списку продуктів'}
				href={
					isEditMode
						? `/product/${createSlug(product?.name || '')}`
						: '/products'
				}
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
