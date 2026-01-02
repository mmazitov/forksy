#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

		// Remove Suspense query functions
		const suspenseFunctionPattern =
			/export function use\w+SuspenseQuery\([^)]*\)[^{]*\{[\s\S]*?\n\}\n/g;
		if (suspenseFunctionPattern.test(content)) {
			content = content.replace(suspenseFunctionPattern, '');
			modified = true;
		}

		// Remove Suspense type exports
		const suspenseTypePattern =
			/export type \w+SuspenseQueryHookResult = ReturnType<[\s\S]*?typeof use\w+SuspenseQuery[\s\S]*?>;\n/g;
		if (suspenseTypePattern.test(content)) {
			content = content.replace(suspenseTypePattern, '');
			modified = true;
		}

		if (modified) {
			fs.writeFileSync(tsPath, content);
		}

		const relativePath = path.relative(path.join(__dirname, '..'), tsPath);
		console.log(`✓ ${relativePath}`);
	}
});

console.log('✓ GraphQL generation completed');
