import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import type { Request } from 'express';
import express from 'express';
import session from 'express-session';
import http from 'http';
import passport from 'passport';
import { createContext } from './context.js';
import oauthRouter from './oauth.js';
import './passport/strategies.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './schema.js';

const startServer = async () => {
	const app = express();
	const httpServer = http.createServer(app);

	// Apollo Server
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();

	// Middleware
	app.use(
		cors({
			origin: process.env.CLIENT_URL || 'http://localhost:5173',
			credentials: true,
		}),
	);
	app.use(express.json());

	// Session setup для Passport
	app.use(
		session({
			secret: process.env.SESSION_SECRET || 'your-session-secret',
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: process.env.NODE_ENV === 'production',
				maxAge: 24 * 60 * 60 * 1000, // 24 години
			},
		}),
	);

	// Ініціалізація Passport
	app.use(passport.initialize());
	app.use(passport.session());

	// OAuth маршрути
	app.use('/auth', oauthRouter);

	// GraphQL endpoint
	app.use(
		'/graphql',
		expressMiddleware(server, {
			context: async ({ req }: { req: Request }) => createContext({ req }),
		}),
	);

	const PORT = process.env.PORT || 4000;

	await new Promise<void>((resolve) =>
		httpServer.listen({ port: PORT }, resolve),
	);

	console.log(`🚀  Server ready at: http://localhost:${PORT}/graphql`);
	console.log(
		`🔐  OAuth endpoints available at: http://localhost:${PORT}/auth`,
	);
};

startServer();
