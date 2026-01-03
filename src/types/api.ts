export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type AuthPayload = {
	__typename?: 'AuthPayload';
	token: Scalars['String']['output'];
	user: User;
};

export type Mutation = {
	__typename?: 'Mutation';
	addToFavorites: User;
	createProduct: Product;
	deleteProduct: Product;
	handleOAuthCallback: SocialAuthPayload;
	login: AuthPayload;
	register: AuthPayload;
	removeFromFavorites: User;
	updateProduct: Product;
	updateProfile: User;
};

export type MutationAddToFavoritesArgs = {
	productId: Scalars['ID']['input'];
};

export type MutationCreateProductArgs = {
	calories?: InputMaybe<Scalars['Int']['input']>;
	carbs?: InputMaybe<Scalars['Float']['input']>;
	category?: InputMaybe<Scalars['String']['input']>;
	description?: InputMaybe<Scalars['String']['input']>;
	fat?: InputMaybe<Scalars['Float']['input']>;
	imageUrl?: InputMaybe<Scalars['String']['input']>;
	name: Scalars['String']['input'];
	protein?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationDeleteProductArgs = {
	id: Scalars['ID']['input'];
};

export type MutationHandleOAuthCallbackArgs = {
	code: Scalars['String']['input'];
	provider: Scalars['String']['input'];
};

export type MutationLoginArgs = {
	email: Scalars['String']['input'];
	password: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
	email: Scalars['String']['input'];
	name?: InputMaybe<Scalars['String']['input']>;
	password: Scalars['String']['input'];
};

export type MutationRemoveFromFavoritesArgs = {
	productId: Scalars['ID']['input'];
};

export type MutationUpdateProductArgs = {
	calories?: InputMaybe<Scalars['Int']['input']>;
	carbs?: InputMaybe<Scalars['Float']['input']>;
	category?: InputMaybe<Scalars['String']['input']>;
	description?: InputMaybe<Scalars['String']['input']>;
	fat?: InputMaybe<Scalars['Float']['input']>;
	id: Scalars['ID']['input'];
	imageUrl?: InputMaybe<Scalars['String']['input']>;
	name?: InputMaybe<Scalars['String']['input']>;
	protein?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationUpdateProfileArgs = {
	allergy?: InputMaybe<Array<Scalars['String']['input']>>;
	avatar?: InputMaybe<Scalars['String']['input']>;
	diet?: InputMaybe<Scalars['String']['input']>;
	dislike?: InputMaybe<Array<Scalars['String']['input']>>;
	name?: InputMaybe<Scalars['String']['input']>;
	phone?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
	__typename?: 'Product';
	calories: Maybe<Scalars['Int']['output']>;
	carbs: Maybe<Scalars['Float']['output']>;
	category: Maybe<Scalars['String']['output']>;
	createdAt: Scalars['String']['output'];
	description: Maybe<Scalars['String']['output']>;
	fat: Maybe<Scalars['Float']['output']>;
	id: Scalars['ID']['output'];
	imageUrl: Maybe<Scalars['String']['output']>;
	isFavorite: Maybe<Scalars['Boolean']['output']>;
	name: Scalars['String']['output'];
	protein: Maybe<Scalars['Float']['output']>;
	updatedAt: Scalars['String']['output'];
	userId: Scalars['ID']['output'];
};

export type Query = {
	__typename?: 'Query';
	favoriteProducts: Array<Product>;
	me: Maybe<User>;
	product: Maybe<Product>;
	products: Array<Product>;
};

export type QueryProductArgs = {
	id: Scalars['ID']['input'];
};

export type QueryProductsArgs = {
	category?: InputMaybe<Scalars['String']['input']>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	search?: InputMaybe<Scalars['String']['input']>;
};

export type SocialAuthPayload = {
	__typename?: 'SocialAuthPayload';
	token: Scalars['String']['output'];
	user: User;
};

export type User = {
	__typename?: 'User';
	allergy: Array<Scalars['String']['output']>;
	avatar: Maybe<Scalars['String']['output']>;
	createdAt: Scalars['String']['output'];
	diet: Maybe<Scalars['String']['output']>;
	dislike: Array<Scalars['String']['output']>;
	email: Maybe<Scalars['String']['output']>;
	facebookId: Maybe<Scalars['String']['output']>;
	favoriteProducts: Array<Product>;
	githubId: Maybe<Scalars['String']['output']>;
	googleId: Maybe<Scalars['String']['output']>;
	id: Scalars['ID']['output'];
	name: Maybe<Scalars['String']['output']>;
	phone: Maybe<Scalars['String']['output']>;
	role: Maybe<Scalars['String']['output']>;
	updatedAt: Scalars['String']['output'];
};
