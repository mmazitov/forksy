import type * as Types from '@/types/api';

import type { DocumentNode } from 'graphql';
import type * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type DishFieldsFragment = {
	__typename?: 'Dish';
	id: string;
	name: string;
	description?: string | null;
	imageUrl?: string | null;
	category?: string | null;
	prepTime?: number | null;
	servings?: number | null;
	calories?: number | null;
	protein?: number | null;
	fat?: number | null;
	carbs?: number | null;
	instructions: Array<string>;
	createdAt: string;
	updatedAt: string;
	userId: string;
	isFavorite?: boolean | null;
	ingredients: Array<{
		__typename?: 'Ingredient';
		name: string;
		amount: string;
	}>;
};

export type DishQueryVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
}>;

export type DishQuery = {
	__typename?: 'Query';
	dish?: ({ __typename?: 'Dish' } & DishFieldsFragment) | null;
};

export type DishesQueryVariables = Types.Exact<{
	category?: Types.InputMaybe<Types.Scalars['String']['input']>;
	search?: Types.InputMaybe<Types.Scalars['String']['input']>;
	limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type DishesQuery = {
	__typename?: 'Query';
	dishes: Array<{ __typename?: 'Dish' } & DishFieldsFragment>;
};

export type FavoriteDishesQueryVariables = Types.Exact<{
	[key: string]: never;
}>;

export type FavoriteDishesQuery = {
	__typename?: 'Query';
	favoriteDishes: Array<{ __typename?: 'Dish' } & DishFieldsFragment>;
};

export type CreateDishMutationVariables = Types.Exact<{
	name: Types.Scalars['String']['input'];
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
	imageUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
	category?: Types.InputMaybe<Types.Scalars['String']['input']>;
	prepTime?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	servings?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	calories?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	protein?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	fat?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	carbs?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	ingredients: Array<Types.IngredientInput> | Types.IngredientInput;
	instructions:
		| Array<Types.Scalars['String']['input']>
		| Types.Scalars['String']['input'];
}>;

export type CreateDishMutation = {
	__typename?: 'Mutation';
	createDish: { __typename?: 'Dish' } & DishFieldsFragment;
};

export type UpdateDishMutationVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
	name?: Types.InputMaybe<Types.Scalars['String']['input']>;
	description?: Types.InputMaybe<Types.Scalars['String']['input']>;
	imageUrl?: Types.InputMaybe<Types.Scalars['String']['input']>;
	category?: Types.InputMaybe<Types.Scalars['String']['input']>;
	prepTime?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	servings?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	calories?: Types.InputMaybe<Types.Scalars['Int']['input']>;
	protein?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	fat?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	carbs?: Types.InputMaybe<Types.Scalars['Float']['input']>;
	ingredients?: Types.InputMaybe<
		Array<Types.IngredientInput> | Types.IngredientInput
	>;
	instructions?: Types.InputMaybe<
		Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input']
	>;
}>;

export type UpdateDishMutation = {
	__typename?: 'Mutation';
	updateDish: { __typename?: 'Dish' } & DishFieldsFragment;
};

export type DeleteDishMutationVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
}>;

export type DeleteDishMutation = {
	__typename?: 'Mutation';
	deleteDish: { __typename?: 'Dish'; id: string };
};

export type AddToFavoritesDishMutationVariables = Types.Exact<{
	dishId: Types.Scalars['ID']['input'];
}>;

export type AddToFavoritesDishMutation = {
	__typename?: 'Mutation';
	addToFavoritesDish: { __typename?: 'User'; id: string; name?: string | null };
};

export type RemoveFromFavoritesDishMutationVariables = Types.Exact<{
	dishId: Types.Scalars['ID']['input'];
}>;

export type RemoveFromFavoritesDishMutation = {
	__typename?: 'Mutation';
	removeFromFavoritesDish: {
		__typename?: 'User';
		id: string;
		name?: string | null;
	};
};

export const DishFieldsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'DishFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Dish' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'prepTime' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'servings' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'ingredients' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
							],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export const DishDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Dish' },
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
						name: { kind: 'Name', value: 'dish' },
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
									name: { kind: 'Name', value: 'DishFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'DishFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Dish' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'prepTime' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'servings' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'ingredients' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
							],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useDishQuery(
	baseOptions: ApolloReactHooks.QueryHookOptions<
		DishQuery,
		DishQueryVariables
	> &
		({ variables: DishQueryVariables; skip?: boolean } | { skip: boolean }),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<DishQuery, DishQueryVariables>(
		DishDocument,
		options,
	);
}
export function useDishLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		DishQuery,
		DishQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<DishQuery, DishQueryVariables>(
		DishDocument,
		options,
	);
}
// @ts-ignore
export type DishQueryHookResult = ReturnType<typeof useDishQuery>;
export type DishLazyQueryHookResult = ReturnType<typeof useDishLazyQuery>;
export const DishesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'Dishes' },
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
						name: { kind: 'Name', value: 'dishes' },
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
									name: { kind: 'Name', value: 'DishFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'DishFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Dish' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'prepTime' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'servings' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'ingredients' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
							],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useDishesQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		DishesQuery,
		DishesQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<DishesQuery, DishesQueryVariables>(
		DishesDocument,
		options,
	);
}
export function useDishesLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		DishesQuery,
		DishesQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<DishesQuery, DishesQueryVariables>(
		DishesDocument,
		options,
	);
}
// @ts-ignore
export type DishesQueryHookResult = ReturnType<typeof useDishesQuery>;
export type DishesLazyQueryHookResult = ReturnType<typeof useDishesLazyQuery>;
export const FavoriteDishesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'FavoriteDishes' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'favoriteDishes' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'DishFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'DishFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Dish' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'prepTime' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'servings' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'ingredients' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
							],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useFavoriteDishesQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		FavoriteDishesQuery,
		FavoriteDishesQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<
		FavoriteDishesQuery,
		FavoriteDishesQueryVariables
	>(FavoriteDishesDocument, options);
}
export function useFavoriteDishesLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		FavoriteDishesQuery,
		FavoriteDishesQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<
		FavoriteDishesQuery,
		FavoriteDishesQueryVariables
	>(FavoriteDishesDocument, options);
}
// @ts-ignore
export type FavoriteDishesQueryHookResult = ReturnType<
	typeof useFavoriteDishesQuery
>;
export type FavoriteDishesLazyQueryHookResult = ReturnType<
	typeof useFavoriteDishesLazyQuery
>;
export const CreateDishDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'CreateDish' },
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
						name: { kind: 'Name', value: 'description' },
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
						name: { kind: 'Name', value: 'category' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'prepTime' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'servings' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
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
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'protein' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
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
						name: { kind: 'Name', value: 'ingredients' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'ListType',
							type: {
								kind: 'NonNullType',
								type: {
									kind: 'NamedType',
									name: { kind: 'Name', value: 'IngredientInput' },
								},
							},
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'instructions' },
					},
					type: {
						kind: 'NonNullType',
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
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'createDish' },
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
								name: { kind: 'Name', value: 'description' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'description' },
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
								name: { kind: 'Name', value: 'category' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'category' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'prepTime' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'prepTime' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'servings' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'servings' },
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
								name: { kind: 'Name', value: 'protein' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'protein' },
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
								name: { kind: 'Name', value: 'ingredients' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'ingredients' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'instructions' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'instructions' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'DishFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'DishFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Dish' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'prepTime' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'servings' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'ingredients' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
							],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useCreateDishMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		CreateDishMutation,
		CreateDishMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		CreateDishMutation,
		CreateDishMutationVariables
	>(CreateDishDocument, options);
}
export type CreateDishMutationHookResult = ReturnType<
	typeof useCreateDishMutation
>;
export const UpdateDishDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateDish' },
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
						name: { kind: 'Name', value: 'description' },
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
						name: { kind: 'Name', value: 'category' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'prepTime' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'servings' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
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
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'protein' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Float' } },
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
						name: { kind: 'Name', value: 'ingredients' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'IngredientInput' },
							},
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'instructions' },
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
						name: { kind: 'Name', value: 'updateDish' },
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
								name: { kind: 'Name', value: 'description' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'description' },
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
								name: { kind: 'Name', value: 'category' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'category' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'prepTime' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'prepTime' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'servings' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'servings' },
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
								name: { kind: 'Name', value: 'protein' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'protein' },
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
								name: { kind: 'Name', value: 'ingredients' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'ingredients' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'instructions' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'instructions' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'DishFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'DishFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'Dish' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'description' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'category' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'prepTime' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'servings' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'calories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'protein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'ingredients' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'amount' } },
							],
						},
					},
					{ kind: 'Field', name: { kind: 'Name', value: 'instructions' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'userId' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'isFavorite' } },
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useUpdateDishMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		UpdateDishMutation,
		UpdateDishMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		UpdateDishMutation,
		UpdateDishMutationVariables
	>(UpdateDishDocument, options);
}
export type UpdateDishMutationHookResult = ReturnType<
	typeof useUpdateDishMutation
>;
export const DeleteDishDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteDish' },
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
						name: { kind: 'Name', value: 'deleteDish' },
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
export function useDeleteDishMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		DeleteDishMutation,
		DeleteDishMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		DeleteDishMutation,
		DeleteDishMutationVariables
	>(DeleteDishDocument, options);
}
export type DeleteDishMutationHookResult = ReturnType<
	typeof useDeleteDishMutation
>;
export const AddToFavoritesDishDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddToFavoritesDish' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'dishId' },
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
						name: { kind: 'Name', value: 'addToFavoritesDish' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'dishId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'dishId' },
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
export function useAddToFavoritesDishMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		AddToFavoritesDishMutation,
		AddToFavoritesDishMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		AddToFavoritesDishMutation,
		AddToFavoritesDishMutationVariables
	>(AddToFavoritesDishDocument, options);
}
export type AddToFavoritesDishMutationHookResult = ReturnType<
	typeof useAddToFavoritesDishMutation
>;
export const RemoveFromFavoritesDishDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'RemoveFromFavoritesDish' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'dishId' },
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
						name: { kind: 'Name', value: 'removeFromFavoritesDish' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'dishId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'dishId' },
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
export function useRemoveFromFavoritesDishMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		RemoveFromFavoritesDishMutation,
		RemoveFromFavoritesDishMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		RemoveFromFavoritesDishMutation,
		RemoveFromFavoritesDishMutationVariables
	>(RemoveFromFavoritesDishDocument, options);
}
export type RemoveFromFavoritesDishMutationHookResult = ReturnType<
	typeof useRemoveFromFavoritesDishMutation
>;
