#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const operationsFile = path.join(
	__dirname,
	'../src/lib/graphql/types/operations.ts',
);

const importStatement = "import type { Exact, InputMaybe, Scalars } from './api';\n\n";

let content = fs.readFileSync(operationsFile, 'utf8');

// Remove existing import if present
content = content.replace(
	/import type \{ Exact, InputMaybe, Scalars \} from '\.\/api';\n\n/,
	'',
);

// Add import at the beginning
if (!content.startsWith(importStatement)) {
	content = importStatement + content;
	fs.writeFileSync(operationsFile, content);
	console.log('✓ operations.ts');
}
