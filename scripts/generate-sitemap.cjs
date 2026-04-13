const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.VITE_SITE_URL || 'https://mealvy.vercel.app';
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

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

// TODO: In future, fetch dynamic routes from API
// const dishes = await fetchDishes();
// const products = await fetchProducts();

function generateSitemap() {
	const today = new Date().toISOString().split('T')[0];

	const urls = staticRoutes
		.map(
			(route) => `
	<url>
		<loc>${SITE_URL}${route.loc}</loc>
		<changefreq>${route.changefreq}</changefreq>
		<priority>${route.priority}</priority>
		<lastmod>${today}</lastmod>
	</url>`
		)
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<!-- Home -->
${urls}
</urlset>
`;

	fs.writeFileSync(OUTPUT_PATH, sitemap.trim());
	console.log(`✅ Generated sitemap.xml with ${staticRoutes.length} URLs`);
}

generateSitemap();
