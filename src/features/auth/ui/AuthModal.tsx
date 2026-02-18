import AuthForm from './AuthForm';

import { Separator, SocialList } from '@/shared/components';
import { modalsConfig } from '@/shared/lib/config';

interface AuthModalProps {
	onOpenChange: (open: boolean) => void;
	isLogin: boolean;
	setIsLogin: (value: boolean) => void;
}

const AuthModal = ({ onOpenChange, isLogin, setIsLogin }: AuthModalProps) => {
	const { LOGIN, REGISTER } = modalsConfig.AUTH_MODAL;

	return (
		<>
			<AuthForm isLogin={isLogin} onOpenChange={onOpenChange} />

			<div className="relative my-4">
				<Separator />
				<span className="bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
					або продовжити з
				</span>
			</div>

			<SocialList onOpenChange={onOpenChange} />

			<div className="text-center text-sm">
				{isLogin ? (
					<p>
						{LOGIN.switchText}{' '}
						<button
							type="button"
							onClick={() => setIsLogin(false)}
							className="text-primary cursor-pointer font-medium hover:underline"
						>
							{LOGIN.switchLinkText}
						</button>
					</p>
				) : (
					<p>
						{REGISTER.switchText}{' '}
						<button
							type="button"
							onClick={() => setIsLogin(true)}
							className="text-primary cursor-pointer font-medium hover:underline"
						>
							{REGISTER.switchLinkText}
						</button>
					</p>
				)}
			</div>
		</>
	);
};

export default AuthModal;
