'use server';

import prisma from '@/lib/db/prisma';
import { translationSchema } from '@/lib/utils/schemas/validate';

export async function createTranslation(data: {
	ukrainian: string;
	english: string;
}) {
	try {
		// Validate the input data
		const validatedData = translationSchema.parse(data);

		const translation = await prisma.translations.create({
			data: {
				ukrainian: validatedData.ukrainian.trim(),
				english: validatedData.english.trim(),
			},
		});

		return { success: true, translation };
	} catch (error) {
		console.error('Error creating translation:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to create translation',
		};
	}
}

export async function getTranslations() {
	try {
		const translations = await prisma.translations.findMany({
			orderBy: {
				id: 'desc',
			},
		});
		return { success: true, translations };
	} catch (error) {
		console.error('Error fetching translations:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to fetch translations',
		};
	}
}

export async function updateTranslation(
	id: string,
	data: { ukrainian: string; english: string },
) {
	try {
		const validatedData = translationSchema.parse(data);

		const translation = await prisma.translations.update({
			where: { id },
			data: {
				ukrainian: validatedData.ukrainian.trim(),
				english: validatedData.english.trim(),
			},
		});

		return { success: true, translation };
	} catch (error) {
		console.error('Error updating translation:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to update translation',
		};
	}
}

export async function checkTranslationExists(ukrainian: string) {
	try {
		const translation = await prisma.translations.findFirst({
			where: {
				ukrainian: {
					equals: ukrainian.trim(),
					mode: 'insensitive',
				},
			},
		});

		const exists = !!translation;
		const message = exists
			? `Переклад "${translation.ukrainian}" вже існує`
			: '';

		return {
			success: true,
			exists,
			message,
			existingTranslation: exists ? translation : null,
		};
	} catch (error) {
		console.error('Error checking translation:', error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to check translation',
		};
	}
}
