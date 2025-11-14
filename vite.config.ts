import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
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

export default defineConfig({
	plugins: [react(), tailwindcss()],
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
