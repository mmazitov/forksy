import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const getGraphQLUrl = () => {
	// Use environment variable or fallback to localhost
	return import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';
};

const httpLink = createHttpLink({
	uri: getGraphQLUrl(),
	credentials: 'include', // Important for cookies/sessions
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
		if ((networkError as any).message?.includes('Failed to fetch')) {
			console.warn('GraphQL server is not available. Check your VITE_API_URL environment variable.');
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
