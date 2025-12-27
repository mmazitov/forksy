#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { typeDefs } from '../server/schema.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, '../server/schema.graphql');

try {
	fs.writeFileSync(schemaPath, typeDefs.loc.source.body);
	console.log('✓ GraphQL schema exported to server/schema.graphql');
} catch (error) {
	console.error('✗ Failed to generate schema:', error.message);
	process.exit(1);
}
