import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'public/sw.js',
			'public/sw/**',
			'*.config.js',
			'*.config.ts',
			'codegen.ts',
			// Generated files
			'src/shared/api/graphql/*.gen.ts',
			'src/shared/types/api.ts',
			// Scripts (Node.js)
			'scripts/**/*.js',
			'scripts/**/*.cjs',
		],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	react.configs.flat.recommended,
	react.configs.flat['jsx-runtime'],
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			import: importPlugin,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			// 🔹 TypeScript / JS
			semi: ['error', 'always'],
			'no-var': 'error',
			'prefer-const': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: true,
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_',
				},
			],

			// 🔹 React
			'react/jsx-pascal-case': 'error',
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// 🔹 Import
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						['internal'],
						['parent', 'sibling', 'index'],
					],
					'newlines-between': 'always',
				},
			],

			// 🔹 React Refresh
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
		},
	},
];
