import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

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
					merge: false,
				},
				favoriteDishes: {
					merge: false,
				},
			},
		},
		Product: {
			fields: {
				isFavorite: {
					merge: false,
				},
			},
		},
		Dish: {
			fields: {
				isFavorite: {
					merge: false,
				},
			},
		},
	},
	// Более агрессивная сборка мусора
	possibleTypes: {},
	resultCaching: true,
});

// Persist cache to localStorage for offline support
if (typeof window !== 'undefined') {
	persistCache({
		cache,
		storage: new LocalStorageWrapper(window.localStorage),
		maxSize: 5242880, // 5MB
		debug: import.meta.env.DEV,
	}).catch((error) => {
		console.error('[Apollo] Cache persistence error:', error);
	});
}

export const client = new ApolloClient({
	link: errorLink.concat(authLink).concat(httpLink),
	cache,
});
