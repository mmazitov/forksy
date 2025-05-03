import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

//Create a new PrismaClient instance if it doesn't exist
const prisma = globalForPrisma.prisma ?? new PrismaClient();

//Ensure that the PrismaClient is not closed when the application is in development mode
if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma;
}

export default prisma;
