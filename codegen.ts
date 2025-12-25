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
		// Operation types and document nodes
		'src/lib/graphql/types/types.ts': {
			plugins: ['typescript-operations', 'typed-document-node'],
			preset: 'import-types',
			presetConfig: {
				typesPath: './api',
			},
			config: {
				noNamespaces: true,
				inlineFragmentTypes: 'combine',
				preResolveTypes: true,
				skipTypename: false,
				useTypeImports: true,
			},
		},
		// React Apollo hooks (separate file)
		'src/lib/graphql/types/hooks.ts': {
			plugins: ['typescript-react-apollo'],
			preset: 'import-types',
			presetConfig: {
				typesPath: './types',
			},
			config: {
				noNamespaces: true,
				withHooks: true,
				withHOC: false,
				withComponent: false,
				useTypeImports: true,
				// Apollo Client 4 specific settings
				apolloClientVersion: 4,
				addDocBlocks: false,
				documentMode: 'external',
				importDocumentNodeExternallyFrom: './types',
				// Match the document variable name suffix
				documentVariableSuffix: 'Document',
				// Apollo Client 4 uses /react subpath for hooks and types
				apolloReactHooksImportFrom: '@apollo/client/react',
				apolloReactCommonImportFrom: '@apollo/client/react',
				// Skip result types that don't exist in Apollo 4
				withResultType: false,
				withMutationFn: false,
				withMutationOptionsType: false,
				// Skip Suspense hooks due to overload issues
				withSuspenseQuery: false,
			},
		},
	},
};

export default config;
