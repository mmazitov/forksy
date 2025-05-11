import PageHeader from '@/components/heading/PageHeader';
import ProductCard from '@/components/ProductCard';
import Filter from '@/components/ui/Filter';
import prisma from '@/lib/db/prisma';
const page = async () => {
	const products = await prisma.product.findMany({
		orderBy: {
			id: 'desc',
		},
	});
	return (
		<section>
			<PageHeader pageTitle="Список продуктів">
				<div className="flex items-center gap-0.5">
					<span>Фільтр:</span>
					<Filter />
				</div>
			</PageHeader>
			<div className="flex flex-col gap-[var(--space)]">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</section>
	);
};

export default page;
