#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const typesDir = path.join(__dirname, '../src/lib/graphql/types');

const files = ['api.ts', 'types.ts', 'hooks.ts'];

files.forEach((file) => {
	const filePath = path.join(typesDir, file);
	if (fs.existsSync(filePath)) {
		console.log(`✓ ${file} generated`);
	} else {
		console.log(`⚠ ${file} not found`);
	}
});

// Add document re-exports without 'Document' suffix for hooks compatibility
const typesFile = path.join(typesDir, 'types.ts');
if (fs.existsSync(typesFile)) {
	let content = fs.readFileSync(typesFile, 'utf8');

	// Find all *Document exports and create aliases without suffix
	const documentExports = content.match(/export const (\w+)Document = /g);
	if (documentExports) {
		const aliases = documentExports
			.map((match) => {
				const name = match.match(/export const (\w+)Document = /)[1];
				return `export { ${name}Document as ${name} };`;
			})
			.join('\n');

		// Check if aliases already exist
		if (!content.includes('// Document aliases for hooks')) {
			content += `\n// Document aliases for hooks\n${aliases}\n`;
			fs.writeFileSync(typesFile, content);
			console.log('✓ types.ts - document aliases added');
		}
	}
}

// Fix hooks.ts - remove problematic Suspense overloads
const hooksFile = path.join(typesDir, 'hooks.ts');
if (fs.existsSync(hooksFile)) {
	let content = fs.readFileSync(hooksFile, 'utf8');

	// Remove @ts-ignore and problematic Suspense overloads (keep only the implementation)
	// Pattern: multiple function declarations for same SuspenseQuery
	const suspensePattern =
		/\/\/ @ts-ignore\nexport function use\w+SuspenseQuery\([^)]*\)[^;]+;\nexport function use\w+SuspenseQuery\([^)]*\)[^;]+;/g;
	content = content.replace(suspensePattern, '');

	// Remove unused import if ApolloReactCommon is not used
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
	}

	fs.writeFileSync(hooksFile, content);

	const hasHooks = content.includes('export function use');
	if (hasHooks) {
		console.log('✓ hooks.ts - React hooks processed successfully');
	}
}
