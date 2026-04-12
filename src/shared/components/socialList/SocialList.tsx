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

		if (import.meta.env.DEV) {
			console.log('[OAuth] Opening popup:', {
				provider,
				authUrl,
				apiUrl,
			});
		}

		const width = 500;
		const height = 600;
		const left = (window.innerWidth - width) / 2;
		const top = (window.innerHeight - height) / 2;

		popupRef.current = window.open(
			authUrl,
			'oauth-popup',
			`width=${width},height=${height},left=${left},top=${top}`,
		);

		if (!popupRef.current && import.meta.env.DEV) {
			console.error('[OAuth] Failed to open popup - popup blocker?');
		}
	};

	useEffect(() => {
		const handleMessage = async (event: MessageEvent) => {
			if (import.meta.env.DEV) {
				console.log('[OAuth] Message received:', {
					origin: event.origin,
					expectedOrigin: getApiUrl().replace(/\/$/, ''),
					data: event.data,
					source: event.source === popupRef.current ? 'popup' : 'other',
				});
			}

			const expectedOrigin = getApiUrl().replace(/\/$/, '');
			if (event.origin.replace(/\/$/, '') !== expectedOrigin) {
				if (import.meta.env.DEV) {
					console.warn('[OAuth] Origin mismatch:', {
						received: event.origin,
						expected: expectedOrigin,
					});
				}
				return;
			}

			if (event.source !== popupRef.current) {
				if (import.meta.env.DEV) {
					console.warn('[OAuth] Source mismatch');
				}
				return;
			}

			if (event.data.type === 'OAUTH_SUCCESS') {
				if (import.meta.env.DEV) {
					console.log('[OAuth] Success, cookies set in popup, calling login()');
				}

				try {
					await login();

					if (import.meta.env.DEV) {
						console.log('[OAuth] Login successful, closing modal');
					}

					onOpenChange(false);
				} catch (error) {
					if (import.meta.env.DEV) {
						console.error('[OAuth] Login failed:', error);
					}
				}
			} else if (event.data.type === 'OAUTH_ERROR') {
				if (import.meta.env.DEV) {
					console.error('[OAuth] Error from popup:', event.data.error);
				}
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
						aria-label={`Увійти через ${item.name}`}
						variant="outline"
						className="w-full cursor-pointer"
						onClick={() => handleSocialLogin(item.name)}
					>
						<item.icon className="h-5 w-5" aria-hidden="true" />
					</Button>
				</li>
			))}
		</ul>
	);
};

export default SocialList;
