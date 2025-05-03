import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import prisma from '@/lib/db/prisma';

interface ProductPageProps {
	params: Promise<{
		id: string;
	}>;
}

const getProduct = cache(async (id: string) => {
	const product = await prisma.product.findUnique({ where: { id } });
	if (!product) notFound();
	return product;
});

const generateMetadata = async ({ params }: ProductPageProps) => {
	const { id } = await params; // Await params before destructuring
	const product = await getProduct(id);

	return {
		title: `${product.name} - Forksy`,
		openGraph: {
			images: [{ url: product.imageUrl }],
		},
	};
};

const ProductPage = async ({ params }: ProductPageProps) => {
	const { id } = await params; // Await params before destructuring
	const product = await getProduct(id);

	return (
		<div className="flex lg:flex-row flex-col lg:items-center gap-4">
			<Image
				src={product.imageUrl}
				alt={product.name}
				width={500}
				height={500}
				className="rounded-lg"
				priority
			/>

			<div>
				<h1 className="font-bold text-5xl">{product.name}</h1>
				<p className="py-6">{product.category}</p>
			</div>
		</div>
	);
};

export default ProductPage;
export { generateMetadata };
