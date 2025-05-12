import { NextRequest, NextResponse } from 'next/server';

import { searchFood } from '@/lib/utils/spoonacular';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('q');

	if (!query) {
		return NextResponse.json(
			{ error: "Пошуковий запит обов'язковий" },
			{ status: 400 },
		);
	}

	try {
		const data = await searchFood(query);
		return NextResponse.json(data);
	} catch (error) {
		console.error('Search API error:', error);
		return NextResponse.json(
			{ error: 'Помилка при пошуку продуктів' },
			{ status: 500 },
		);
	}
}
