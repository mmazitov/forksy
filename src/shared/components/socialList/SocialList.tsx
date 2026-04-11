import { useEffect, useRef } from 'react';

import { useAuthContext } from '@/features/auth';
import { Button } from '@/shared/components';
import { SOCIAL_ITEMS } from '@/shared/constants';

interface SocialListProps {
	onOpenChange: (open: boolean) => void;
}

const SocialList = ({ onOpenChange }: SocialListProps) => {
	const { login } = useAuthContext();
	const popupRef = useRef<Window | null>(null);

	const getApiUrl = () => {
		return (
			import.meta.env.VITE_API_URL?.replace('/graphql', '') ||
			'http://localhost:4000'
		);
	};

	const handleSocialLogin = (provider: string) => {
		const apiUrl = getApiUrl();
		const authUrl = `${apiUrl}/auth/${provider}-auth`;

		const width = 500;
		const height = 600;
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;

		popupRef.current = window.open(
			authUrl,
			'oauth-popup',
			`width=${width},height=${height},left=${left},top=${top}`,
		);
	};

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			const expectedOrigin = getApiUrl().replace(/\/$/, '');
			if (event.origin.replace(/\/$/, '') !== expectedOrigin) return;
			if (event.source !== popupRef.current) return;
			if (event.data.type === 'OAUTH_SUCCESS') {
				const apiUrl = getApiUrl();

				fetch(`${apiUrl}/graphql`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({
						query: `
							query Me {
								me {
									id
									email
									name
									avatar
									role
								}
							}
						`,
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						if (data.data?.me) {
							login(data.data.me);
							onOpenChange(false);
						}
					})
					.catch(() => {
						if (import.meta.env.DEV) console.error('OAuth error');
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
