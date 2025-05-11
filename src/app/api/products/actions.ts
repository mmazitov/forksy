'use server';

import prisma from '@/lib/db/prisma';

export async function createProduct(formData: FormData) {
	try {
		const name = formData.get('name') as string;
		const category = formData.get('category') as string;
		const protein = Number(formData.get('protein'));
		const carbohydrates = Number(formData.get('carbohydrates'));
		const fat = Number(formData.get('fat'));
		const calories = Number(formData.get('calories'));

		if (!name || !category) {
			throw new Error('Name and category are required');
		}

		const product = await prisma.product.create({
			data: {
				name,
				category,
				protein,
				carbohydrates,
				fat,
				calories,
				slug: name.toLowerCase().replace(/\s+/g, '-'),
			},
		});

		return { success: true, product };
	} catch (error) {
		console.error('Error creating product:', error);
		return { success: false, error: 'Failed to create product' };
	}
}
