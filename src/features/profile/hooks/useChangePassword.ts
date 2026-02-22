import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useChangePasswordMutation } from '@/shared/api/graphql/profile.gen';
import {
	ChangePasswordFormData,
	ChangePasswordSchema,
} from '@/shared/lib/utils/schemas';

export const useChangePassword = () => {
	const [changePassword, { loading }] = useChangePasswordMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ChangePasswordFormData>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: ChangePasswordFormData) => {
		try {
			const result = await changePassword({
				variables: {
					currentPassword: data.currentPassword,
					newPassword: data.newPassword,
				},
			});

			if (result.data?.changePassword) {
				toast.success('Пароль успішно змінено!');
				reset();
			}
		} catch (error: unknown) {
			const message =
				error instanceof Error ? error.message : 'Помилка зміни пароля';

			if (message.includes('Current password is incorrect')) {
				toast.error('Поточний пароль невірний');
			} else if (message.includes('OAuth accounts')) {
				toast.error('Зміна пароля недоступна для OAuth акаунтів');
			} else {
				toast.error('Помилка при зміні пароля');
			}

			console.error(error);
		}
	};

	return {
		register,
		handleSubmit,
		errors,
		loading,
		onSubmit,
	};
};
