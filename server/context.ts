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
	
	// On Vercel, headers come in lowercase
	const token = headers.authorization || headers['Authorization'] || '';
	
	console.error('[Context] Token check:', {
		hasToken: !!token,
		tokenLength: token.length,
		firstChars: token.substring(0, 20),
	});
	
	let userId: string | undefined;

	if (token) {
		try {
			const cleanToken = token.replace('Bearer ', '').replace('bearer ', '');
			console.error('[Context] Attempting JWT verification with token:', cleanToken.substring(0, 30) + '...');
			
			const decoded = jwt.verify(
				cleanToken,
				process.env.JWT_SECRET || 'supersecret',
			) as { userId: string };
			userId = decoded.userId;
			console.error('[Context] JWT verified successfully, userId:', userId);
		} catch (e) {
			console.error('[Context] JWT verification failed:', (e as Error).message);
		}
	} else {
		console.error('[Context] No token provided in headers');
	}

	return {
		prisma,
		userId,
	};
};
