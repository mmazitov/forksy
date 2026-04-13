import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import type { GraphQLError } from 'graphql';
import { Observable } from '@apollo/client/utilities';

import { refreshAccessToken } from './refreshToken';

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

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const errorLink = onError((errorResponse) => {
	const { graphQLErrors, networkError, operation, forward } = errorResponse as {
		graphQLErrors?: readonly GraphQLError[];
		networkError?: Error | null;
		operation: unknown;
		forward: (operation: unknown) => unknown;
	};

	if (graphQLErrors) {
		for (const error of graphQLErrors) {
			const isAuthError =
				error.extensions?.code === 'UNAUTHENTICATED' ||
				error.message?.toLowerCase().includes('unauthenticated') ||
				error.message?.toLowerCase().includes('unauthorized');

			if (isAuthError) {
				if (!isRefreshing) {
					isRefreshing = true;
					refreshPromise = refreshAccessToken().finally(() => {
						isRefreshing = false;
						refreshPromise = null;
					});
				}

				return new Observable((observer) => {
					(refreshPromise || Promise.resolve(false))
						.then((success) => {
							if (success) {
								if (import.meta.env.DEV) {
									console.log('[Apollo] Token refreshed, retrying request');
								}
								const subscriber = {
									next: observer.next.bind(observer),
									error: observer.error.bind(observer),
									complete: observer.complete.bind(observer),
								};
								(
									forward(operation) as {
										subscribe: (subscriber: unknown) => void;
									}
								).subscribe(subscriber);
							} else {
								if (import.meta.env.DEV) {
									console.warn('[Apollo] Token refresh failed, logging out');
								}
								onUnauthenticated?.();
								observer.error(new Error('Token refresh failed'));
							}
						})
						.catch((err) => {
							observer.error(err);
						});
				});
			}

			if (import.meta.env.DEV) {
				console.error(
					`[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`,
				);
			}
		}
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
