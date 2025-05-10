import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/db/prisma';

// Make sure to export the POST function directly
export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const category = formData.get('category') as string;
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

// Add a GET handler to make the endpoint respond to multiple methods
export async function GET() {
	return NextResponse.json(
		{ message: 'Please use POST method to create a product' },
		{ status: 405 },
	);
}
