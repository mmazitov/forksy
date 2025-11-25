import { z } from 'zod';

export const AuthSchema = z.object({
	name: z.string().min(3, { message: "Будь ласка, введіть ваше ім'я" }),
	email: z
		.string()
		.email({ message: 'Будь ласка, введіть дійсну електронну адресу' }),
	password: z
		.string()
		.min(6, { message: 'Пароль повинен містити щонайменше 6 символів' }),
});
