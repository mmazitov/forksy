import { useEffect, useRef } from 'react';

import { useAuthContext } from '@/features/auth';
import { Button } from '@/shared/components';
import { SOCIAL_ITEMS } from '@/shared/constants';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL?.replace('/graphql', '') ||
  'http://localhost:4000';

interface SocialListProps {
  onOpenChange: (open: boolean) => void;
}

const SocialList = ({ onOpenChange }: SocialListProps) => {
  const { login } = useAuthContext();
  const popupRef = useRef<Window | null>(null);

  const handleSocialLogin = (provider: string) => {
    const authUrl = `${API_BASE_URL}/auth/${provider}-auth`;

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
    const expectedOrigin = API_BASE_URL.replace(/\/$/, '');

    const handleMessage = async (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object' || !event.data.type) return;
      if (!event.data.type.startsWith('OAUTH_')) return;
      if (event.source !== popupRef.current) return;
      if (event.origin.replace(/\/$/, '') !== expectedOrigin) return;

      if (event.data.type === 'OAUTH_SUCCESS') {
        try {
          await login();
          onOpenChange(false);
        } catch (error) {
          if (import.meta.env.DEV) console.error('[OAuth] login() failed:', error);
        }
      } else if (event.data.type === 'OAUTH_ERROR') {
        if (import.meta.env.DEV) console.error('[OAuth] Error:', event.data.error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
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
