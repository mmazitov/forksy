import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	MetaData,
} from '@/components';
import { product } from '@/mock';
import { ArrowLeft } from 'lucide-react';
import { LuFlame } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
	const { id } = useParams();

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={product.name}
				description={`${product.description}`}
				keywords={[
					'product',
					'nutrition',
					'calories',
					product.name,
					product.category,
				]}
				type="product"
			/>
			<Link to="/products">
				<Button variant="ghost" className="mb-6 gap-2">
					<ArrowLeft className="h-4 w-4" />
					Назад до продуктів
				</Button>
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Image */}
				<div className="aspect-square rounded-2xl overflow-hidden bg-muted">
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Info */}
				<div className="space-y-6">
					<div>
						<Badge className="mb-3">{product.category}</Badge>
						<h1 className="text-4xl font-bold text-foreground mb-4">
							{product.name}
						</h1>
						<p className="text-muted-foreground text-lg">
							{product.description}
						</p>
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
								<div className="text-center p-4 rounded-lg bg-muted">
									<div className="text-3xl font-bold text-primary">
										{product.calories}
									</div>
									<div className="text-sm text-muted-foreground">Калории</div>
								</div>
								<div className="text-center p-4 rounded-lg bg-muted">
									<div className="text-3xl font-bold text-secondary">
										{product.protein}г
									</div>
									<div className="text-sm text-muted-foreground">Белки</div>
								</div>
								<div className="text-center p-4 rounded-lg bg-muted">
									<div className="text-3xl font-bold text-accent">
										{product.fat}г
									</div>
									<div className="text-sm text-muted-foreground">Жиры</div>
								</div>
								<div className="text-center p-4 rounded-lg bg-muted">
									<div className="text-3xl font-bold text-primary">
										{product.carbs}г
									</div>
									<div className="text-sm text-muted-foreground">Углеводы</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Benefits */}
					<Card>
						<CardHeader>
							<CardTitle>Переваги для здоров'я</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{product.benefits.map((benefit, index) => (
									<li key={index} className="flex items-start gap-2">
										<span className="text-primary">•</span>
										<span className="text-muted-foreground">{benefit}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Vitamins */}
					<Card>
						<CardHeader>
							<CardTitle>Вітаміни та мінерали</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{Object.entries(product.vitamins).map(([name, value]) => (
									<div key={name} className="flex justify-between items-center">
										<span className="text-muted-foreground m">{name}</span>
										<span className="font-medium">{value}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
