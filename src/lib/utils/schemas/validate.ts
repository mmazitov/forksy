import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	password: z
		.string()
		.min(1, { message: 'Password must be at least 6 characters long' }),
});

export const signUpSchema = signInSchema.extend({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(1, 'Password must be at least 6 characters long'),
	confirmPassword: z.string().min(1, 'Confirm Password is required'),
});
