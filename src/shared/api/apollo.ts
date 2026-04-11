import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';

const getGraphQLUrl = () => {
	// Use environment variable or fallback to localhost
	return import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql';
};

// Module-level handler — set by useAuthState on mount
let onUnauthenticated: (() => void) | null = null;

export const setUnauthenticatedHandler = (handler: (() => void) | null) => {
	onUnauthenticated = handler;
};

const httpLink = createHttpLink({
	uri: getGraphQLUrl(),
	credentials: 'include',
	fetchOptions: {
		mode: 'cors',
	},
});

const errorLink = onError((errorResponse) => {
	const { graphQLErrors, networkError } = errorResponse as {
		graphQLErrors?: readonly GraphQLError[];
		networkError?: Error | null;
	};

	if (graphQLErrors) {
		let didLogout = false;
		graphQLErrors.forEach((error) => {
			if (
				!didLogout &&
				(error.extensions?.code === 'UNAUTHENTICATED' ||
					error.message?.toLowerCase().includes('unauthenticated') ||
					error.message?.toLowerCase().includes('unauthorized'))
			) {
				didLogout = true;
				onUnauthenticated?.();
			}

			if (import.meta.env.DEV) {
				console.error(
					`[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
				);
			}
		});
	}

	if (import.meta.env.DEV && networkError) {
		console.error(`[Network error]: ${networkError}`);
		if (
			'message' in networkError &&
			networkError.message?.includes('Failed to fetch')
		) {
			console.warn(
				'GraphQL server is not available. Check your VITE_API_URL environment variable.',
			);
		}
	}
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
	link: errorLink.concat(httpLink),
	cache,
	defaultOptions: {
		query: {
			fetchPolicy: 'cache-first',
		},
		watchQuery: {
			fetchPolicy: 'cache-first',
		},
	},
});
