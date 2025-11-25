import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createContext } from './context.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './schema.js';

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	const { url } = await startStandaloneServer(server, {
		context: createContext,
		listen: { port: 4000 },
	});

	console.log(`🚀  Server ready at: ${url}`);
};

startServer();
