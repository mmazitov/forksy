'use server';

import { getServerSession } from 'next-auth';

import PageHeader from '@/components/heading/PageHeader';
import ProductCard from '@/components/ProductCard';
import Filter from '@/components/ui/Filter';
import prisma from '@/lib/db/prisma';
import { authOptions } from '@/lib/utils/authOptions';

const generateMetadata = () => ({
	title: 'Список продуктів',
	description: 'Список продуктів',
});

const ProductsList = async () => {
	const session = await getServerSession(authOptions);
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
			<div className="gap-[var(--space)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} session={session} />
				))}
			</div>
		</section>
	);
};

export default ProductsList;
export { generateMetadata };
