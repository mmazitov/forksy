import { gql } from '@apollo/client';
import type { DocumentNode } from '@apollo/client/core';
import { useMutation, useQuery } from '@apollo/client/react';
import * as Types from './generated/api';

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
	__typename?: 'Query';
	me: {
		__typename?: 'User';
		id: string;
		email: string;
		name: string | null;
	} | null;
};

export type RegisterMutationVariables = Types.Exact<{
	email: Types.Scalars['String']['input'];
	password: Types.Scalars['String']['input'];
	name: Types.Scalars['String']['input'];
}>;

export type RegisterMutation = {
	__typename?: 'Mutation';
	register: {
		__typename?: 'AuthPayload';
		token: string;
		user: {
			__typename?: 'User';
			id: string;
			email: string;
			name: string | null;
		};
	};
};

export type LoginMutationVariables = Types.Exact<{
	email: Types.Scalars['String']['input'];
	password: Types.Scalars['String']['input'];
}>;

export type LoginMutation = {
	__typename?: 'Mutation';
	login: {
		__typename?: 'AuthPayload';
		token: string;
		user: {
			__typename?: 'User';
			id: string;
			email: string;
			name: string | null;
		};
	};
};

export const ME_QUERY = gql`
	query Me {
		me {
			id
			email
			name
		}
	}
` as unknown as DocumentNode;

export const REGISTER_MUTATION = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			token
			user {
				id
				email
				name
			}
		}
	}
` as unknown as DocumentNode;

export const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				email
				name
			}
		}
	}
` as unknown as DocumentNode;

export function useMeQuery(options?: any) {
	const result = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, options);
	console.log('[GraphQL] useMeQuery - skip:', options?.skip, 'loading:', result.loading, 'data:', result.data?.me);
	return result;
}

export function useRegisterMutation(options?: any) {
	return useMutation<RegisterMutation, RegisterMutationVariables>(
		REGISTER_MUTATION,
		options,
	);
}

export function useLoginMutation(options?: any) {
	return useMutation<LoginMutation, LoginMutationVariables>(
		LOGIN_MUTATION,
		options,
	);
}
