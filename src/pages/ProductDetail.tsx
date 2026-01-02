import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Button, CardProductFull, Loader, MetaData } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { useProductQuery } from '@/lib/graphql';

const ProductDetail = () => {
	const { isAdmin } = useAuth();
	const { id } = useParams<{ id: string }>();
	const { data, loading, error } = useProductQuery({
		variables: { id: id! },
		skip: !id,
	});

	if (loading) {
		return <Loader />;
	}

	if (error || !data?.product) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="rounded-lg bg-red-50 p-4 text-red-600">
					Продукт не знайдено
				</div>
			</div>
		);
	}

	const product = data.product;

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
			<Link to="/products">
				<Button variant="ghost" className="mb-6 gap-2">
					<ArrowLeft className="h-4 w-4" />
					Назад до продуктів
				</Button>
			</Link>

			<CardProductFull
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
			/>
		</div>
	);
};

export default ProductDetail;
