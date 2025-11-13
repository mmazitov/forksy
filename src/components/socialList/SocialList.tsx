import { Button } from '@/components';
import { SOCIAL_ITEMS } from '@/constants';
import { useAuthActions } from '@/hooks';

interface SocialListProps {
	onOpenChange: (open: boolean) => void;
}
const SocialList = ({ onOpenChange }: SocialListProps) => {
	const { handleLogin } = useAuthActions();

	const handleSocialLogin = (provider: string) => {
		console.log(`Login with ${provider}`);
		handleLogin(`${provider}@example.com`, 'social-password');
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
