import { toast } from '@/hooks/useToast';
import { useState } from 'react';

const useAuthActions = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState('');

	const handleLogin = (email: string, password: string) => {
		setIsLoggedIn(true);
		setUserName(email.split('@')[0]);
		toast({
			title: 'Успішний вхід',
			description: `Вітаю, ${email.split('@')[0]}!`,
		});
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
		setUserName('');
		toast({
			title: 'Ви вийшли з акаунта',
			description: 'До скорої зустрічі!',
		});
	};

	return {
		isLoggedIn,
		userName,
		handleLogin,
		handleLogout,
	};
};

export default useAuthActions;
