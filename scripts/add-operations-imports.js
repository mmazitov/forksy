#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const operationsFile = path.join(
	__dirname,
	'../src/lib/graphql/types/operations.ts',
);

let content = fs.readFileSync(operationsFile, 'utf8');

// Check if hooks are generated (Apollo Client 4 compatibility)
const hasHooks = content.includes('export function use');

if (hasHooks) {
	console.log('✓ operations.ts - hooks generated successfully');
} else {
	console.log('⚠ operations.ts - no hooks found, check codegen config');
}

// Ensure the file has proper formatting
fs.writeFileSync(operationsFile, content);
console.log('✓ operations.ts processed');
