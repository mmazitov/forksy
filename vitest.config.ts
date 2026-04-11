import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'src/test/',
				'**/*.d.ts',
				'**/*.config.*',
				'**/mockData',
				'dist/',
				'**/__tests__/**',
				'**/index.ts',
				'**/main.tsx',
				'src/shared/api/graphql/**',
				'scripts/**',
				'public/**',
				'codegen.ts',
				'src/pages/**',
				'src/app/providers/**',
				'src/app/routes/**',
				'src/app/App.tsx',
				'src/shared/lib/hoc/**',
				'src/shared/lib/config/**',
				'src/shared/types/**',
				'**/types.ts',
			],
			thresholds: {
				lines: 25,
				functions: 20,
				branches: 50,
				statements: 25,
			},
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
