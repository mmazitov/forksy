import { Button } from '@/components';
import { SOCIAL_ITEMS } from '@/constants';
import { useAuth } from '@/lib/auth/AuthContext';
import { useEffect } from 'react';

interface SocialListProps {
	onOpenChange: (open: boolean) => void;
}
const SocialList = ({ onOpenChange }: SocialListProps) => {
	const { login } = useAuth();

	const handleSocialLogin = (provider: string) => {
		const authUrl = `http://localhost:4000/auth/${provider}`;

		const width = 500;
		const height = 600;
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;

		window.open(
			authUrl,
			'oauth-popup',
			`width=${width},height=${height},left=${left},top=${top}`,
		);
	};

	// Слухаємо повідомлення від popup вікна
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			// Перевіряємо що повідомлення від нашого сервера
			const allowedOrigins = [
				window.location.origin,
				'http://localhost:4000',
				'http://localhost:5173',
			];

			if (!allowedOrigins.includes(event.origin)) {
				return;
			}

			if (event.data.type === 'OAUTH_SUCCESS' && event.data.token) {
				const token = event.data.token;

				// Отримуємо дані користувача
				fetch('http://localhost:4000/graphql', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						query: `
							query Me {
								me {
									id
									email
									name
									avatar
								}
							}
						`,
					}),
				})
					.then((res) => {
						console.log('[SocialList] Response status:', res.status);
						return res.text();
					})
					.then((text) => {
						console.log('[SocialList] Raw response:', text);
						try {
							const data = JSON.parse(text);
							console.log('[SocialList] User data received:', data);

							if (data.data?.me) {
								console.log(
									'[SocialList] Calling login with user:',
									data.data.me,
								);
								login(token, data.data.me);
								console.log('[SocialList] Closing modal...');
								onOpenChange(false);
							} else {
								console.error('[SocialList] No user data in response');
							}
						} catch (e) {
							console.error('[SocialList] Failed to parse response:', e);
						}
					})
					.catch((err) => {
						console.error('[SocialList] OAuth error:', err);
					});
			}
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [login, onOpenChange]);

	return (
		<ul className="grid grid-cols-3 gap-3">
			{SOCIAL_ITEMS.map((item) => (
				<li key={item.name}>
					<Button
						aria-label={item.name}
						variant="outline"
						className="w-full cursor-pointer"
						onClick={() => handleSocialLogin(item.name)}
					>
						<item.icon className="h-5 w-5" />
					</Button>
				</li>
			))}
		</ul>
	);
};

export default SocialList;
