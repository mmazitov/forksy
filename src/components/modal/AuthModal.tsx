import { AuthForm, Separator, SocialList } from '@/components';
import { modalsConfig } from '@/lib/config';

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
				<span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
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
							className="text-primary hover:underline font-medium cursor-pointer"
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
							className="text-primary hover:underline font-medium cursor-pointer"
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
