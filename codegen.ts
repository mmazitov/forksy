import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: 'server/schema.ts',
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
		// Generate operations types and hooks
		'src/lib/graphql/types/operations.ts': {
			plugins: ['typescript-operations', 'typescript-react-apollo'],
			preset: 'import-types',
			presetConfig: {
				typesPath: './api',
			},
			config: {
				noNamespaces: true,
				inlineFragmentTypes: 'combine',
				preResolveTypes: true,
				skipTypename: false,
				withHooks: true,
				withHOC: false,
				withComponent: false,
				useTypeImports: true,
				// Apollo Client 4 specific settings
				apolloClientVersion: 4,
				addDocBlocks: false,
				// Generate document nodes for operations
				documentMode: 'documentNode',
				gqlImport: '@apollo/client#gql',
				// Apollo Client 4 uses /react subpath for hooks
				apolloReactHooksImportFrom: '@apollo/client/react',
			},
		},
	},
};

export default config;
