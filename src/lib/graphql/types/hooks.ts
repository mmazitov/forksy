import type * as Types from './types';

import * as Operations from './types';
import * as ApolloReactHooks from '@apollo/client/react';
const defaultOptions = {} as const;

export function useRegisterMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		Types.RegisterMutation,
		Types.RegisterMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		Types.RegisterMutation,
		Types.RegisterMutationVariables
	>(Operations.Register, options);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export function useLoginMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		Types.LoginMutation,
		Types.LoginMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		Types.LoginMutation,
		Types.LoginMutationVariables
	>(Operations.Login, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export function useMeQuery(
	baseOptions?: ApolloReactHooks.QueryHookOptions<
		Types.MeQuery,
		Types.MeQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useQuery<Types.MeQuery, Types.MeQueryVariables>(
		Operations.Me,
		options,
	);
}
export function useMeLazyQuery(
	baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
		Types.MeQuery,
		Types.MeQueryVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(
		Operations.Me,
		options,
	);
}

export function useMeSuspenseQuery(
	baseOptions?:
		| ApolloReactHooks.SkipToken
		| ApolloReactHooks.SuspenseQueryHookOptions<
				Types.MeQuery,
				Types.MeQueryVariables
		  >,
) {
	const options =
		baseOptions === ApolloReactHooks.skipToken
			? baseOptions
			: { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useSuspenseQuery<
		Types.MeQuery,
		Types.MeQueryVariables
	>(Operations.Me, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export function useUpdateProfileMutation(
	baseOptions?: ApolloReactHooks.MutationHookOptions<
		Types.UpdateProfileMutation,
		Types.UpdateProfileMutationVariables
	>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return ApolloReactHooks.useMutation<
		Types.UpdateProfileMutation,
		Types.UpdateProfileMutationVariables
	>(Operations.UpdateProfile, options);
}
export type UpdateProfileMutationHookResult = ReturnType<
	typeof useUpdateProfileMutation
>;
