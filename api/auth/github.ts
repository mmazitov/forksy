import type { VercelRequest, VercelResponse } from '@vercel/node';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { prisma } from '../../server/context';

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!,
			callbackURL: process.env.GITHUB_CALLBACK_URL!,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: any,
		) => {
			try {
				let user = await prisma.user.findUnique({
					where: { githubId: profile.id.toString() },
				});

				if (!user) {
					user = await prisma.user.create({
						data: {
							githubId: profile.id.toString(),
							email: profile.emails?.[0]?.value,
							name: profile.displayName || profile.username,
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
	passport.authenticate('github', {
		scope: ['user:email'],
		session: false,
	})(req, res);
}
