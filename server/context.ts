import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface Context {
	prisma: PrismaClient;
	userId?: string;
}

export const createContext = async (contextArg?: any): Promise<Context> => {
	// Handle both Express req object and Next.js/Vercel request context
	const req = contextArg?.req || contextArg;
	const headers = req?.headers || {};

	// Debug: log all headers
	// console.error('[Context] All headers:', JSON.stringify(headers));

	// On Vercel, headers come in lowercase
	let token = '';

	if (typeof headers.get === 'function') {
		token = headers.get('authorization') || headers.get('Authorization') || '';
	} else {
		token = headers.authorization || headers['Authorization'] || '';
	}

	let userId: string | undefined;

	if (token) {
		try {
			const cleanToken = token.replace('Bearer ', '').replace('bearer ', '');
			const decoded = jwt.verify(
				cleanToken,
				process.env.JWT_SECRET || 'supersecret',
			) as { userId: string };
			userId = decoded.userId;
		} catch (e) {
			console.error('[Context] Token invalid:', (e as Error).message);
		}
	}

	return {
		prisma,
		userId,
	};
};
