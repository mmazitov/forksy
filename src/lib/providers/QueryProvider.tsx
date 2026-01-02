import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
	children: React.ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60 * 5, // 5 minutes
						gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
					},
				},
			}),
		[],
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default QueryProvider;
