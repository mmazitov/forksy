import type { Exact, InputMaybe, Scalars } from './api';

export type RegisterMutationVariables = Exact<{
	email: Scalars['String']['input'];
	password: Scalars['String']['input'];
	name: Scalars['String']['input'];
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

export type LoginMutationVariables = Exact<{
	email: Scalars['String']['input'];
	password: Scalars['String']['input'];
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

export type MeQueryVariables = Exact<{ [key: string]: never }>;

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

export type UpdateProfileMutationVariables = Exact<{
	name?: InputMaybe<Scalars['String']['input']>;
	phone?: InputMaybe<Scalars['String']['input']>;
	avatar?: InputMaybe<Scalars['String']['input']>;
	diet?: InputMaybe<Scalars['String']['input']>;
	allergy?: InputMaybe<
		Array<Scalars['String']['input']> | Scalars['String']['input']
	>;
	dislike?: InputMaybe<
		Array<Scalars['String']['input']> | Scalars['String']['input']
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
