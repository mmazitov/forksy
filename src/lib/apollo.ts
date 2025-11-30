import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const getGraphQLUrl = () => {
	// For production, use the Vercel API route
	if (
		typeof window === 'undefined' ||
		!window.location.hostname.includes('localhost')
	) {
		return '/api/graphql';
	}
	// For development, use the local server
	return 'http://localhost:4000';
};

const httpLink = createHttpLink({
	uri: getGraphQLUrl(),
});

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(({ message, locations, path }: any) => {
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			);
		});
	}
	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
		// Handle connection refused gracefully
		if ((networkError as any).message?.includes('Failed to fetch')) {
			console.warn("GraphQL server is not available. Check if it's running.");
		}
	}
});

const authLink = setContext((_, { headers }) => {
	// Ensure we're on the client side
	if (typeof window === 'undefined') {
		return { headers };
	}

	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	console.log('[authLink] Token from localStorage:', !!token ? token.substring(0, 20) + '...' : 'none');
	
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const client = new ApolloClient({
	link: errorLink.concat(authLink).concat(httpLink),
	cache: new InMemoryCache(),
});
