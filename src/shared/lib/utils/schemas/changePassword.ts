import { z } from 'zod/v4';

export const ChangePasswordSchema = z
	.object({
		currentPassword: z.string().min(1, "Поточний пароль є обов'язковим"),
		newPassword: z
			.string()
			.min(8, 'Новий пароль повинен містити щонайменше 8 символів'),
		confirmPassword: z.string().min(1, 'Підтвердіть пароль'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'Паролі не збігаються',
		path: ['confirmPassword'],
	});

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;
