import { gql } from 'graphql-tag';

export const typeDefs = gql`
	type User {
		id: ID!
		email: String
		name: String
		avatar: String
		phone: String
		diet: String
		allergy: [String!]!
		dislike: [String!]!
		googleId: String
		githubId: String
		facebookId: String
		createdAt: String!
		updatedAt: String!
	}

	type AuthPayload {
		token: String!
		user: User!
	}

	type Query {
		me: User
	}

	type Mutation {
		register(email: String!, password: String!, name: String): AuthPayload!
		login(email: String!, password: String!): AuthPayload!
		updateProfile(
			name: String
			phone: String
			avatar: String
			diet: String
			allergy: [String!]
			dislike: [String!]
		): User!
	}

	type SocialAuthPayload {
		token: String!
		user: User!
	}

	extend type Mutation {
		handleOAuthCallback(provider: String!, code: String!): SocialAuthPayload!
	}
`;
