#!/usr/bin/env node
import fs from 'fs';
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

// Recursively find all .gql files
function findGqlFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			findGqlFiles(filePath, fileList);
		} else if (file.endsWith('.gql')) {
			fileList.push(filePath);
		}
	});
	return fileList;
}

const gqlFiles = findGqlFiles(path.join(__dirname, '../src'));

gqlFiles.forEach((gqlPath) => {
	const tsPath = gqlPath.replace('.gql', '.gen.ts');

	if (fs.existsSync(tsPath)) {
		let content = fs.readFileSync(tsPath, 'utf8');
		let modified = false;

		// Remove problematic Suspense overload signatures (keep only implementation)
		// Pattern 1: @ts-ignore followed by overloads
		const suspensePattern1 =
			/\/\/ @ts-ignore\s*\nexport function use\w+SuspenseQuery\([^)]*\)[^{;]*;[\s\S]*?(?=export function use\w+SuspenseQuery\([^)]*\)\s*{)/g;
		if (suspensePattern1.test(content)) {
			content = content.replace(suspensePattern1, '');
			modified = true;
		}

		// Pattern 2: Multiple overload signatures before implementation
		const suspensePattern2 =
			/(export function use(\w+)SuspenseQuery\([^)]*\)[^{;]*;\s*){2,}(?=export function use\2SuspenseQuery\([^)]*\)\s*{)/g;
		if (suspensePattern2.test(content)) {
			content = content.replace(suspensePattern2, '');
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

		const relativePath = path.relative(path.join(__dirname, '..'), tsPath);
		console.log(`✓ ${relativePath} generated`);
	}
});

console.log('✓ GraphQL generation completed');
