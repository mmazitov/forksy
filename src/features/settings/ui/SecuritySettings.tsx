import { ChangePasswordForm } from '@/features/profile';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components';

const SecuritySettings = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Безпека</CardTitle>
				<CardDescription>Управління паролем і безпекою акаунта</CardDescription>
			</CardHeader>
			<CardContent>
				<ChangePasswordForm />
			</CardContent>
		</Card>
	);
};

export default SecuritySettings;
