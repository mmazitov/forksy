import { NextRequest, NextResponse } from 'next/server';

import { getFoodDetails } from '@/lib/utils/spoonacular';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get('id');

	if (!id) {
		return NextResponse.json(
			{ error: "ID продукту обов'язковий" },
			{ status: 400 },
		);
	}

	try {
		const data = await getFoodDetails(Number(id));
		return NextResponse.json(data);
	} catch (error) {
		console.error('Product details error:', error);
		return NextResponse.json(
			{ error: 'Помилка при отриманні деталей продукту' },
			{ status: 500 },
		);
	}
}
