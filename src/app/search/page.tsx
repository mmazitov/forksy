'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import SearchBar from '@/components/search/SearchBar';

import { GoogleSearchItem, GoogleSearchResult } from '@/lib/types/google';

const SearchPage = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get('q');

	const [results, setResults] = useState<GoogleSearchItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [totalResults, setTotalResults] = useState<string>('0');
	const [searchTime, setSearchTime] = useState<string>('0');

	useEffect(() => {
		const fetchResults = async () => {
			if (!query) return;

			setIsLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`/api/search?q=${encodeURIComponent(query)}`,
				);

				if (!response.ok) {
					throw new Error('Failed to fetch search results');
				}

				const data = (await response.json()) as GoogleSearchResult;
				setResults(data.items || []);
				setTotalResults(data.searchInformation?.formattedTotalResults || '0');
				setSearchTime(data.searchInformation?.formattedSearchTime || '0');
			} catch (err) {
				console.error('Search error:', err);
				setError('An error occurred while fetching search results');
				setResults([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchResults();
	}, [query]);

	return (
		<div className="py-8 container">
			<div className="mb-8">
				<h1 className="mb-4 font-bold text-2xl">Поиск</h1>
				<SearchBar />
			</div>

			{query && (
				<div className="mb-4 text-gray-600 text-sm">
					{!isLoading && (
						<p>
							Найдено {totalResults} результатов ({searchTime} сек.) по запросу:{' '}
							<strong>{query}</strong>
						</p>
					)}
				</div>
			)}

			{isLoading && (
				<div className="flex justify-center items-center py-10">
					<div className="border-[var(--main-color)] border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
				</div>
			)}

			{error && (
				<div className="bg-red-100 mb-4 px-4 py-3 border border-red-400 rounded text-red-700">
					<p>{error}</p>
				</div>
			)}

			{!isLoading && results.length === 0 && !error && query && (
				<div className="py-10 text-center">
					<p className="text-lg">По запросу {query} ничего не найдено</p>
					<p className="mt-2 text-sm">Попробуйте изменить поисковый запрос</p>
				</div>
			)}

			<div className="space-y-6">
				{results.map((result) => (
					<div
						key={result.cacheId || result.link}
						className="hover:shadow-md p-4 border border-gray-200 rounded-lg transition-shadow"
					>
						<div className="flex items-start">
							{result.pagemap?.cse_image?.[0]?.src && (
								<div className="flex-shrink-0 mr-4">
									<Image
										src={result.pagemap.cse_image[0].src}
										alt={result.title}
										width={80}
										height={80}
										className="rounded-md object-cover"
									/>
								</div>
							)}
							<div>
								<Link
									href={result.link}
									target="_blank"
									rel="noopener noreferrer"
									className="font-medium text-[var(--main-color)] text-lg hover:underline"
								>
									{result.title}
								</Link>
								<p className="mt-1 text-green-600 text-sm">
									{result.displayLink}
								</p>
								<p className="mt-2 text-gray-700 text-sm">{result.snippet}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchPage;
