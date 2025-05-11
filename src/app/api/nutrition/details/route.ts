import { NextRequest, NextResponse } from 'next/server';

import { createFatSecretRequest } from '@/lib/utils/fatsecret';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const foodId = searchParams.get('id');

	console.log('Details API called for food ID:', foodId);

	if (!foodId) {
		console.log('No food ID provided');
		return NextResponse.json({ error: 'Food ID is required' }, { status: 400 });
	}

	try {
		const requestUrl = createFatSecretRequest('food.get.v2', {
			food_id: foodId,
		});

		console.log('Making request to FatSecret API:', requestUrl);

		const response = await fetch(requestUrl);
		console.log('FatSecret API response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('FatSecret API error response:', errorText);
			throw new Error(`Failed to fetch food details: ${errorText}`);
		}

		const data = await response.json();
		console.log('FatSecret API response data:', JSON.stringify(data, null, 2));

		return NextResponse.json(data);
	} catch (error) {
		console.error('Food details error:', error);
		return NextResponse.json(
			{
				error: 'Failed to fetch food details',
				details: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 },
		);
	}
}
