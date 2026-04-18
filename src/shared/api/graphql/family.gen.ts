import type * as Types from '@/shared/types/api';

import type { DocumentNode } from 'graphql';
import type * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;
export type FamilyMembersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FamilyMembersQuery = {
	__typename?: 'Query';
	familyMembers: Array<{
		__typename?: 'FamilyMember';
		id: string;
		email: string;
		name?: string | null;
		status: Types.FamilyMemberStatus;
		sharedMenusCount?: number | null;
		invitedAt?: string | null;
	}>;
};

export type InviteFamilyMemberMutationVariables = Types.Exact<{
	email: Types.Scalars['String']['input'];
}>;

export type InviteFamilyMemberMutation = {
	__typename?: 'Mutation';
	inviteFamilyMember: {
		__typename?: 'FamilyMember';
		id: string;
		email: string;
		name?: string | null;
		status: Types.FamilyMemberStatus;
		invitedAt?: string | null;
	};
};

export type RemoveFamilyMemberMutationVariables = Types.Exact<{
	memberId: Types.Scalars['ID']['input'];
}>;

export type RemoveFamilyMemberMutation = {
	__typename?: 'Mutation';
	removeFamilyMember: { __typename?: 'FamilyMember'; id: string };
};

export type CancelFamilyInvitationMutationVariables = Types.Exact<{
	invitationId: Types.Scalars['ID']['input'];
}>;

export type CancelFamilyInvitationMutation = {
	__typename?: 'Mutation';
	cancelFamilyInvitation: { __typename?: 'FamilyMember'; id: string };
};

export const FamilyMembersDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'FamilyMembers' },
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'familyMembers' },
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'status' } },
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'sharedMenusCount' },
								},
								{ kind: 'Field', name: { kind: 'Name', value: 'invitedAt' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useFamilyMembersQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		FamilyMembersQuery,
		FamilyMembersQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<
		FamilyMembersQuery,
		FamilyMembersQueryVariables
	>(FamilyMembersDocument, options);
}
export function useFamilyMembersLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		FamilyMembersQuery,
		FamilyMembersQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<
		FamilyMembersQuery,
		FamilyMembersQueryVariables
	>(FamilyMembersDocument, options);
}
// @ts-ignore
export type FamilyMembersQueryHookResult = ReturnType<
	typeof useFamilyMembersQuery
>;
export type FamilyMembersLazyQueryHookResult = ReturnType<
	typeof useFamilyMembersLazyQuery
>;
export const InviteFamilyMemberDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'InviteFamilyMember' },
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
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'inviteFamilyMember' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'email' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'email' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'name' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'status' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'invitedAt' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode;
export function useInviteFamilyMemberMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		InviteFamilyMemberMutation,
		InviteFamilyMemberMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		InviteFamilyMemberMutation,
		InviteFamilyMemberMutationVariables
	>(InviteFamilyMemberDocument, options);
}
export type InviteFamilyMemberMutationHookResult = ReturnType<
	typeof useInviteFamilyMemberMutation
>;
export const RemoveFamilyMemberDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'RemoveFamilyMember' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'memberId' },
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
						name: { kind: 'Name', value: 'removeFamilyMember' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'memberId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'memberId' },
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
export function useRemoveFamilyMemberMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		RemoveFamilyMemberMutation,
		RemoveFamilyMemberMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		RemoveFamilyMemberMutation,
		RemoveFamilyMemberMutationVariables
	>(RemoveFamilyMemberDocument, options);
}
export type RemoveFamilyMemberMutationHookResult = ReturnType<
	typeof useRemoveFamilyMemberMutation
>;
export const CancelFamilyInvitationDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'CancelFamilyInvitation' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'invitationId' },
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
						name: { kind: 'Name', value: 'cancelFamilyInvitation' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'invitationId' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'invitationId' },
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
export function useCancelFamilyInvitationMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		CancelFamilyInvitationMutation,
		CancelFamilyInvitationMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		CancelFamilyInvitationMutation,
		CancelFamilyInvitationMutationVariables
	>(CancelFamilyInvitationDocument, options);
}
export type CancelFamilyInvitationMutationHookResult = ReturnType<
	typeof useCancelFamilyInvitationMutation
>;
