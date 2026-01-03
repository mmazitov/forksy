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
		'src/types/api.ts': {
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
		// Generate hooks next to .gql files
		'src/': {
			preset: 'near-operation-file',
			presetConfig: {
				extension: '.gen.ts',
				baseTypesPath: '~@/types/api',
			},
			plugins: ['typescript-operations', 'typescript-react-apollo'],
			config: {
				noNamespaces: true,
				inlineFragmentTypes: 'combine',
				preResolveTypes: true,
				skipTypename: false,
				useTypeImports: true,
				// Apollo Client 4 specific settings
				apolloClientVersion: 4,
				withHooks: true,
				withHOC: false,
				withComponent: false,
				addDocBlocks: false,
				// Apollo Client 4 uses /react subpath for hooks
				apolloReactHooksImportFrom: '@apollo/client/react',
				apolloReactCommonImportFrom: '@apollo/client/react',
				// Skip result types that don't exist in Apollo 4
				withResultType: false,
				withMutationFn: false,
				withMutationOptionsType: false,
				skipDocumentsValidation: true,
				// Generate gql documents
				documentMode: 'documentNode',
				gqlImport: '@apollo/client#gql',
			},
		},
	},
};

export default config;
