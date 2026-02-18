import { z } from 'zod';

export const DishSchema = z.object({
	name: z.string().min(1, "Назва обов'язкова"),
	category: z.string().min(1, "Категорія обов'язкова"),
	imageUrl: z.string().url('Невірний URL').optional().or(z.literal('')),
	calories: z.number().min(0, 'Мінімум 0'),
	protein: z.number().min(0, 'Мінімум 0'),
	fat: z.number().min(0, 'Мінімум 0'),
	carbs: z.number().min(0, 'Мінімум 0'),
	description: z.string().optional(),
	prepTime: z.number().min(0, 'Мінімум 0'),
	servings: z.number().min(0, 'Мінімум 0'),
	ingredients: z.array(z.string()).min(1, 'Мінімум 1 інгредієнт'),
	instructions: z.array(z.string()).min(1, 'Мінімум 1 інструкція'),
});
