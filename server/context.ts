import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface Context {
	prisma: PrismaClient;
	userId?: string;
}

export const createContext = async ({
	req,
}: {
	req: any;
}): Promise<Context> => {
	const token = req.headers.authorization || '';
	let userId: string | undefined;

	if (token) {
		try {
			const decoded = jwt.verify(
				token.replace('Bearer ', ''),
				process.env.JWT_SECRET || 'supersecret',
			) as { userId: string };
			userId = decoded.userId;
		} catch (e) {
			// Invalid token
		}
	}

	return {
		prisma,
		userId,
	};
};
