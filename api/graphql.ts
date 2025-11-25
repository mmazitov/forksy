import { ApolloServer } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { VercelRequest, VercelResponse } from '@vercel/node';

const prisma = new PrismaClient();

// Helper to parse request body
async function parseBody(req: VercelRequest): Promise<any> {
	if (typeof req.body === 'string') {
		return JSON.parse(req.body);
	}
	return req.body || {};
}

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
		createDish: (_parent: any, input: any, context: any) => {
			const userId = context.userId || 'placeholder-user-id';
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

		createProduct: (_parent: any, input: any, context: any) => {
			const userId = context.userId || 'placeholder-user-id';
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
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

// Initialize server
let serverStarted = false;

export default async (req: VercelRequest, res: VercelResponse) => {
	// Start server once
	if (!serverStarted) {
		await server.start();
		serverStarted = true;
	}

	// Handle CORS
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const body = await parseBody(req);

		const result = await server.executeOperation({
			query: body.query,
			variables: body.variables,
		});

		res.status(200).json(result);
	} catch (error) {
		console.error('GraphQL error:', error);
		res.status(500).json({
			error: 'GraphQL request failed',
			message: error instanceof Error ? error.message : 'Unknown error',
		});
	}
};
