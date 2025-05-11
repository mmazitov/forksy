import { NextRequest, NextResponse } from 'next/server';

import { createFatSecretRequest } from '@/lib/utils/fatsecret';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('q');
	const page = searchParams.get('page') || '0';

	console.log('Search API called with query:', query);

	if (!query) {
		console.log('No search query provided');
		return NextResponse.json(
			{ error: 'Search query is required' },
			{ status: 400 },
		);
	}

	try {
		const requestUrl = createFatSecretRequest('foods.search', {
			search_expression: query,
			page_number: page,
		});

		console.log('Making request to FatSecret API:', requestUrl);

		const response = await fetch(requestUrl);
		console.log('FatSecret API response status:', response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error('FatSecret API error response:', errorText);
			throw new Error(`Failed to fetch from FatSecret API: ${errorText}`);
		}

		const data = await response.json();
		console.log('FatSecret API response data:', JSON.stringify(data, null, 2));

		return NextResponse.json(data);
	} catch (error) {
		console.error('Detailed FatSecret API error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch nutrition data', details: error.message },
			{ status: 500 },
		);
	}
}
