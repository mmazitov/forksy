#!/usr/bin/env node
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src');

// Check api.ts
const apiFile = path.join(srcDir, 'types/api.ts');
if (fs.existsSync(apiFile)) {
	console.log('✓ types/api.ts generated');
} else {
	console.log('⚠ types/api.ts not found');
}

// Find all generated .ts files next to .gql files
const gqlFiles = glob.sync('src/**/*.gql', { cwd: path.join(__dirname, '..') });

gqlFiles.forEach((gqlFile) => {
	const tsFile = gqlFile.replace('.gql', '.ts');
	const tsPath = path.join(__dirname, '..', tsFile);

	if (fs.existsSync(tsPath)) {
		let content = fs.readFileSync(tsPath, 'utf8');
		let modified = false;

		// Remove @ts-ignore and problematic Suspense overloads
		const suspensePattern =
			/\/\/ @ts-ignore\nexport function use\w+SuspenseQuery\([^)]*\)[^;]+;\nexport function use\w+SuspenseQuery\([^)]*\)[^;]+;/g;
		if (suspensePattern.test(content)) {
			content = content.replace(suspensePattern, '');
			modified = true;
		}

		// Remove unused ApolloReactCommon import
		if (
			!content.includes('ApolloReactCommon.') &&
			content.includes(
				"import type * as ApolloReactCommon from '@apollo/client/react';",
			)
		) {
			content = content.replace(
				"import type * as ApolloReactCommon from '@apollo/client/react';\n",
				'',
			);
			modified = true;
		}

		if (modified) {
			fs.writeFileSync(tsPath, content);
		}

		console.log(`✓ ${tsFile} generated`);
	}
});
