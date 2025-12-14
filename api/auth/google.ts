import type { VercelRequest, VercelResponse } from '@vercel/node';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../../server/context';

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			callbackURL: process.env.GOOGLE_CALLBACK_URL!,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await prisma.user.findUnique({
					where: { googleId: profile.id },
				});

				if (!user) {
					user = await prisma.user.create({
						data: {
							googleId: profile.id,
							email: profile.emails?.[0]?.value,
							name: profile.displayName,
							avatar: profile.photos?.[0]?.value,
						},
					});
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		},
	),
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
	passport.authenticate('google', {
		scope: ['profile', 'email'],
		session: false,
	})(req, res);
}
