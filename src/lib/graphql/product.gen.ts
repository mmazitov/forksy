import type * as Types from '@/types/api';

import type { DocumentNode } from 'graphql';
import type * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type ProductFieldsFragment = {
	__typename?: 'Product';
	id: string;
	name: string;
	category?: string | null;
	imageUrl?: string | null;
	calories?: number | null;
	fat?: number | null;
	carbs?: number | null;
	protein?: number | null;
	description?: string | null;
	userId: string;
	isFavorite?: boolean | null;
	createdAt: string;
	updatedAt: string;
};

export type ProductQueryVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
}>;

export type ProductQuery = {
	__typename?: 'Query';
	product?: ({ __typename?: 'Product' } & ProductFieldsFragment) | null;
};

export type ProductsQueryVariables = Types.Exact<{
	category?: Types.InputMaybe<Types.Scalars['String']['input']>;
	search?: Types.InputMaybe<Types.Scalars['String']['input']>;
	limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type ProductsQuery = {
	__typename?: 'Query';
	products: Array<{ __typename?: 'Product' } & ProductFieldsFragment>;
};

export type FavoriteProductsQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type FavoriteProductsQuery = {
	__typename?: 'Query';
	favoriteProducts: Array<{ __typename?: 'Product' } & ProductFieldsFragment>;
};

export type CreateProductMutationVariables = Types.Exact<{
	name: Types.Scalars['String']['input'];
	category?: Types.InputMaybe<Types.Scalars['String']['input']>;
	imageUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
	calories?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	fat?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	carbs?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	protein?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type CreateProductMutation = {
	__typename?: 'Mutation';
	createProduct: { __typename?: 'Product' } & ProductFieldsFragment;
};

export type UpdateProductMutationVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
	name?: Types.InputMaybe<Types.Scalars['String']['input']>;
	category?: Types.InputMaybe<Types.Scalars['String']['input']>;
	imageUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
	calories?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	fat?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	carbs?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	protein?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;

export type UpdateProductMutation = {
	__typename?: 'Mutation';
	updateProduct: { __typename?: 'Product' } & ProductFieldsFragment;
};

export type DeleteProductMutationVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
}>;

export type DeleteProductMutation = {
	__typename?: 'Mutation';
	deleteProduct: { __typename?: 'Product'; id: string };
};

export type AddToFavoritesProductMutationVariables = Types.Exact<{
	productId: Types.Scalars['ID']['input'];
}>;

export type AddToFavoritesProductMutation = {
	__typename?: 'Mutation';
	addToFavoritesProduct: {
		__typename?: 'User';
		id: string;
		name?: string | null;
	};
};

export type RemoveFromFavoritesProductMutationVariables = Types.Exact<{
	productId: Types.Scalars['ID']['input'];
}>;

export type RemoveFromFavoritesProductMutation = {
	__typename?: 'Mutation';
	removeFromFavoritesProduct: {
		__typename?: 'User';
		id: string;
		name?: string | null;
	};
};

export const ProductFieldsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Product' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export const ProductDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Product' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'product' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'ProductFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Product' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useProductQuery(
	baseOptions: ApolloReactHooks.QueryHookOptions<
		ProductQuery,
		ProductQueryVariables
	> &
		({ variables: ProductQueryVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<ProductQuery, ProductQueryVariables>(
		ProductDocument,
		options,
	);
}
export function useProductLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		ProductQuery,
		ProductQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<ProductQuery, ProductQueryVariables>(
		ProductDocument,
		options,
	);
}
// @ts-ignore
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export const ProductsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Products' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'category' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'search' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'limit' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'offset' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'products' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'category' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'category' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'search' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'search' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'limit' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'offset' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'offset' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'ProductFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Product' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useProductsQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		ProductsQuery,
		ProductsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<ProductsQuery, ProductsQueryVariables>(
		ProductsDocument,
		options,
	);
}
export function useProductsLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		ProductsQuery,
		ProductsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
		ProductsDocument,
		options,
	);
}
// @ts-ignore
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<
	typeof useProductsLazyQuery
>;
export const FavoriteProductsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'FavoriteProducts' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'favoriteProducts' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'ProductFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Product' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useFavoriteProductsQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		FavoriteProductsQuery,
		FavoriteProductsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<
		FavoriteProductsQuery,
		FavoriteProductsQueryVariables
	>(FavoriteProductsDocument, options);
}
export function useFavoriteProductsLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		FavoriteProductsQuery,
		FavoriteProductsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<
		FavoriteProductsQuery,
		FavoriteProductsQueryVariables
	>(FavoriteProductsDocument, options);
}
// @ts-ignore
export type FavoriteProductsQueryHookResult = ReturnType<
	typeof useFavoriteProductsQuery
>;
export type FavoriteProductsLazyQueryHookResult = ReturnType<
	typeof useFavoriteProductsLazyQuery
>;
export const CreateProductDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'CreateProduct' },
			variableDefinitions: [
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
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'category' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'imageUrl' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'calories' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'fat' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'carbs' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'protein' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'description' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'createProduct' },
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
								name: { kind: 'Name', value: 'category' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'category' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'imageUrl' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'imageUrl' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'calories' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'calories' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'fat' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'fat' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'carbs' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'carbs' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'protein' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'protein' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'description' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'description' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'ProductFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Product' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useCreateProductMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		CreateProductMutation,
		CreateProductMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		CreateProductMutation,
		CreateProductMutationVariables
	>(CreateProductDocument, options);
}
export type CreateProductMutationHookResult = ReturnType<
	typeof useCreateProductMutation
>;
export const UpdateProductDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateProduct' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
					},
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'name' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'category' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'imageUrl' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'calories' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'fat' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'carbs' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'protein' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'description' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'updateProduct' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
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
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'category' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'category' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'imageUrl' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'imageUrl' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'calories' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'calories' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'fat' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'fat' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'carbs' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'carbs' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'protein' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'protein' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'description' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'description' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'ProductFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'ProductFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Product' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useUpdateProductMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		UpdateProductMutation,
		UpdateProductMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		UpdateProductMutation,
		UpdateProductMutationVariables
	>(UpdateProductDocument, options);
}
export type UpdateProductMutationHookResult = ReturnType<
	typeof useUpdateProductMutation
>;
export const DeleteProductDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteProduct' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'deleteProduct' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useDeleteProductMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		DeleteProductMutation,
		DeleteProductMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		DeleteProductMutation,
		DeleteProductMutationVariables
	>(DeleteProductDocument, options);
}
export type DeleteProductMutationHookResult = ReturnType<
	typeof useDeleteProductMutation
>;
export const AddToFavoritesProductDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddToFavoritesProduct' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'productId' },
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'addToFavoritesProduct' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'productId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'productId' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useAddToFavoritesProductMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		AddToFavoritesProductMutation,
		AddToFavoritesProductMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		AddToFavoritesProductMutation,
		AddToFavoritesProductMutationVariables
	>(AddToFavoritesProductDocument, options);
}
export type AddToFavoritesProductMutationHookResult = ReturnType<
	typeof useAddToFavoritesProductMutation
>;
export const RemoveFromFavoritesProductDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'RemoveFromFavoritesProduct' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'productId' },
					},
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'removeFromFavoritesProduct' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'productId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'productId' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useRemoveFromFavoritesProductMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		RemoveFromFavoritesProductMutation,
		RemoveFromFavoritesProductMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		RemoveFromFavoritesProductMutation,
		RemoveFromFavoritesProductMutationVariables
	>(RemoveFromFavoritesProductDocument, options);
}
export type RemoveFromFavoritesProductMutationHookResult = ReturnType<
	typeof useRemoveFromFavoritesProductMutation
>;
