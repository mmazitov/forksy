import { toast } from '@/hooks/useToast';
import { useAuth } from '@/lib/auth/AuthContext';

const useAuthActions = () => {
	const { user, logout } = useAuth();

	const isLoggedIn = !!user;
	const userName = user?.name || user?.email?.split('@')[0] || '';

	const handleLogout = () => {
		logout();
		toast({
			title: 'Ви вийшли з акаунта',
			description: 'До скорої зустрічі!',
		});
	};

	return {
		isLoggedIn,
		userName,
		handleLogout,
	};
};

export default useAuthActions;
