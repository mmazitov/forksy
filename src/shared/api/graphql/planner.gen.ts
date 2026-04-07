import type * as Types from '@/shared/types/api';

import type { DocumentNode } from 'graphql';
import type * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type GetPlannerItemsQueryVariables = Types.Exact<{
	startDate: Types.Scalars['String']['input'];
	endDate: Types.Scalars['String']['input'];
}>;

export type GetPlannerItemsQuery = {
	__typename?: 'Query';
	getPlannerItems: Array<{
		__typename?: 'PlannerItem';
		id: string;
		dishId: string;
		date: string;
		mealTime: Types.MealTime;
		menuPlanId?: string | null;
		dish: {
			__typename?: 'Dish';
			id: string;
			name: string;
			category?: string | null;
			imageUrl?: string | null;
			calories?: number | null;
			description?: string | null;
		};
	}>;
};

export type GetMenuPlansQueryVariables = Types.Exact<{
	startDate: Types.Scalars['String']['input'];
	endDate: Types.Scalars['String']['input'];
}>;

export type GetMenuPlansQuery = {
	__typename?: 'Query';
	getMenuPlans: Array<{
		__typename?: 'MenuPlan';
		id: string;
		date: string;
		week?: number | null;
		day?: string | null;
		items: Array<{
			__typename?: 'PlannerItem';
			id: string;
			dishId: string;
			mealTime: Types.MealTime;
			dish: {
				__typename?: 'Dish';
				id: string;
				name: string;
				imageUrl?: string | null;
				calories?: number | null;
				ingredients: Array<{
					__typename?: 'Ingredient';
					name: string;
					amount: string;
					productId?: string | null;
					product?: { __typename?: 'Product'; category?: string | null } | null;
				}>;
			};
		}>;
	}>;
};

export type SavePlannerItemsMutationVariables = Types.Exact<{
	items: Array<Types.PlannerItemInput> | Types.PlannerItemInput;
	startDate: Types.Scalars['String']['input'];
	endDate: Types.Scalars['String']['input'];
}>;

export type SavePlannerItemsMutation = {
	__typename?: 'Mutation';
	savePlanner: boolean;
};

export const GetPlannerItemsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetPlannerItems' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'startDate' },
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
						name: { kind: 'Name', value: 'endDate' },
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
						name: { kind: 'Name', value: 'getPlannerItems' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'startDate' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'startDate' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'endDate' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'endDate' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'dishId' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'mealTime' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'menuPlanId' } },
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
												name: { kind: 'Name', value: 'category' },
											},
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
												name: { kind: 'Name', value: 'description' },
											},
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
export function useGetPlannerItemsQuery(
	baseOptions: ApolloReactHooks.QueryHookOptions<
		GetPlannerItemsQuery,
		GetPlannerItemsQueryVariables
	> &
		(
			| { variables: GetPlannerItemsQueryVariables; skip?: boolean }
			| { skip: boolean }
		),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<
		GetPlannerItemsQuery,
		GetPlannerItemsQueryVariables
	>(GetPlannerItemsDocument, options);
}
export function useGetPlannerItemsLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		GetPlannerItemsQuery,
		GetPlannerItemsQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<
		GetPlannerItemsQuery,
		GetPlannerItemsQueryVariables
	>(GetPlannerItemsDocument, options);
}
// @ts-ignore
export type GetPlannerItemsQueryHookResult = ReturnType<
	typeof useGetPlannerItemsQuery
>;
export type GetPlannerItemsLazyQueryHookResult = ReturnType<
	typeof useGetPlannerItemsLazyQuery
>;
export const GetMenuPlansDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'GetMenuPlans' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'startDate' },
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
						name: { kind: 'Name', value: 'endDate' },
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
						name: { kind: 'Name', value: 'getMenuPlans' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'startDate' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'startDate' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'endDate' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'endDate' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'date' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'week' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'day' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'items' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'dishId' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'mealTime' },
											},
											{
												kind: 'Field',
												name: { kind: 'Name', value: 'dish' },
												selectionSet: {
													kind: 'SelectionSet',
													selections: [
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'id' },
														},
														{
															kind: 'Field',
															name: { kind: 'Name', value: 'name' },
														},
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
															name: { kind: 'Name', value: 'ingredients' },
															selectionSet: {
																kind: 'SelectionSet',
																selections: [
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'name' },
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'amount' },
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'productId' },
																	},
																	{
																		kind: 'Field',
																		name: { kind: 'Name', value: 'product' },
																		selectionSet: {
																			kind: 'SelectionSet',
																			selections: [
																				{
																					kind: 'Field',
																					name: {
																						kind: 'Name',
																						value: 'category',
																					},
																				},
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
export function useGetMenuPlansQuery(
	baseOptions: ApolloReactHooks.QueryHookOptions<
		GetMenuPlansQuery,
		GetMenuPlansQueryVariables
	> &
		(
			| { variables: GetMenuPlansQueryVariables; skip?: boolean }
			| { skip: boolean }
		),
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<
		GetMenuPlansQuery,
		GetMenuPlansQueryVariables
	>(GetMenuPlansDocument, options);
}
export function useGetMenuPlansLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		GetMenuPlansQuery,
		GetMenuPlansQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<
		GetMenuPlansQuery,
		GetMenuPlansQueryVariables
	>(GetMenuPlansDocument, options);
}
// @ts-ignore
export type GetMenuPlansQueryHookResult = ReturnType<
	typeof useGetMenuPlansQuery
>;
export type GetMenuPlansLazyQueryHookResult = ReturnType<
	typeof useGetMenuPlansLazyQuery
>;
export const SavePlannerItemsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'SavePlannerItems' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'items' },
					},
					type: {
						kind: 'NonNullType',
						type: {
							kind: 'ListType',
							type: {
								kind: 'NonNullType',
								type: {
									kind: 'NamedType',
									name: { kind: 'Name', value: 'PlannerItemInput' },
								},
							},
						},
					},
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'startDate' },
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
						name: { kind: 'Name', value: 'endDate' },
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
						name: { kind: 'Name', value: 'savePlanner' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'items' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'items' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'startDate' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'startDate' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'endDate' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'endDate' },
								},
							},
						],
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useSavePlannerItemsMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		SavePlannerItemsMutation,
		SavePlannerItemsMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		SavePlannerItemsMutation,
		SavePlannerItemsMutationVariables
	>(SavePlannerItemsDocument, options);
}
export type SavePlannerItemsMutationHookResult = ReturnType<
	typeof useSavePlannerItemsMutation
>;
