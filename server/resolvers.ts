import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Context } from './context.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const resolvers = {
	Query: {
		me: async (_parent: any, _args: any, context: Context) => {
			if (!context.userId) {
				throw new Error('Not authenticated');
			}

			const user = await context.prisma.user.findUnique({
				where: { id: context.userId },
			});

			return user;
		},
	},
	Mutation: {
		register: async (_parent: any, args: any, context: Context) => {
			const hashedPassword = await bcrypt.hash(args.password, 10);
			const user = await context.prisma.user.create({
				data: {
					email: args.email,
					password: hashedPassword,
					name: args.name,
				},
			});

			const token = jwt.sign({ userId: user.id }, JWT_SECRET);

			return {
				token,
				user,
			};
		},
		login: async (_parent: any, args: any, context: Context) => {
			const user = await context.prisma.user.findUnique({
				where: { email: args.email },
			});

			if (!user) {
				throw new Error('Invalid email or password');
			}

			const valid = await bcrypt.compare(args.password, user.password || '');
			if (!valid) {
				throw new Error('Invalid email or password');
			}

			const token = jwt.sign({ userId: user.id }, JWT_SECRET);

			return {
				token,
				user,
			};
		},
	},
};
