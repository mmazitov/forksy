import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import prisma from '@/lib/db/prisma';
import { env } from '@/lib/utils/schemas/env.zod';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: env.FACEBOOK_CLIENT_ID,
			clientSecret: env.FACEBOOK_CLIENT_SECRET,
		}),
	],
	secret: env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === 'development',
	callbacks: {
		session({ session, user }) {
			if (session.user && user) {
				session.user.id = user.id;
			}
			return session;
		},
		// Make sure redirect works correctly
		redirect({ url, baseUrl }) {
			// If the URL is relative, prepend the base URL
			if (url.startsWith('/')) {
				return `${baseUrl}${url}`;
			}
			// If it's on the same origin, allow it
			else if (new URL(url).origin === baseUrl) {
				return url;
			}
			// Otherwise, return to the base URL
			return baseUrl;
		},
	},
};
