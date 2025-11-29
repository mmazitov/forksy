import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { createContext } from '../server/context.js';
import { resolvers } from '../server/resolvers.js';
import { typeDefs } from '../server/schema.js';

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

export default startServerAndCreateNextHandler(server, {
	context: async ({ req }) => createContext({ req }),
});
