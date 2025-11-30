import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface Context {
	prisma: PrismaClient;
	userId?: string;
}

export const createContext = async (
	contextArg?: any,
): Promise<Context> => {
	// Handle both Express req object and Next.js/Vercel request context
	const req = contextArg?.req || contextArg;
	const headers = req?.headers || {};
	
	console.log('[Server Context] Headers:', {
		authorization: headers.authorization?.substring(0, 50) + '...',
		allHeaders: Object.keys(headers),
	});

	const token = headers.authorization || '';
	let userId: string | undefined;

	if (token) {
		try {
			const decoded = jwt.verify(
				token.replace('Bearer ', ''),
				process.env.JWT_SECRET || 'supersecret',
			) as { userId: string };
			userId = decoded.userId;
			console.log('[Server Context] Token verified, userId:', userId);
		} catch (e) {
			console.log('[Server Context] Token verification failed:', (e as Error).message);
		}
	} else {
		console.log('[Server Context] No token in headers');
	}

	return {
		prisma,
		userId,
	};
};
