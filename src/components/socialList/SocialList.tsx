import { Button } from '@/components';
import { SOCIAL_ITEMS } from '@/constants';
import { useAuth } from '@/lib/auth/AuthContext';

interface SocialListProps {
	onOpenChange: (open: boolean) => void;
}
const SocialList = ({ onOpenChange }: SocialListProps) => {
	const { login } = useAuth();

	const handleSocialLogin = (provider: string) => {
		console.log(`Login with ${provider}`);
		// Social login handler - can be extended with actual OAuth flow
		onOpenChange(false);
	};

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
