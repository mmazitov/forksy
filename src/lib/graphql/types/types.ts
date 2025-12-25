import type * as Types from './api';

import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
	__typename?: 'Query';
	me?: {
		__typename?: 'User';
		id: string;
		email?: string | null;
		name?: string | null;
		avatar?: string | null;
		phone?: string | null;
		diet?: string | null;
		allergy: Array<string>;
		dislike: Array<string>;
		createdAt: string;
		updatedAt: string;
	} | null;
};

export type UpdateProfileMutationVariables = Types.Exact<{
	name?: Types.InputMaybe<Types.Scalars['String']['input']>;
	phone?: Types.InputMaybe<Types.Scalars['String']['input']>;
	avatar?: Types.InputMaybe<Types.Scalars['String']['input']>;
	diet?: Types.InputMaybe<Types.Scalars['String']['input']>;
	allergy?: Types.InputMaybe<
		Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']
	>;
	dislike?: Types.InputMaybe<
		Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']
	>;
}>;

export type UpdateProfileMutation = {
	__typename?: 'Mutation';
	updateProfile: {
		__typename?: 'User';
		id: string;
		email?: string | null;
		name?: string | null;
		avatar?: string | null;
		phone?: string | null;
		diet?: string | null;
		allergy: Array<string>;
		dislike: Array<string>;
		createdAt: string;
		updatedAt: string;
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
} as unknown as DocumentNode<
	Types.RegisterMutation,
	Types.RegisterMutationVariables
>;
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
} as unknown as DocumentNode<Types.LoginMutation, Types.LoginMutationVariables>;
export const MeDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Me' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'me' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'diet' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'allergy' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dislike' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<Types.MeQuery, Types.MeQueryVariables>;
export const UpdateProfileDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateProfile' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'phone' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'avatar' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'diet' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'allergy' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'String' },
							},
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'dislike' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'String' },
							},
						},
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'updateProfile' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'name' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'name' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'phone' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'phone' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'avatar' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'avatar' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'diet' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'diet' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'allergy' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'allergy' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'dislike' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'dislike' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'avatar' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'diet' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'allergy' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dislike' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<
	Types.UpdateProfileMutation,
	Types.UpdateProfileMutationVariables
>;

// Document aliases for hooks
export { RegisterDocument as Register };
export { LoginDocument as Login };
export { MeDocument as Me };
export { UpdateProfileDocument as UpdateProfile };
