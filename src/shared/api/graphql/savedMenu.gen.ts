import type * as Types from '@/shared/types/api';

import type { DocumentNode } from 'graphql';
import type * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type SavedMenuFieldsFragment = {
	__typename?: 'SavedMenu';
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	weekNumber: number;
	totalDishes: number;
	totalCalories: number;
	totalProtein: number;
	totalFat: number;
	totalCarbs: number;
	createdAt: string;
	updatedAt: string;
	items: Array<{
		__typename?: 'SavedMenuItem';
		id: string;
		dishId: string;
		date: string;
		mealTime: Types.MealTime;
		dish: {
			__typename?: 'SavedMenuDish';
			id: string;
			name: string;
			imageUrl?: string | null;
			calories?: number | null;
			protein?: number | null;
			fat?: number | null;
			carbs?: number | null;
		};
	}>;
};

export type SavedMenusQueryVariables = Types.Exact<{ [key: string]: never }>;

export type SavedMenusQuery = {
	__typename?: 'Query';
	savedMenus: Array<{ __typename?: 'SavedMenu' } & SavedMenuFieldsFragment>;
};

export type SavedMenuQueryVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
}>;

export type SavedMenuQuery = {
	__typename?: 'Query';
	savedMenu?: ({ __typename?: 'SavedMenu' } & SavedMenuFieldsFragment) | null;
};

export type DeleteSavedMenuMutationVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
}>;

export type DeleteSavedMenuMutation = {
	__typename?: 'Mutation';
	deleteSavedMenu: { __typename?: 'SavedMenu'; id: string; name: string };
};

export type DuplicateSavedMenuMutationVariables = Types.Exact<{
	id: Types.Scalars['ID']['input'];
}>;

export type DuplicateSavedMenuMutation = {
	__typename?: 'Mutation';
	duplicateSavedMenu: { __typename?: 'SavedMenu' } & SavedMenuFieldsFragment;
};

export const SavedMenuFieldsFragmentDoc = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'SavedMenuFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'SavedMenu' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'weekNumber' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalDishes' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCalories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalProtein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalFat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCarbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'items' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dishId' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mealTime' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'dish' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'imageUrl' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'calories' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'protein' },
											},
											{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
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
export const SavedMenusDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'SavedMenus' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'savedMenus' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'SavedMenuFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'SavedMenuFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'SavedMenu' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'weekNumber' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalDishes' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCalories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalProtein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalFat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCarbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'items' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dishId' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mealTime' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'dish' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'imageUrl' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'calories' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'protein' },
											},
											{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
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
export function useSavedMenusQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		SavedMenusQuery,
		SavedMenusQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<SavedMenusQuery, SavedMenusQueryVariables>(
		SavedMenusDocument,
		options,
	);
}
export function useSavedMenusLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		SavedMenusQuery,
		SavedMenusQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<
		SavedMenusQuery,
		SavedMenusQueryVariables
	>(SavedMenusDocument, options);
}
// @ts-ignore
export type SavedMenusQueryHookResult = ReturnType<typeof useSavedMenusQuery>;
export type SavedMenusLazyQueryHookResult = ReturnType<
	typeof useSavedMenusLazyQuery
>;
export const SavedMenuDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'SavedMenu' },
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
						name: { kind: 'Name', value: 'savedMenu' },
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
									name: { kind: 'Name', value: 'SavedMenuFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'SavedMenuFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'SavedMenu' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'weekNumber' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalDishes' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCalories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalProtein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalFat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCarbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'items' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dishId' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mealTime' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'dish' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'imageUrl' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'calories' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'protein' },
											},
											{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
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
export function useSavedMenuQuery(
	baseOptions: ApolloReactHooks.QueryHookOptions<
		SavedMenuQuery,
		SavedMenuQueryVariables
	> &
		(
			| { variables: SavedMenuQueryVariables; skip?: boolean }
			| { skip: boolean }
		),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<SavedMenuQuery, SavedMenuQueryVariables>(
		SavedMenuDocument,
		options,
	);
}
export function useSavedMenuLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		SavedMenuQuery,
		SavedMenuQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<SavedMenuQuery, SavedMenuQueryVariables>(
		SavedMenuDocument,
		options,
	);
}
// @ts-ignore
export type SavedMenuQueryHookResult = ReturnType<typeof useSavedMenuQuery>;
export type SavedMenuLazyQueryHookResult = ReturnType<
	typeof useSavedMenuLazyQuery
>;
export const DeleteSavedMenuDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteSavedMenu' },
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
						name: { kind: 'Name', value: 'deleteSavedMenu' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useDeleteSavedMenuMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		DeleteSavedMenuMutation,
		DeleteSavedMenuMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		DeleteSavedMenuMutation,
		DeleteSavedMenuMutationVariables
	>(DeleteSavedMenuDocument, options);
}
export type DeleteSavedMenuMutationHookResult = ReturnType<
	typeof useDeleteSavedMenuMutation
>;
export const DuplicateSavedMenuDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DuplicateSavedMenu' },
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
						name: { kind: 'Name', value: 'duplicateSavedMenu' },
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
									name: { kind: 'Name', value: 'SavedMenuFields' },
								},
							],
						},
					},
				],
			},
		},
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'SavedMenuFields' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'SavedMenu' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'weekNumber' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalDishes' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCalories' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalProtein' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalFat' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'totalCarbs' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'items' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dishId' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mealTime' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'dish' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'imageUrl' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'calories' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'protein' },
											},
											{ kind: 'Field', name: { kind: 'Name', value: 'fat' } },
											{ kind: 'Field', name: { kind: 'Name', value: 'carbs' } },
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
export function useDuplicateSavedMenuMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		DuplicateSavedMenuMutation,
		DuplicateSavedMenuMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		DuplicateSavedMenuMutation,
		DuplicateSavedMenuMutationVariables
	>(DuplicateSavedMenuDocument, options);
}
export type DuplicateSavedMenuMutationHookResult = ReturnType<
	typeof useDuplicateSavedMenuMutation
>;
