import * as Types from './generated/api';

export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQuery = {
	__typename?: 'Query';
	me: {
		__typename?: 'User';
		id: string;
		email: string;
		name: string | null;
	} | null;
};

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
			email: string;
			name: string | null;
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
			email: string;
			name: string | null;
		};
	};
};
