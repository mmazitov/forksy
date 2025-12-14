import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../../server/context';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

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
	if (req.query.code) {
		passport.authenticate(
			'google',
			{ session: false },
			(err: any, user: any) => {
				if (err || !user) {
					return res.status(401).json({ error: 'Authentication failed' });
				}

				const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
					expiresIn: '7d',
				});

				res.setHeader('Content-Type', 'text/html');
				res.send(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Authentication Success</title>
				</head>
				<body>
					<h3>Authentication successful! Closing window...</h3>
					<script>
						if (window.opener) {
							window.opener.postMessage(
								{ type: 'OAUTH_SUCCESS', token: '${token}' },
								'*'
							);
							setTimeout(() => window.close(), 500);
						}
					</script>
				</body>
				</html>
			`);
			},
		)(req, res);
	} else {
		passport.authenticate('google', {
			scope: ['profile', 'email'],
			session: false,
		})(req, res);
	}
}
