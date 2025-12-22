import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:4000/graphql',
	documents: ['src/**/*.gql'],
	hooks: {
		afterOneFileWrite: ['prettier --write'],
	},
	generates: {
		// Base types from schema
		'src/lib/graphql/types/api.ts': {
			plugins: ['typescript'],
			config: {
				noNamespaces: true,
				avoidOptionals: {
					field: true,
					inputValue: false,
					object: false,
					defaultValue: true,
				},
			},
		},
		// All operation types in one file (cleaner for v4)
		'src/lib/graphql/types/operations.ts': {
			documents: 'src/**/*.gql',
			plugins: ['typescript-operations'],
			config: {
				noNamespaces: true,
				onlyOperationTypes: true,
				inlineFragmentTypes: 'combine',
				preResolveTypes: true,
			},
		},
	},
};

export default config;
