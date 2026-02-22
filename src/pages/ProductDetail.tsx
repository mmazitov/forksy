import { ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { useAuthContext } from '@/features/auth';
import { CardFull } from '@/features/products';
import { useProductByNameQuery } from '@/shared/api/graphql';
import { Button, Loader, MetaData } from '@/shared/components';
import { fromSlug } from '@/shared/lib/utils/slug';

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

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={product.name}
				description={product.description || `Продукт ${product.name}`}
				keywords={[
					'product',
					'nutrition',
					'calories',
					product.name,
					product.category || 'food',
				]}
				type="product"
			/>
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
