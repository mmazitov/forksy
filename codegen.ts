import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:4000/graphql',
	documents: ['src/**/*.gql'],
	hooks: {
		afterOneFileWrite: ['prettier --write'],
	},
	generates: {
		'src/lib/graphql/generated/api.ts': {
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
		'src/lib/graphql/': {
			documents: 'src/**/*.gql',
			preset: 'near-operation-file',
			presetConfig: {
				extension: '.types.ts',
				baseTypesPath: './generated/api',
			},
			plugins: ['typescript-operations'],
			config: {
				noNamespaces: true,
				onlyOperationTypes: true,
				inlineFragmentTypes: 'combine',
				avoidOptionals: {
					field: true,
					inputValue: false,
					object: false,
					defaultValue: true,
				},
			},
		},
	},
};

export default config;
