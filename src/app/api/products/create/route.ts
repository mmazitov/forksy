import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db/prisma';

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const category = formData.get('category') as string;
		const imageUrl = formData.get('imageUrl') as string;
		const protein = Number(formData.get('protein'));
		const carbohydrates = Number(formData.get('carbohydrates'));
		const fat = Number(formData.get('fat'));
		const fiber = Number(formData.get('fiber'));

		// Validate required fields
		if (!name || !category) {
			return NextResponse.json(
				{ error: 'Name and category are required' },
				{ status: 400 },
			);
		}

		// Create product in database
		const product = await prisma.product.create({
			data: {
				name,
				category,
				imageUrl:
					imageUrl || 'https://via.placeholder.com/400x400?text=No+Image',
				protein,
				carbohydrates,
				fat,
				fiber,
				slug: name.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
			},
		});

		return NextResponse.json(
			{ message: 'Product created successfully', product },
			{ status: 201 },
		);
	} catch (error) {
		console.error('Error adding product:', error);
		return NextResponse.json(
			{ error: 'Failed to add product' },
			{ status: 500 },
		);
	}
}
