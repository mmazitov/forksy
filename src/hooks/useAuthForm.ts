import { useState } from 'react';
import { toast } from 'sonner';

import { useAuthContext } from './useAuthContext';

import { useLoginMutation, useRegisterMutation } from '@/lib/graphql';

interface LoginData {
	email: string;
	password: string;
}

interface RegisterData {
	email: string;
	password: string;
	name: string;
}

export const useAuthForm = () => {
	const { login } = useAuthContext();
	const [registerUser, { loading: registerLoading }] = useRegisterMutation();
	const [loginUser, { loading: loginLoading }] = useLoginMutation();
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (data: LoginData) => {
		try {
			setError(null);
			const result = await loginUser({
				variables: {
					email: data.email,
					password: data.password,
				},
			});

			if (!result.data?.login) {
				throw new Error('Не вдалося увійти');
			}

			login(result.data.login.token, result.data.login.user);
			toast.success('Успішно увійшли');
			return true;
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Щось пішло не так';
			setError(errorMessage);
			toast.error(errorMessage);
			return false;
		}
	};

	const handleRegister = async (data: RegisterData) => {
		try {
			setError(null);
			const result = await registerUser({
				variables: {
					email: data.email,
					password: data.password,
					name: data.name,
				},
			});

			if (!result.data?.register) {
				throw new Error('Не вдалося зареєструватися');
			}

			login(result.data.register.token, result.data.register.user);
			toast.success('Успішно зареєструвалися');
			return true;
		} catch (err: unknown) {
			const errorMessage =
				err instanceof Error ? err.message : 'Щось пішло не так';
			setError(errorMessage);
			toast.error(errorMessage);
			return false;
		}
	};

	return {
		handleLogin,
		handleRegister,
		error,
		isLoading: registerLoading || loginLoading,
	};
};
