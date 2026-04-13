import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.VITE_SITE_URL || 'https://mealvy.vercel.app';
const API_URL =
	process.env.VITE_API_URL || 'https://mealvy-backend.fly.dev/graphql';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// Limit dynamic content to prevent sitemap bloat
// Google will discover other pages through internal links
const MAX_ITEMS_PER_TYPE = 100;

// Static routes
const staticRoutes = [
	{ loc: '/', changefreq: 'daily', priority: '1.0' },
	{ loc: '/dishes', changefreq: 'daily', priority: '0.9' },
	{ loc: '/products', changefreq: 'daily', priority: '0.9' },
	{ loc: '/schedule', changefreq: 'weekly', priority: '0.8' },
	{ loc: '/menu-planner', changefreq: 'weekly', priority: '0.8' },
	{ loc: '/shopping-list', changefreq: 'weekly', priority: '0.7' },
	{ loc: '/favorites', changefreq: 'weekly', priority: '0.7' },
	{ loc: '/profile', changefreq: 'monthly', priority: '0.3' },
	{ loc: '/settings', changefreq: 'monthly', priority: '0.3' },
];

// Helper function to convert name to slug
function toSlug(name) {
	return name
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.trim();
}

// Fetch dishes from GraphQL API
// Only fetch recent/popular items to keep sitemap manageable
async function fetchDishes() {
	try {
		const query = `
			query GetAllDishes {
				dishes(limit: ${MAX_ITEMS_PER_TYPE}) {
					id
					name
					updatedAt
				}
			}
		`;

		const response = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query }),
		});

		const { data } = await response.json();
		return data?.dishes || [];
	} catch (error) {
		console.warn('⚠️  Failed to fetch dishes:', error.message);
		return [];
	}
}

// Fetch products from GraphQL API
// Only fetch recent/popular items to keep sitemap manageable
async function fetchProducts() {
	try {
		const query = `
			query GetAllProducts {
				products(limit: ${MAX_ITEMS_PER_TYPE}) {
					id
					name
					updatedAt
				}
			}
		`;

		const response = await fetch(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query }),
		});

		const { data } = await response.json();
		return data?.products || [];
	} catch (error) {
		console.warn('⚠️  Failed to fetch products:', error.message);
		return [];
	}
}

async function generateSitemap() {
	const today = new Date().toISOString().split('T')[0];

	// Fetch dynamic data
	const [dishes, products] = await Promise.all([
		fetchDishes(),
		fetchProducts(),
	]);

	// Generate static URLs
	const staticUrls = staticRoutes
		.map(
			(route) => `
	<url>
		<loc>${SITE_URL}${route.loc}</loc>
		<changefreq>${route.changefreq}</changefreq>
		<priority>${route.priority}</priority>
		<lastmod>${today}</lastmod>
	</url>`,
		)
		.join('');

	// Generate dish URLs
	const dishUrls = dishes
		.map((dish) => {
			const slug = toSlug(dish.name);
			let lastmod = today;
			if (dish.updatedAt) {
				const date = new Date(dish.updatedAt);
				if (!isNaN(date.getTime())) {
					lastmod = date.toISOString().split('T')[0];
				}
			}
			return `
	<url>
		<loc>${SITE_URL}/dishes/${slug}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		<lastmod>${lastmod}</lastmod>
	</url>`;
		})
		.join('');

	// Generate product URLs
	const productUrls = products
		.map((product) => {
			const slug = toSlug(product.name);
			let lastmod = today;
			if (product.updatedAt) {
				const date = new Date(product.updatedAt);
				if (!isNaN(date.getTime())) {
					lastmod = date.toISOString().split('T')[0];
				}
			}
			return `
	<url>
		<loc>${SITE_URL}/products/${slug}</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		<lastmod>${lastmod}</lastmod>
	</url>`;
		})
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<!-- Static Pages -->
${staticUrls}
	<!-- Dishes -->
${dishUrls}
	<!-- Products -->
${productUrls}
</urlset>
`;

	fs.writeFileSync(OUTPUT_PATH, sitemap.trim());

	const totalUrls = staticRoutes.length + dishes.length + products.length;
	console.log(
		`✅ Generated sitemap.xml with ${totalUrls} URLs (${staticRoutes.length} static, ${dishes.length}/${MAX_ITEMS_PER_TYPE} dishes, ${products.length}/${MAX_ITEMS_PER_TYPE} products)`,
	);
	console.log(
		`ℹ️  Note: Limited to ${MAX_ITEMS_PER_TYPE} items per type. Google will discover other pages through internal links.`,
	);
}

generateSitemap();
