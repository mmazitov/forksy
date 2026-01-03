import type * as Types from '@/types/api';

import type { DocumentNode } from 'graphql';
import type * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
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
			email?: string | null;
			name?: string | null;
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
			email?: string | null;
			name?: string | null;
		};
	};
};

export const RegisterDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Register' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'email' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' },
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'password' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' },
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'register' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'email' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'email' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'password' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'password' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'name' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'name' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'token' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useRegisterMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		RegisterMutation,
		RegisterMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		RegisterMutation,
		RegisterMutationVariables
	>(RegisterDocument, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export const LoginDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'Login' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'email' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' },
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'password' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'NamedType',
							name: { kind: 'Name', value: 'String' },
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'login' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'email' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'email' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'password' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'password' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'token' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'user' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useLoginMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		LoginMutation,
		LoginMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
		LoginDocument,
		options,
	);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
