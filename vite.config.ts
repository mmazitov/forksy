import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

// Generate hash for a file
function generateFileHash(filePath: string): string {
	try {
		const content = fs.readFileSync(filePath);
		return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
	} catch (err) {
		return Date.now().toString();
	}
}

// Get build timestamp for cache busting
const buildTimestamp = new Date().toISOString();

// Generate hashes for critical assets
const logoPath = path.resolve(__dirname, './public/logo.svg');
const logoHash = generateFileHash(logoPath);

const swPath = path.resolve(__dirname, './public/sw.js');
const swHash = generateFileHash(swPath);

// Plugin to replace build hash in Service Worker
const swBuildHashPlugin = (): Plugin => {
	return {
		name: 'sw-build-hash',
		apply: 'build',
		async generateBundle() {
			const buildHash = buildTimestamp.slice(0, 10).replace(/-/g, '');
			
			// Replace hash in sw.js
			const swDistPath = path.resolve(__dirname, './dist/sw.js');
			if (fs.existsSync(swDistPath)) {
				let swContent = fs.readFileSync(swDistPath, 'utf-8');
				swContent = swContent.replace(/VITE_BUILD_HASH_PLACEHOLDER|BUILD_HASH_PLACEHOLDER/g, buildHash);
				fs.writeFileSync(swDistPath, swContent);
			}
			
			// Replace hash in sw/caches.js
			const cachesDistPath = path.resolve(__dirname, './dist/sw/caches.js');
			if (fs.existsSync(cachesDistPath)) {
				let cachesContent = fs.readFileSync(cachesDistPath, 'utf-8');
				cachesContent = cachesContent.replace(/BUILD_HASH_PLACEHOLDER/g, buildHash);
				fs.writeFileSync(cachesDistPath, cachesContent);
			}
		},
		async closeBundle() {
			// Keep placeholder in src for git
		},
	};
};

export default defineConfig({
	plugins: [react(), tailwindcss(), swBuildHashPlugin()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				// Add content hash to chunk filenames
				entryFileNames: 'assets/[name]-[hash].js',
				chunkFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
	define: {
		'import.meta.env.VITE_LOGO_HASH': JSON.stringify(logoHash),
		'import.meta.env.VITE_SW_HASH': JSON.stringify(swHash),
		'import.meta.env.VITE_BUILD_TIME': JSON.stringify(buildTimestamp),
	},
});
