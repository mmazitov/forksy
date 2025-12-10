import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
	'/google/callback',
	passport.authenticate('google', { session: false }),
	(req: any, res) => {
		const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, {
			expiresIn: '7d',
		});

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
);

router.get(
	'/github',
	passport.authenticate('github', {
		scope: ['user:email'],
	}),
);

router.get(
	'/github/callback',
	passport.authenticate('github', { session: false }),
	(req: any, res) => {
		const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, {
			expiresIn: '7d',
		});

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
);

router.get(
	'/facebook',
	passport.authenticate('facebook', {
		scope: ['email'],
	}),
);

router.get(
	'/facebook/callback',
	passport.authenticate('facebook', { session: false }),
	(req: any, res) => {
		const token = jwt.sign({ userId: req.user.id }, JWT_SECRET, {
			expiresIn: '7d',
		});

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
);

export default router;
