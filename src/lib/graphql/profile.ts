import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import type {
	MeQuery,
	MeQueryVariables,
	UpdateProfileMutation,
	UpdateProfileMutationVariables,
} from './types/operations';

const ME_QUERY = gql`
	query Me {
		me {
			id
			email
			name
			avatar
			createdAt
			updatedAt
		}
	}
`;

const UPDATE_PROFILE_MUTATION = gql`
	mutation UpdateProfile($name: String, $avatar: String) {
		updateProfile(name: $name, avatar: $avatar) {
			id
			email
			name
			avatar
			createdAt
			updatedAt
		}
	}
`;

export const useMeQuery = (
	options?: Parameters<typeof useQuery<MeQuery, MeQueryVariables>>[1],
) => useQuery<MeQuery, MeQueryVariables>(ME_QUERY, options);

export const useUpdateProfileMutation = () =>
	useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(
		UPDATE_PROFILE_MUTATION,
	);
