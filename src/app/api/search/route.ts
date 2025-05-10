import { NextRequest, NextResponse } from 'next/server';

import { GoogleSearchResult } from '@/@types/types';
import { env } from '@/lib/utils/schemas/env.zod';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('q');

	if (!query) {
		return NextResponse.json(
			{ error: 'Search query is required' },
			{ status: 400 },
		);
	}

	const apiKey = env.GOOGLE_API_KEY;
	const cx = env.GOOGLE_CSE_ID;

	try {
		const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
		const response = await fetch(url);

		if (!response.ok) {
			const errorData = await response.json();
			console.error('Google API error:', errorData);
			return NextResponse.json(
				{ error: 'Failed to fetch search results' },
				{ status: response.status },
			);
		}

		const data = (await response.json()) as GoogleSearchResult;

		return NextResponse.json(data);
	} catch (error) {
		console.error('Search API error:', error);
		return NextResponse.json(
			{ error: 'An error occurred while fetching search results' },
			{ status: 500 },
		);
	}
}
