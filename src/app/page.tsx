import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/search/SearchBar';
import prisma from '@/lib/db/prisma';

const Home = async () => {
	const products = await prisma.product.findMany({
		orderBy: {
			id: 'desc',
		},
	});
	return (
		<main className="flex flex-col justify-between items-center p-24 min-h-screen">
			<div className="flex justify-center mb-10 w-full">
				<SearchBar />
			</div>

			<div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</main>
	);
};

export default Home;
