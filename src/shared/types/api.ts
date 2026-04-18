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
	user: User;
};

export type Dish = {
	__typename?: 'Dish';
	calories: Maybe<Scalars['Int']['output']>;
	carbs: Maybe<Scalars['Float']['output']>;
	category: Maybe<Scalars['String']['output']>;
	createdAt: Scalars['String']['output'];
	description: Maybe<Scalars['String']['output']>;
	fat: Maybe<Scalars['Float']['output']>;
	id: Scalars['ID']['output'];
	imageUrl: Maybe<Scalars['String']['output']>;
	ingredients: Array<Ingredient>;
	instructions: Array<Scalars['String']['output']>;
	isFavorite: Maybe<Scalars['Boolean']['output']>;
	name: Scalars['String']['output'];
	prepTime: Maybe<Scalars['Int']['output']>;
	protein: Maybe<Scalars['Float']['output']>;
	servings: Maybe<Scalars['Int']['output']>;
	updatedAt: Scalars['String']['output'];
	userId: Scalars['ID']['output'];
};

export type FamilyMember = {
	__typename?: 'FamilyMember';
	email: Scalars['String']['output'];
	id: Scalars['ID']['output'];
	invitedAt: Maybe<Scalars['String']['output']>;
	name: Maybe<Scalars['String']['output']>;
	sharedMenusCount: Maybe<Scalars['Int']['output']>;
	status: FamilyMemberStatus;
};

export enum FamilyMemberStatus {
	Member = 'MEMBER',
	Owner = 'OWNER',
	Pending = 'PENDING',
}

export type Ingredient = {
	__typename?: 'Ingredient';
	amount: Scalars['String']['output'];
	name: Scalars['String']['output'];
	product: Maybe<Product>;
	productId: Maybe<Scalars['ID']['output']>;
};

export type IngredientInput = {
	amount: Scalars['String']['input'];
	name: Scalars['String']['input'];
	productId?: InputMaybe<Scalars['ID']['input']>;
};

export enum MealTime {
	Breakfast = 'BREAKFAST',
	Dinner = 'DINNER',
	Lunch = 'LUNCH',
	Snack = 'SNACK',
}

export type MenuPlan = {
	__typename?: 'MenuPlan';
	createdAt: Scalars['String']['output'];
	date: Scalars['String']['output'];
	day: Maybe<Scalars['String']['output']>;
	id: Scalars['ID']['output'];
	items: Array<PlannerItem>;
	updatedAt: Scalars['String']['output'];
	userId: Scalars['ID']['output'];
	week: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	_empty: Maybe<Scalars['String']['output']>;
	acceptFamilyInvitation: FamilyMember;
	addToFavoritesDish: User;
	addToFavoritesProduct: User;
	cancelFamilyInvitation: FamilyMember;
	changePassword: Scalars['Boolean']['output'];
	createDish: Dish;
	createProduct: Product;
	deleteDish: Dish;
	deleteProduct: Product;
	inviteFamilyMember: FamilyMember;
	login: AuthPayload;
	logout: Scalars['Boolean']['output'];
	register: AuthPayload;
	removeFamilyMember: FamilyMember;
	removeFromFavoritesDish: User;
	removeFromFavoritesProduct: User;
	savePlanner: Scalars['Boolean']['output'];
	updateDish: Dish;
	updateProduct: Product;
	updateProfile: User;
};

export type MutationAcceptFamilyInvitationArgs = {
	invitationId: Scalars['ID']['input'];
};

export type MutationAddToFavoritesDishArgs = {
	dishId: Scalars['ID']['input'];
};

export type MutationAddToFavoritesProductArgs = {
	productId: Scalars['ID']['input'];
};

export type MutationCancelFamilyInvitationArgs = {
	invitationId: Scalars['ID']['input'];
};

export type MutationChangePasswordArgs = {
	currentPassword: Scalars['String']['input'];
	newPassword: Scalars['String']['input'];
};

export type MutationCreateDishArgs = {
	calories?: InputMaybe<Scalars['Int']['input']>;
	carbs?: InputMaybe<Scalars['Float']['input']>;
	category?: InputMaybe<Scalars['String']['input']>;
	description?: InputMaybe<Scalars['String']['input']>;
	fat?: InputMaybe<Scalars['Float']['input']>;
	imageUrl?: InputMaybe<Scalars['String']['input']>;
	ingredients: Array<IngredientInput>;
	instructions: Array<Scalars['String']['input']>;
	name: Scalars['String']['input'];
	prepTime?: InputMaybe<Scalars['Int']['input']>;
	protein?: InputMaybe<Scalars['Float']['input']>;
	servings?: InputMaybe<Scalars['Int']['input']>;
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

export type MutationDeleteDishArgs = {
	id: Scalars['ID']['input'];
};

export type MutationDeleteProductArgs = {
	id: Scalars['ID']['input'];
};

export type MutationInviteFamilyMemberArgs = {
	email: Scalars['String']['input'];
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

export type MutationRemoveFamilyMemberArgs = {
	memberId: Scalars['ID']['input'];
};

export type MutationRemoveFromFavoritesDishArgs = {
	dishId: Scalars['ID']['input'];
};

export type MutationRemoveFromFavoritesProductArgs = {
	productId: Scalars['ID']['input'];
};

export type MutationSavePlannerArgs = {
	endDate: Scalars['String']['input'];
	items: Array<PlannerItemInput>;
	startDate: Scalars['String']['input'];
};

export type MutationUpdateDishArgs = {
	calories?: InputMaybe<Scalars['Int']['input']>;
	carbs?: InputMaybe<Scalars['Float']['input']>;
	category?: InputMaybe<Scalars['String']['input']>;
	description?: InputMaybe<Scalars['String']['input']>;
	fat?: InputMaybe<Scalars['Float']['input']>;
	id: Scalars['ID']['input'];
	imageUrl?: InputMaybe<Scalars['String']['input']>;
	ingredients?: InputMaybe<Array<IngredientInput>>;
	instructions?: InputMaybe<Array<Scalars['String']['input']>>;
	name?: InputMaybe<Scalars['String']['input']>;
	prepTime?: InputMaybe<Scalars['Int']['input']>;
	protein?: InputMaybe<Scalars['Float']['input']>;
	servings?: InputMaybe<Scalars['Int']['input']>;
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

export type PlannerItem = {
	__typename?: 'PlannerItem';
	createdAt: Scalars['String']['output'];
	date: Scalars['String']['output'];
	dish: Dish;
	dishId: Scalars['ID']['output'];
	id: Scalars['ID']['output'];
	mealTime: MealTime;
	menuPlanId: Maybe<Scalars['ID']['output']>;
	userId: Scalars['ID']['output'];
};

export type PlannerItemInput = {
	date: Scalars['String']['input'];
	dishId: Scalars['ID']['input'];
	id?: InputMaybe<Scalars['ID']['input']>;
	mealTime: MealTime;
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
	_empty: Maybe<Scalars['String']['output']>;
	dish: Maybe<Dish>;
	dishByName: Maybe<Dish>;
	dishes: Array<Dish>;
	familyMembers: Array<FamilyMember>;
	favoriteDishes: Array<Dish>;
	favoriteProducts: Array<Product>;
	getMenuPlans: Array<MenuPlan>;
	getPlannerItems: Array<PlannerItem>;
	me: Maybe<User>;
	product: Maybe<Product>;
	productByName: Maybe<Product>;
	products: Array<Product>;
};

export type QueryDishArgs = {
	id: Scalars['ID']['input'];
};

export type QueryDishByNameArgs = {
	name: Scalars['String']['input'];
};

export type QueryDishesArgs = {
	category?: InputMaybe<Scalars['String']['input']>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	search?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetMenuPlansArgs = {
	endDate: Scalars['String']['input'];
	startDate: Scalars['String']['input'];
};

export type QueryGetPlannerItemsArgs = {
	endDate: Scalars['String']['input'];
	startDate: Scalars['String']['input'];
};

export type QueryProductArgs = {
	id: Scalars['ID']['input'];
};

export type QueryProductByNameArgs = {
	name: Scalars['String']['input'];
};

export type QueryProductsArgs = {
	category?: InputMaybe<Scalars['String']['input']>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	search?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
	__typename?: 'User';
	allergy: Array<Scalars['String']['output']>;
	avatar: Maybe<Scalars['String']['output']>;
	createdAt: Scalars['String']['output'];
	diet: Maybe<Scalars['String']['output']>;
	dishesCount: Scalars['Int']['output'];
	dislike: Array<Scalars['String']['output']>;
	email: Maybe<Scalars['String']['output']>;
	favoriteDishes: Array<Dish>;
	favoriteProducts: Array<Product>;
	id: Scalars['ID']['output'];
	name: Maybe<Scalars['String']['output']>;
	phone: Maybe<Scalars['String']['output']>;
	productsCount: Scalars['Int']['output'];
	role: Maybe<Scalars['String']['output']>;
	updatedAt: Scalars['String']['output'];
};
