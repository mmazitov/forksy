import { useState } from 'react';
import { toast } from 'sonner';

import { useAuthContext } from './useAuthContext';

import { useLoginMutation, useRegisterMutation } from '@/shared/api/graphql';
import { AuthLoginData, AuthRegisterData } from '@/shared/types';

export const useAuthForm = () => {
	const { login } = useAuthContext();
	const [registerUser, { loading: registerLoading }] = useRegisterMutation();
	const [loginUser, { loading: loginLoading }] = useLoginMutation();
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (data: AuthLoginData) => {
		try {
			setError(null);
			const result = await loginUser({
				variables: {
					email: data.email,
					password: data.password,
				},
			});

			if (!result.data?.login?.user) {
				throw new Error('Не вдалося увійти');
			}

			const { user } = result.data.login;
			login(user);
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

	const handleRegister = async (data: AuthRegisterData) => {
		try {
			setError(null);
			const result = await registerUser({
				variables: {
					email: data.email,
					password: data.password,
					name: data.name,
				},
			});

			if (!result.data?.register?.user) {
				throw new Error('Не вдалося зареєструватися');
			}

			const { user } = result.data.register;
			login(user);
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
