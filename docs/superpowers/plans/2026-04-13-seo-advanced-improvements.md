# SEO Advanced Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement advanced SEO features: dynamic sitemap generation, Schema.org component, breadcrumb navigation with schema, and prerendering with react-snap.

**Architecture:** 
- Extract Schema.org generation into reusable component
- Add dynamic sitemap generation from database
- Implement breadcrumb navigation with BreadcrumbList schema
- Configure react-snap for prerendering

**Tech Stack:** React 19, TypeScript, Vite, react-snap, existing utilities

---

## File Structure

**New Files:**
- `src/shared/components/schemaOrg/SchemaOrg.tsx` - Reusable Schema.org component
- `src/shared/components/breadcrumb/Breadcrumb.tsx` - Breadcrumb navigation component
- `scripts/generate-sitemap.cjs` - Dynamic sitemap generator
- `reactSnap.config.js` - react-snap configuration

**Modified Files:**
- `src/pages/DishDetail.tsx` - Use SchemaOrg component + Breadcrumb
- `src/pages/ProductDetail.tsx` - Use SchemaOrg component + Breadcrumb
- `src/pages/Home.tsx` - Use SchemaOrg component
- `package.json` - Add react-snap, sitemap generation script
- `vite.config.ts` - Configure for react-snap compatibility

---

## Task 1: Create Reusable SchemaOrg Component

**Files:**
- Create: `src/shared/components/schemaOrg/SchemaOrg.tsx`
- Create: `src/shared/components/schemaOrg/index.ts`

- [ ] **Step 1: Create SchemaOrg component**

```typescript
// src/shared/components/schemaOrg/SchemaOrg.tsx
interface SchemaOrgProps {
	schema: Record<string, unknown>;
}

export const SchemaOrg = ({ schema }: SchemaOrgProps) => {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
		/>
	);
};
```

- [ ] **Step 2: Create barrel export**

```typescript
// src/shared/components/schemaOrg/index.ts
export { SchemaOrg } from './SchemaOrg';
```

- [ ] **Step 3: Update shared components index**

Add to `src/shared/components/index.ts`:
```typescript
export { SchemaOrg } from './schemaOrg';
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/shared/components/schemaOrg/
git add src/shared/components/index.ts
git commit -m "feat(seo): add reusable SchemaOrg component"
```

---

## Task 2: Refactor Pages to Use SchemaOrg Component

**Files:**
- Modify: `src/pages/DishDetail.tsx`
- Modify: `src/pages/ProductDetail.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Update DishDetail.tsx**

Replace the inline script tag with:
```typescript
import { SchemaOrg } from '@/shared/components';

// ... inside return statement, replace the script tag:
<SchemaOrg schema={recipeSchema} />
```

- [ ] **Step 2: Update ProductDetail.tsx**

Replace the inline script tag with:
```typescript
import { SchemaOrg } from '@/shared/components';

// ... inside return statement, replace the script tag:
<SchemaOrg schema={productSchema} />
```

- [ ] **Step 3: Update Home.tsx**

Replace the inline script tag with:
```typescript
import { SchemaOrg } from '@/shared/components';

// ... inside return statement, replace the script tag:
<SchemaOrg schema={organizationSchema} />
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Test in browser**

Run: `yarn dev`
Check DevTools → Elements → Search for `application/ld+json`
Expected: Schema tags present on all pages

- [ ] **Step 6: Commit**

```bash
git add src/pages/DishDetail.tsx src/pages/ProductDetail.tsx src/pages/Home.tsx
git commit -m "refactor(seo): use SchemaOrg component in pages"
```

---

## Task 3: Create Breadcrumb Component with Schema

**Files:**
- Create: `src/shared/components/breadcrumb/Breadcrumb.tsx`
- Create: `src/shared/components/breadcrumb/index.ts`
- Modify: `src/shared/lib/utils/schemaOrg.ts`

- [ ] **Step 1: Add generateBreadcrumbSchema to schemaOrg.ts**

Add interface and function:
```typescript
export interface BreadcrumbItem {
	name: string;
	url: string;
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
};
```

- [ ] **Step 2: Create Breadcrumb component**

```typescript
// src/shared/components/breadcrumb/Breadcrumb.tsx
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SchemaOrg } from '@/shared/components';
import { generateBreadcrumbSchema } from '@/shared/lib/utils/schemaOrg';

interface BreadcrumbItem {
	name: string;
	url: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
	const schema = generateBreadcrumbSchema(items);

	return (
		<>
			<SchemaOrg schema={schema} />
			<nav aria-label="Breadcrumb" className="mb-4">
				<ol className="flex items-center gap-2 text-sm text-muted-foreground">
					{items.map((item, index) => (
						<li key={item.url} className="flex items-center gap-2">
							{index > 0 && <ChevronRight className="h-4 w-4" />}
							{index === items.length - 1 ? (
								<span className="font-medium text-foreground">{item.name}</span>
							) : (
								<Link
									to={item.url}
									className="hover:text-foreground transition-colors"
								>
									{item.name}
								</Link>
							)}
						</li>
					))}
				</ol>
			</nav>
		</>
	);
};
```

- [ ] **Step 3: Create barrel export**

```typescript
// src/shared/components/breadcrumb/index.ts
export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbItem } from './Breadcrumb';
```

- [ ] **Step 4: Update shared components index**

Add to `src/shared/components/index.ts`:
```typescript
export { Breadcrumb } from './breadcrumb';
export type { BreadcrumbItem } from './breadcrumb';
```

- [ ] **Step 5: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 6: Commit**

```bash
git add src/shared/components/breadcrumb/ src/shared/lib/utils/schemaOrg.ts src/shared/components/index.ts
git commit -m "feat(seo): add Breadcrumb component with BreadcrumbList schema"
```

---

## Task 4: Add Breadcrumbs to Detail Pages

**Files:**
- Modify: `src/pages/DishDetail.tsx`
- Modify: `src/pages/ProductDetail.tsx`

- [ ] **Step 1: Add breadcrumbs to DishDetail.tsx**

Import and add before the back button:
```typescript
import { Breadcrumb } from '@/shared/components';
import { METADATA_CONFIG } from '@/shared/lib/config';

// ... inside return statement, before the Link/Button:
const breadcrumbItems = [
	{ name: 'Головна', url: '/' },
	{ name: 'Страви', url: '/dishes' },
	{ name: dish.name, url: `/dishes/${id}` },
];

return (
	<div className="container mx-auto px-4 py-8">
		<MetaData ... />
		<SchemaOrg schema={recipeSchema} />
		<Breadcrumb items={breadcrumbItems} />
		{/* Rest of the component */}
```

- [ ] **Step 2: Add breadcrumbs to ProductDetail.tsx**

Import and add before the back button:
```typescript
import { Breadcrumb } from '@/shared/components';

// ... inside return statement:
const breadcrumbItems = [
	{ name: 'Головна', url: '/' },
	{ name: 'Продукти', url: '/products' },
	{ name: product.name, url: `/products/${id}` },
];

return (
	<div className="container mx-auto px-4 py-8">
		<MetaData ... />
		<SchemaOrg schema={productSchema} />
		<Breadcrumb items={breadcrumbItems} />
		{/* Rest of the component */}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Test in browser**

Run: `yarn dev`
Navigate to dish/product detail page
Expected: Breadcrumb navigation visible, BreadcrumbList schema in DevTools

- [ ] **Step 5: Commit**

```bash
git add src/pages/DishDetail.tsx src/pages/ProductDetail.tsx
git commit -m "feat(seo): add breadcrumb navigation to detail pages"
```

---

## Task 5: Create Dynamic Sitemap Generator

**Files:**
- Create: `scripts/generate-sitemap.cjs`
- Modify: `package.json`

- [ ] **Step 1: Create sitemap generator script**

```javascript
// scripts/generate-sitemap.cjs
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
```

- [ ] **Step 2: Add sitemap generation script to package.json**

Add to `scripts` section:
```json
{
	"scripts": {
		"generate:sitemap": "node scripts/generate-sitemap.cjs",
		"prebuild": "yarn generate:sitemap"
	}
}
```

- [ ] **Step 3: Test sitemap generation**

Run: `yarn generate:sitemap`
Expected: `✅ Generated sitemap.xml with 9 URLs`

- [ ] **Step 4: Verify sitemap content**

Run: `cat public/sitemap.xml | head -20`
Expected: Valid XML with current date

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-sitemap.cjs package.json
git commit -m "feat(seo): add dynamic sitemap generation script"
```

---

## Task 6: Install and Configure react-snap

**Files:**
- Modify: `package.json`
- Create: `reactSnap.config.js`
- Modify: `src/main.tsx`

- [ ] **Step 1: Install react-snap**

```bash
yarn add -D react-snap
```

- [ ] **Step 2: Create react-snap configuration**

```javascript
// reactSnap.config.js
module.exports = {
	publicPath: '/',
	minifyHtml: {
		collapseWhitespace: true,
		removeComments: true,
	},
	// Include routes to prerender
	include: [
		'/',
		'/dishes',
		'/products',
		'/schedule',
		'/menu-planner',
		'/shopping-list',
		'/favorites',
	],
	// Skip auth routes
	skipThirdPartyRequests: true,
	// Headless Chrome options
	puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
};
```

- [ ] **Step 3: Update package.json scripts**

Add postbuild script:
```json
{
	"scripts": {
		"postbuild": "react-snap"
	}
}
```

- [ ] **Step 4: Update main.tsx for hydration**

Replace `ReactDOM.createRoot` with hydration support:
```typescript
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';

import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element not found');
}

// Support both SSR hydration and client-side rendering
if (rootElement.hasChildNodes()) {
	ReactDOM.hydrateRoot(
		rootElement,
		<StrictMode>
			<App />
		</StrictMode>
	);
} else {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
```

- [ ] **Step 5: Update vite.config.ts for react-snap compatibility**

Add to `build` section:
```typescript
export default defineConfig({
	// ... existing config
	build: {
		// ... existing build config
		// Ensure assets are properly hashed for caching
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
});
```

- [ ] **Step 6: Test build with react-snap**

Run: `yarn build`
Expected: Build succeeds, react-snap prerenders pages

- [ ] **Step 7: Verify prerendered HTML**

Run: `ls -la dist/*.html`
Expected: Multiple HTML files (index.html, dishes/index.html, etc.)

- [ ] **Step 8: Commit**

```bash
git add package.json reactSnap.config.js src/main.tsx vite.config.ts yarn.lock
git commit -m "feat(seo): add react-snap for prerendering"
```

---

## Task 7: Update SEO Documentation

**Files:**
- Modify: `docs/seo.md`

- [ ] **Step 1: Add advanced features section**

Add to `docs/seo.md`:
```markdown
## Advanced Features

### Dynamic Sitemap Generation

**Script:** `scripts/generate-sitemap.cjs`

Automatically generates sitemap before each build with current date.

**Usage:**
```bash
yarn generate:sitemap
```

**Future:** Extend to fetch dishes/products from API for dynamic URLs.

### Schema.org Component

**Component:** `src/shared/components/schemaOrg/SchemaOrg.tsx`

Reusable component for rendering JSON-LD schema markup.

**Usage:**
```typescript
import { SchemaOrg } from '@/shared/components';

const schema = generateRecipeSchema({ ... });

<SchemaOrg schema={schema} />
```

### Breadcrumb Navigation

**Component:** `src/shared/components/breadcrumb/Breadcrumb.tsx`

Breadcrumb navigation with BreadcrumbList schema for better SEO.

**Usage:**
```typescript
import { Breadcrumb } from '@/shared/components';

const items = [
	{ name: 'Home', url: '/' },
	{ name: 'Dishes', url: '/dishes' },
	{ name: 'Dish Name', url: '/dishes/dish-name' },
];

<Breadcrumb items={items} />
```

### Prerendering with react-snap

**Configuration:** `reactSnap.config.js`

Prerenders static HTML for all routes to improve initial SEO and load times.

**Routes prerendered:**
- Home, Dishes, Products, Schedule, Menu Planner, Shopping List, Favorites

**Build process:**
1. `yarn build` → Vite builds app
2. `postbuild` → react-snap prerenders routes
3. Result: Static HTML files in `dist/`
```

- [ ] **Step 2: Commit**

```bash
git add docs/seo.md
git commit -m "docs(seo): document advanced SEO features"
```

---

## Task 8: Final Verification and Testing

**Files:**
- None (testing only)

- [ ] **Step 1: Clean build**

```bash
rm -rf dist
yarn build
```

Expected: Build succeeds with sitemap generation and prerendering

- [ ] **Step 2: Verify prerendered files**

```bash
ls -la dist/*.html dist/dishes/ dist/products/
```

Expected: Multiple HTML files with prerendered content

- [ ] **Step 3: Check prerendered HTML content**

```bash
cat dist/index.html | grep -A 5 "application/ld+json"
```

Expected: Schema.org markup present in static HTML

- [ ] **Step 4: Test production build locally**

```bash
yarn preview
```

Navigate to various pages, check:
- Breadcrumbs visible on detail pages
- Schema.org in DevTools
- Fast initial load (prerendered)

- [ ] **Step 5: Validate schemas**

Copy JSON-LD from prerendered HTML
Paste into https://validator.schema.org/
Expected: No errors for Recipe, Product, Organization, Breadcrumb schemas

- [ ] **Step 6: Create summary commit**

```bash
git add -A
git commit -m "feat(seo): complete advanced SEO improvements

- Add reusable SchemaOrg component
- Add Breadcrumb component with BreadcrumbList schema
- Add dynamic sitemap generation
- Add react-snap prerendering
- Update documentation

All schemas validated, prerendering working correctly."
```

---

## Post-Implementation Notes

### react-snap Considerations

1. **Build Time:** Prerendering adds ~30-60s to build time
2. **Routes:** Update `reactSnap.config.js` when adding new public routes
3. **Dynamic Content:** Prerendering works best for static/semi-static pages
4. **Auth Routes:** Excluded from prerendering (profile, settings)

### Dynamic Sitemap Future

To add dynamic dish/product URLs:
1. Create API endpoint to fetch all dishes/products
2. Update `generate-sitemap.cjs` to fetch and include them
3. Consider sitemap index for large datasets (>50k URLs)

### Breadcrumb Best Practices

- Always start with "Home"
- Keep hierarchy logical (Home → Category → Item)
- Update breadcrumbs when route structure changes
- Test with Google Rich Results Test

### Monitoring

After deployment:
- Check Google Search Console for breadcrumb rich results
- Monitor Core Web Vitals (prerendering should improve LCP)
- Validate all schema types remain error-free
