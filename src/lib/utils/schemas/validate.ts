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

export const translationSchema = z.object({
	ukrainian: z.string().trim().min(1, "Назва обов'язкова"),
	english: z.string().trim().min(1, "Назва обов'язкова"),
});

export const productSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	category: z.string().trim().min(1, 'Category is required'),
	calories: z.number().min(0, 'Calories must be a positive number').nullish(),
	protein: z.number().min(0, 'Protein must be a positive number').nullish(),
	fat: z.number().min(0, 'Fat must be a positive number').nullish(),
	carbohydrates: z
		.number()
		.min(0, 'Carbohydrates must be a positive number')
		.nullish(),
	image: z.string().trim().optional(),
});
