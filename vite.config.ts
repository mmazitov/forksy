import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';

function generateFileHash(filePath: string) {
	try {
		const content = fs.readFileSync(filePath);
		return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
	} catch (err) {
		return Date.now().toString();
	}
}

const logoPath = path.resolve(__dirname, './public/logo.svg');
const logoHash = generateFileHash(logoPath);

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	define: {
		'import.meta.env.VITE_LOGO_HASH': JSON.stringify(logoHash),
	},
});
