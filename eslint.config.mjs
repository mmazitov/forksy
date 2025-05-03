import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: {}, // ESLint 9+ fix
});

const eslintConfig = [
	...compat.config({
		extends: [
			'next/core-web-vitals',
			'next/typescript',
			'prettier',
			'plugin:import/errors',
			'plugin:import/warnings',
		],
		plugins: ['import'],
		rules: {
			semi: ['error', 'always'],
			'react/jsx-pascal-case': 'error',
			'prefer-arrow-callback': 'error',
			'prefer-template': 'error',
			'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
			'react/react-in-jsx-scope': 'off',
			'@next/next/no-img-element': 'off',
			'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
			'no-var': 'error',
			'no-unused-vars': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
					ignoreRestSiblings: true,
					destructuredArrayIgnorePattern: '^_',
				},
			],
			'import/order': [
				'error',
				{
					groups: [
						['builtin', 'external'],
						['internal'],
						['parent', 'sibling', 'index'],
					],
					'newlines-between': 'always',
					// alphabetize: { order: 'asc', caseInsensitive: true },
				},
			],
			'jsx-a11y/anchor-is-valid': [
				'error',
				{
					components: ['Link'],
					specialLink: ['hrefLeft', 'hrefRight'],
					aspects: ['invalidHref', 'preferButton'],
				},
			],
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'import/no-unresolved': [
				'error',
				{
					ignore: ['^@/'],
				},
			],
		},
		settings: {
			react: {
				version: 'detect',
			},
			'import/resolver': {
				alias: {
					map: [['@', './']],
					extensions: ['.ts', '.tsx', '.js', '.jsx'],
				},
			},
		},
	}),
];

export default eslintConfig;