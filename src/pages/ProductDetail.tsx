import { ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { CardFull } from '@/features/products';
import { useProductByNameQuery } from '@/shared/api/graphql';
import {
	Breadcrumb,
	Button,
	Loader,
	MetaData,
	SchemaOrg,
} from '@/shared/components';
import { fromSlug } from '@/shared/lib/utils/slug';
import { generateProductSchema } from '@/shared/lib/utils/schemaOrg';

const ProductDetail = () => {
	const { isAdmin, user } = useAuthContext();
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const productName = id ? fromSlug(id) : '';

	const from = location.state?.from || '/products';
	const backText =
		from === '/favorites' ? 'Назад до обраного' : 'Назад до продуктів';

	const { data, loading, error } = useProductByNameQuery({
		variables: { name: productName },
		skip: !productName,
	});

	if (loading) {
		return <Loader />;
	}

	if (error || !data?.productByName) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Продукт не знайдено
				</div>
			</div>
		);
	}

	const product = data.productByName;

	// Generate Product Schema.org markup
	const productSchema = generateProductSchema({
		name: product.name,
		description:
			product.description ||
			`Продукт ${product.name} з детальною поживною інформацією`,
		image: product.imageUrl ?? 'https://mealvy.vercel.app/icon-512.png',
		brand: 'Mealvy',
		calories: product.calories ?? 0,
		protein: product.protein ?? 0,
		fat: product.fat ?? 0,
		carbs: product.carbs ?? 0,
	});

	const breadcrumbItems = [
		{ name: 'Головна', url: '/' },
		{ name: 'Продукти', url: '/products' },
		{ name: product.name, url: `/products/${id}` },
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={product.name}
				description={product.description || `Продукт ${product.name}`}
				keywords={[
					'продукт',
					'харчування',
					'калорії',
					product.name,
					product.category || 'їжа',
				]}
				type="product"
			/>
			<SchemaOrg schema={productSchema} />
			<Breadcrumb items={breadcrumbItems} />
			<Link to={from}>
				<Button variant="ghost" className="mb-6 gap-2">
					<ArrowLeft className="h-4 w-4" />
					{backText}
				</Button>
			</Link>

			<CardFull
				id={product.id}
				name={product.name}
				description={product.description}
				category={product.category}
				imageUrl={product.imageUrl}
				calories={product.calories}
				protein={product.protein}
				fat={product.fat}
				carbs={product.carbs}
				isAdmin={isAdmin}
				userId={product.userId}
				currentUserId={user?.id}
				isFavorite={product.isFavorite}
			/>
		</div>
	);
};

export default ProductDetail;
