import type { VercelRequest, VercelResponse } from '@vercel/node';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { prisma } from '../../server/context';

passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_APP_ID!,
			clientSecret: process.env.FACEBOOK_APP_SECRET!,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
			profileFields: ['id', 'displayName', 'photos', 'email'],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				let user = await prisma.user.findUnique({
					where: { facebookId: profile.id },
				});

				if (!user) {
					user = await prisma.user.create({
						data: {
							facebookId: profile.id,
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
	passport.authenticate('facebook', {
		scope: ['email'],
		session: false,
	})(req, res);
}
