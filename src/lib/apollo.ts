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
	fetchOptions: {
		mode: 'cors',
	},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorLink = onError(({ graphQLErrors, networkError }: any) => {
	if (graphQLErrors) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		graphQLErrors.forEach((error: any) => {
			console.error(
				`[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
			);
		});
	}
	if (networkError) {
		console.error(`[Network error]: ${networkError}`);
		if (networkError.message?.includes('Failed to fetch')) {
			console.warn(
				'GraphQL server is not available. Check your VITE_API_URL environment variable.',
			);
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

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				favoriteProducts: {
					read() {
						return undefined;
					},
					merge: false,
				},
				favoriteDishes: {
					read() {
						return undefined;
					},
					merge: false,
				},
			},
		},
		Product: {
			fields: {
				isFavorite: {
					read() {
						return undefined;
					},
					merge: false,
				},
			},
		},
		Dish: {
			fields: {
				isFavorite: {
					read() {
						return undefined;
					},
					merge: false,
				},
			},
		},
	},
});

export const client = new ApolloClient({
	link: errorLink.concat(authLink).concat(httpLink),
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
