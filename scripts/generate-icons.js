#!/usr/bin/env node

/**
 * Icon generator script
 * Generates different icon sizes with content at 50% of the total size
 * This leaves plenty of space around the icon for better Android appearance
 *
 * Usage: node scripts/generate-icons.js
 * Requires: npm install sharp
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Find source icon
let sourceIcon = path.join(__dirname, '../public/original.png');
if (!fs.existsSync(sourceIcon)) {
	console.error('❌ Source icon not found at:', sourceIcon);
	process.exit(1);
}

const publicDir = path.join(__dirname, '../public');
const sizes = [96, 128, 192, 512];
const CONTENT_RATIO = 0.7; // Content will be 70% of total size for compact appearance

async function generateIcons() {
	try {
		console.log('🎨 Generating icon sizes with large margins...');

		// Read source as buffer
		const sourceBuffer = fs.readFileSync(sourceIcon);

		for (const size of sizes) {
			const outputPath = path.join(publicDir, `icon-${size}.png`);
			const contentSize = Math.floor(size * CONTENT_RATIO);
			const margin = Math.floor((size - contentSize) / 2);

			// Resize source to content size with transparent background
			const resized = await sharp(sourceBuffer)
				.resize(contentSize, contentSize, {
					fit: 'contain',
					background: { r: 0, g: 0, b: 0, alpha: 0 },
				})
				.toBuffer();

			// Create final icon with white background and centered content
			await sharp({
				create: {
					width: size,
					height: size,
					channels: 4,
					background: { r: 255, g: 255, b: 255, alpha: 1 },
				},
			})
				.composite([
					{
						input: resized,
						top: margin,
						left: margin,
					},
				])
				.png({ quality: 90 })
				.toFile(outputPath);

			const fileSize = fs.statSync(outputPath).size;
			console.log(
				`✓ Generated icon-${size}.png (${(fileSize / 1024).toFixed(2)} KB) - content: ${contentSize}x${contentSize}px with ${margin}px margin`,
			);
		}

		console.log('✅ All icons generated successfully!');
		console.log(
			'📝 Icons now have 50% content size with 50% margin for compact appearance',
		);
	} catch (error) {
		console.error('❌ Error generating icons:', error);
		process.exit(1);
	}
}

generateIcons();
