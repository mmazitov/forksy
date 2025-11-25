import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const typeDefs = `
  type Dish {
    id: ID!
    name: String!
    description: String
    image: String
    category: String
    prepTime: Int
    servings: Int
    calories: Int
    ingredients: [String!]
    instructions: String
    createdAt: String!
    updatedAt: String!
  }

  type Product {
    id: ID!
    name: String!
    category: String
    price: Float
    quantity: Int
    unit: String
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    email: String!
    name: String
    dishes: [Dish!]!
    products: [Product!]!
    createdAt: String!
  }

  type Query {
    dishes: [Dish!]!
    dish(id: ID!): Dish
    products: [Product!]!
    product(id: ID!): Product
    me: User
  }

  type Mutation {
    createDish(
      name: String!
      description: String
      image: String
      category: String
      prepTime: Int
      servings: Int
      calories: Int
      ingredients: [String!]
      instructions: String
    ): Dish!

    updateDish(
      id: ID!
      name: String
      description: String
      image: String
      category: String
      prepTime: Int
      servings: Int
      calories: Int
      ingredients: [String!]
      instructions: String
    ): Dish!

    deleteDish(id: ID!): Boolean!

    createProduct(
      name: String!
      category: String
      price: Float
      quantity: Int
      unit: String
    ): Product!

    updateProduct(
      id: ID!
      name: String
      category: String
      price: Float
      quantity: Int
      unit: String
    ): Product!

    deleteProduct(id: ID!): Boolean!

		createUser(
			email: String!
			password: String!
		): User!
  }
`;

const resolvers = {
	Query: {
		dishes: () => prisma.dish.findMany(),
		dish: (_parent: any, { id }: { id: string }) =>
			prisma.dish.findUnique({ where: { id } }),

		products: () => prisma.product.findMany(),
		product: (_parent: any, { id }: { id: string }) =>
			prisma.product.findUnique({ where: { id } }),
	},

	Mutation: {
		createDish: (_parent: any, input: any) => {
			const userId = 'placeholder-user-id';
			return prisma.dish.create({
				data: { ...input, userId },
			});
		},

		updateDish: (_parent: any, { id, ...data }: any) =>
			prisma.dish.update({
				where: { id },
				data,
			}),

		deleteDish: (_parent: any, { id }: { id: string }) => {
			prisma.dish.delete({ where: { id } });
			return true;
		},

		createProduct: (_parent: any, input: any) => {
			const userId = 'placeholder-user-id';
			return prisma.product.create({
				data: { ...input, userId },
			});
		},

		updateProduct: (_parent: any, { id, ...data }: any) =>
			prisma.product.update({
				where: { id },
				data,
			}),

		deleteProduct: (_parent: any, { id }: { id: string }) => {
			prisma.product.delete({ where: { id } });
			return true;
		},

		createUser: (
			_parent: any,
			{ email, password }: { email: string; password: string },
		) => {
			return prisma.user.create({
				data: { email, password },
			});
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

export default startServerAndCreateNextHandler(server);
