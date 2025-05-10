import { Product } from '@prisma/client';
import Link from 'next/link';

interface ProductProps {
	product: Product;
}
const ProductCard = ({ product }: ProductProps) => {
	return (
		<Link href={`/products/${product.slug}`}>
			<div className="">
				<h2>{product.name}</h2>
				<div>
					<p>category: {product.category}</p>
					<p>protein: {product.protein}</p>
					<p>carbohydrates: {product.carbohydrates}</p>
					<p>fat: {product.fat}</p>
					<p>fiber: {product.fiber}</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
