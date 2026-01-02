import { ArrowLeft } from 'lucide-react';
import { LuFlame } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	MetaData,
} from '@/components';
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
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="text-center">Завантаження...</div>
			</div>
		);
	}

	if (error || !data?.product) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="p-4 text-red-600 bg-red-50 rounded-lg">
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

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
				{isAdmin && (
					<div className="absolute top-0 right-0">
						<Link to={`/products/edit/${product.id}`}>
							<Button variant="outline" size="sm">
								Редагувати продукт
							</Button>
						</Link>
						<Button variant="destructive" size="sm">
							Видалити продукт
						</Button>
					</div>
				)}

				{/* Image */}
				<div className="rounded-2xl overflow-hidden bg-muted">
					{product.imageUrl ? (
						<img
							src={product.imageUrl}
							alt={product.name}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="flex items-center justify-center w-full h-full bg-muted">
							<span className="text-9xl">🍽️</span>
						</div>
					)}
				</div>

				{/* Info */}
				<div className="space-y-6">
					<div>
						{product.category && (
							<Badge className="mb-3">{product.category}</Badge>
						)}
						<h1 className="text-4xl font-bold text-foreground mb-4">
							{product.name}
						</h1>
						{product.description && (
							<p className="text-muted-foreground text-lg">
								{product.description}
							</p>
						)}
					</div>

					{/* Nutrition Facts */}
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<LuFlame className="h-5 w-5 text-secondary" />
								Поживна цінність (на 100г)
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 gap-4">
								{product.calories !== null &&
									product.calories !== undefined && (
										<div className="text-center p-4 rounded-lg bg-muted">
											<div className="text-3xl font-bold text-primary">
												{product.calories}
											</div>
											<div className="text-sm text-muted-foreground">
												Калорії
											</div>
										</div>
									)}
								{product.protein !== null && product.protein !== undefined && (
									<div className="text-center p-4 rounded-lg bg-muted">
										<div className="text-3xl font-bold text-secondary">
											{product.protein}г
										</div>
										<div className="text-sm text-muted-foreground">Білки</div>
									</div>
								)}
								{product.fat !== null && product.fat !== undefined && (
									<div className="text-center p-4 rounded-lg bg-muted">
										<div className="text-3xl font-bold text-accent">
											{product.fat}г
										</div>
										<div className="text-sm text-muted-foreground">Жири</div>
									</div>
								)}
								{product.carbs !== null && product.carbs !== undefined && (
									<div className="text-center p-4 rounded-lg bg-muted">
										<div className="text-3xl font-bold text-primary">
											{product.carbs}г
										</div>
										<div className="text-sm text-muted-foreground">
											Вуглеводи
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
