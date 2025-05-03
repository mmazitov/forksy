import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma';

const Home = async () => {
	const products = await prisma.product.findMany({
		orderBy: {
			id: 'desc',
		},
	});
	return (
		<main className="flex flex-col justify-between items-center p-24 min-h-screen">
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</main>
	);
};

export default Home;
