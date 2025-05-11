import { Product } from '@prisma/client';
import Link from 'next/link';

interface ProductProps {
	product: Product;
}
const ProductCard = ({ product }: ProductProps) => {
	return (
		<Link href={`/${product.slug}`}>
			<div className="p-[var(--space)] border border-[var(--card-border)] rounded-[var(--radius)]">
				<h2 className="font-bold text-lg">{product.name}</h2>
				<div className="flex gap-[var(--space)]">
					<p>
						<span className="font-medium">Категорія:</span> {product.category}
					</p>
					<p>
						<span className="font-medium">Калорії:</span> {product.calories}
					</p>
					<p>
						<span className="font-medium">Білки:</span> {product.protein}
					</p>
					<p>
						<span className="font-medium">Жири:</span> {product.fat}
					</p>
					<p>
						<span className="font-medium">Вуглеводи:</span>{' '}
						{product.carbohydrates}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
