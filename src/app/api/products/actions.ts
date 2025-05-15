'use server';

import { z } from 'zod';

import prisma from '@/lib/db/prisma';
import { productSchema } from '@/lib/utils/schemas/validate';

type ProductInput = z.infer<typeof productSchema>;

export const createProduct = async (data: ProductInput) => {
	try {
		const { name, category, calories, protein, fat, carbohydrates, image } =
			data;

		const product = await prisma.product.create({
			data: {
				name,
				category,
				image: image || '',
				slug: name.toLowerCase().trim().replace(/\s+/g, '-'),
				calories: calories ?? 0,
				protein: protein ?? 0,
				fat: fat ?? 0,
				carbohydrates: carbohydrates ?? 0,
			},
		});

		return { success: true, product };
	} catch (error) {
		console.error('Error creating product:', error);
		return {
			success: false,
			error: 'An unexpected error occurred while creating the product',
		};
	}
};

export const updateProduct = async (formData: FormData) => {
	try {
		const id = formData.get('id') as string;
		if (!id) return { success: false, error: 'ID is required' };

		const inputData = {
			name: formData.get('name') as string,
			category: formData.get('category') as string,
			protein: Number(formData.get('protein') ?? 0),
			carbohydrates: Number(formData.get('carbohydrates') ?? 0),
			fat: Number(formData.get('fat') ?? 0),
			calories: Number(formData.get('calories') ?? 0),
			image: formData.get('image') as string,
		};

		const validationResult = productSchema.safeParse(inputData);

		if (!validationResult.success) {
			return {
				success: false,
				error: validationResult.error.errors[0]?.message || 'Validation error',
			};
		}

		const validatedData = validationResult.data;

		const product = await prisma.product.update({
			where: { id },
			data: {
				...validatedData,
				image: validatedData.image || '',
				slug: validatedData.name.toLowerCase().trim().replace(/\s+/g, '-'),
				calories: validatedData.calories ?? 0,
				protein: validatedData.protein ?? 0,
				fat: validatedData.fat ?? 0,
				carbohydrates: validatedData.carbohydrates ?? 0,
			},
		});

		return { success: true, product };
	} catch (error) {
		console.error('Error updating product:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to update product',
		};
	}
};

export const checkProductExist = async (name: string) => {
	try {
		const product = await prisma.product.findFirst({
			where: {
				name: {
					equals: name,
					mode: 'insensitive',
				},
			},
		});
		return { success: true, exists: !!product };
	} catch (error) {
		console.log('Error checking product existence:', error);
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Failed to check product existence',
		};
	}
};
