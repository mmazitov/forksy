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
		const image = formData.get('image') as string; // Change back to image

		// Validate required fields
		if (!name?.trim()) {
			return { success: false, error: 'Name is required' };
		}
		if (!category?.trim()) {
			return { success: false, error: 'Category is required' };
		}

		// Validate numeric fields
		if (isNaN(protein) || protein < 0) {
			return { success: false, error: 'Invalid protein value' };
		}
		if (isNaN(carbohydrates) || carbohydrates < 0) {
			return { success: false, error: 'Invalid carbohydrates value' };
		}
		if (isNaN(fat) || fat < 0) {
			return { success: false, error: 'Invalid fat value' };
		}
		if (isNaN(calories) || calories < 0) {
			return { success: false, error: 'Invalid calories value' };
		}

		try {
			// Log the data we're trying to create
			console.log('Attempting to create product with data:', {
				name: name.trim(),
				category: category.trim(),
				protein,
				carbohydrates,
				fat,
				calories,
				image: image?.trim() || '', // Change back to image
				slug: name.toLowerCase().trim().replace(/\s+/g, '-'),
			});

			const product = await prisma.product.create({
				data: {
					name: name.trim(),
					category: category.trim(),
					protein: Number(protein) || 0,
					carbohydrates: Number(carbohydrates) || 0,
					fat: Number(fat) || 0,
					calories: Number(calories) || 0,
					image: image?.trim() || '',
					slug: name.toLowerCase().trim().replace(/\s+/g, '-'),
				},
			});

			return { success: true, product };
		} catch (error) {
			console.error('Database error:', error);
			return {
				success: false,
				error:
					error instanceof Error ? error.message : 'Failed to create product',
			};
		}
	} catch (error: any) {
		console.error('Error creating product:', error);
		return {
			success: false,
			error:
				error.message ||
				'An unexpected error occurred while creating the product',
		};
	}
}

export async function updateProduct(formData: FormData) {
	try {
		const id = formData.get('id') as string;
		const name = formData.get('name') as string;
		const category = formData.get('category') as string;
		const protein = Number(formData.get('protein'));
		const carbohydrates = Number(formData.get('carbohydrates'));
		const fat = Number(formData.get('fat'));
		const calories = Number(formData.get('calories'));

		if (!id) {
			return { success: false, error: 'ID is required' };
		}

		// Validate other fields (reuse existing validation logic)
		if (!name?.trim()) {
			return { success: false, error: 'Name is required' };
		}
		if (!category?.trim()) {
			return { success: false, error: 'Category is required' };
		}
		if (isNaN(protein) || protein < 0) {
			return { success: false, error: 'Invalid protein value' };
		}
		if (isNaN(carbohydrates) || carbohydrates < 0) {
			return { success: false, error: 'Invalid carbohydrates value' };
		}
		if (isNaN(fat) || fat < 0) {
			return { success: false, error: 'Invalid fat value' };
		}
		if (isNaN(calories) || calories < 0) {
			return { success: false, error: 'Invalid calories value' };
		}

		const product = await prisma.product.update({
			where: { id },
			data: {
				name: name.trim(),
				category: category.trim(),
				protein: Number(protein) || 0,
				carbohydrates: Number(carbohydrates) || 0,
				fat: Number(fat) || 0,
				calories: Number(calories) || 0,
				slug: name.toLowerCase().trim().replace(/\s+/g, '-'),
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
}
