import { PrismaClient } from '@prisma/client';

import { foodTranslations } from '../src/data/foodTranslations';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting seed...');

	const entries = Object.entries(foodTranslations);

	for (const [ukrainian, english] of entries) {
		try {
			await prisma.translations.create({
				data: {
					ukrainian,
					english,
				},
			});
			console.log(`Created translation: ${ukrainian} -> ${english}`);
		} catch {
			// Skip duplicates due to unique constraint
			console.log(`Skipping duplicate: ${ukrainian}`);
		}
	}

	console.log('Seed completed!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
