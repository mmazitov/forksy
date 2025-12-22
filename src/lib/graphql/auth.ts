import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import type {
	LoginMutation,
	LoginMutationVariables,
	RegisterMutation,
	RegisterMutationVariables,
} from './types/operations';

const REGISTER_MUTATION = gql`
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
`;

const LOGIN_MUTATION = gql`
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
`;

export const useRegisterMutation = () =>
	useMutation<RegisterMutation, RegisterMutationVariables>(REGISTER_MUTATION);

export const useLoginMutation = () =>
	useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION);
