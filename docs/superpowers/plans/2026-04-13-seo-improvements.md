# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix critical SEO issues identified in audit: sitemap, meta tags, Schema.org markup, domain configuration, and og-image.

**Architecture:** Add static SEO infrastructure (sitemap, og-image), update configuration to use correct domain, implement Schema.org JSON-LD on detail pages, add fallback meta tags to index.html.

**Tech Stack:** React 19, TypeScript, Vite, react-head, existing Schema.org utilities

---

## File Structure

**New Files:**
- `public/sitemap.xml` - Static sitemap with all routes
- `public/og-image.jpg` - Open Graph image (1200x630px)
- `scripts/generate-sitemap.js` - Script to generate sitemap from routes

**Modified Files:**
- `index.html` - Add fallback SEO meta tags
- `.env.example` - Add VITE_SITE_URL
- `src/shared/lib/config/metaDataConfig.ts` - Use environment variable for domain
- `src/pages/DishDetail.tsx` - Add Recipe Schema.org markup
- `src/pages/ProductDetail.tsx` - Add Product Schema.org markup
- `src/pages/Home.tsx` - Add Organization Schema.org markup
- `package.json` - Add sitemap generation script

---

## Task 1: Add Environment Variable for Site URL

**Files:**
- Modify: `.env.example`
- Create: `.env.local` (if not exists)

- [ ] **Step 1: Add VITE_SITE_URL to .env.example**

```bash
# .env.example
# API URL
# For development
VITE_API_URL="http://localhost:4000/graphql"

# For production (update with your actual Render backend URL)
# VITE_API_URL="https://mealvy-backend.onrender.com/graphql"

# Site URL for SEO meta tags
VITE_SITE_URL="https://mealvy.vercel.app"
```

- [ ] **Step 2: Create .env.local with production URL**

```bash
echo 'VITE_SITE_URL="https://mealvy.vercel.app"' >> .env.local
```

- [ ] **Step 3: Verify .env.local is in .gitignore**

Run: `grep -q ".env.local" .gitignore && echo "OK" || echo "MISSING"`
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add .env.example
git commit -m "feat(seo): add VITE_SITE_URL environment variable"
```

---

## Task 2: Update Metadata Config to Use Environment Variable

**Files:**
- Modify: `src/shared/lib/config/metaDataConfig.ts`

- [ ] **Step 1: Add SITE_URL constant at top of file**

Replace lines 1-11 with:

```typescript
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://mealvy.vercel.app';

export const METADATA_CONFIG = {
	site: {
		name: 'Mealvy',
		fullName: 'Mealvy - Планувальник харчування та менеджер рецептів',
		description:
			'Ваш особистий планувальник харчування та менеджер рецептів. Плануйте свої страви, керуйте рецептами та відкривайте нові страви з детальною інформацією про поживні речовини.',
		url: SITE_URL,
		image: `${SITE_URL}/og-image.jpg`,
		language: 'uk',
		type: 'website',
	},
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/shared/lib/config/metaDataConfig.ts
git commit -m "feat(seo): use environment variable for site URL"
```

---

## Task 3: Add Fallback SEO Meta Tags to index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add SEO meta tags after viewport**

Replace lines 1-18 with:

```html
<!doctype html>
<html lang="uk">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- SEO Meta Tags (Fallback before React loads) -->
		<title>Mealvy - Планувальник харчування та менеджер рецептів</title>
		<meta
			name="description"
			content="Ваш особистий планувальник харчування та менеджер рецептів. Плануйте свої страви, керуйте рецептами та відкривайте нові страви з детальною інформацією про поживні речовини."
		/>
		<meta
			name="keywords"
			content="планувальник харчування, менеджер рецептів, готування, планування їжі, калькулятор калорійності"
		/>

		<!-- Open Graph Meta Tags -->
		<meta
			property="og:title"
			content="Mealvy - Планувальник харчування та менеджер рецептів"
		/>
		<meta
			property="og:description"
			content="Ваш особистий планувальник харчування та менеджер рецептів"
		/>
		<meta property="og:type" content="website" />
		<meta property="og:url" content="https://mealvy.vercel.app" />
		<meta property="og:image" content="https://mealvy.vercel.app/og-image.jpg" />
		<meta property="og:site_name" content="Mealvy" />

		<!-- Twitter Card Meta Tags -->
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content="Mealvy" />
		<meta
			name="twitter:description"
			content="Планувальник харчування та менеджер рецептів"
		/>
		<meta name="twitter:image" content="https://mealvy.vercel.app/og-image.jpg" />

		<!-- PWA Meta Tags -->
```

- [ ] **Step 2: Verify HTML is valid**

Run: `yarn dev` and check browser console for errors
Expected: No HTML parsing errors

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat(seo): add fallback meta tags to index.html"
```

---

## Task 4: Create Open Graph Image

**Files:**
- Create: `public/og-image.jpg`

- [ ] **Step 1: Create placeholder og-image.jpg**

Note: This step requires manual image creation or using an existing design tool.

Requirements:
- Size: 1200x630px
- Format: JPG
- Content: Mealvy logo + tagline "Планувальник харчування та менеджер рецептів"
- Background: Brand colors (#f97316 or similar)

If you don't have design tools, you can use a temporary placeholder:

```bash
# Download a placeholder (requires curl)
curl -o public/og-image.jpg "https://via.placeholder.com/1200x630/f97316/ffffff?text=Mealvy"
```

Or create manually using Figma/Canva and save to `public/og-image.jpg`

- [ ] **Step 2: Verify image exists and size**

Run: `ls -lh public/og-image.jpg`
Expected: File exists, size ~50-200KB

- [ ] **Step 3: Test image loads in browser**

Run: `yarn dev` and navigate to `http://localhost:5173/og-image.jpg`
Expected: Image displays

- [ ] **Step 4: Commit**

```bash
git add public/og-image.jpg
git commit -m "feat(seo): add Open Graph image"
```

---

## Task 5: Create Static Sitemap

**Files:**
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create sitemap.xml with all static routes**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<!-- Home -->
	<url>
		<loc>https://mealvy.vercel.app/</loc>
		<changefreq>daily</changefreq>
		<priority>1.0</priority>
		<lastmod>2026-04-13</lastmod>
	</url>

	<!-- Main Pages -->
	<url>
		<loc>https://mealvy.vercel.app/dishes</loc>
		<changefreq>daily</changefreq>
		<priority>0.9</priority>
		<lastmod>2026-04-13</lastmod>
	</url>
	<url>
		<loc>https://mealvy.vercel.app/products</loc>
		<changefreq>daily</changefreq>
		<priority>0.9</priority>
		<lastmod>2026-04-13</lastmod>
	</url>
	<url>
		<loc>https://mealvy.vercel.app/schedule</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		<lastmod>2026-04-13</lastmod>
	</url>
	<url>
		<loc>https://mealvy.vercel.app/menu-planner</loc>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
		<lastmod>2026-04-13</lastmod>
	</url>
	<url>
		<loc>https://mealvy.vercel.app/shopping-list</loc>
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
		<lastmod>2026-04-13</lastmod>
	</url>
	<url>
		<loc>https://mealvy.vercel.app/favorites</loc>
		<changefreq>weekly</changefreq>
		<priority>0.7</priority>
		<lastmod>2026-04-13</lastmod>
	</url>

	<!-- Auth Pages (noindex in robots meta, but include for completeness) -->
	<url>
		<loc>https://mealvy.vercel.app/profile</loc>
		<changefreq>monthly</changefreq>
		<priority>0.3</priority>
		<lastmod>2026-04-13</lastmod>
	</url>
	<url>
		<loc>https://mealvy.vercel.app/settings</loc>
		<changefreq>monthly</changefreq>
		<priority>0.3</priority>
		<lastmod>2026-04-13</lastmod>
	</url>
</urlset>
```

- [ ] **Step 2: Verify sitemap is valid XML**

Run: `xmllint --noout public/sitemap.xml 2>&1 || cat public/sitemap.xml | head -5`
Expected: No errors or first 5 lines displayed

- [ ] **Step 3: Test sitemap loads in browser**

Run: `yarn dev` and navigate to `http://localhost:5173/sitemap.xml`
Expected: XML displays correctly

- [ ] **Step 4: Commit**

```bash
git add public/sitemap.xml
git commit -m "feat(seo): add static sitemap.xml"
```

---

## Task 6: Add Recipe Schema.org to DishDetail

**Files:**
- Modify: `src/pages/DishDetail.tsx`

- [ ] **Step 1: Import generateRecipeSchema utility**

Add import after line 8:

```typescript
import { fromSlug } from '@/shared/lib/utils/slug';
import { generateRecipeSchema } from '@/shared/lib/utils/schemaOrg';
```

- [ ] **Step 2: Generate recipe schema after dish data is loaded**

Add after line 45 (after `const dish = data.dishByName;`):

```typescript
	const dish = data.dishByName;

	// Generate Recipe Schema.org markup
	const recipeSchema = generateRecipeSchema({
		name: dish.name,
		description: dish.description ?? 'Смачна страва від Mealvy',
		image: dish.imageUrl ?? 'https://mealvy.vercel.app/icon-512.png',
		prepTime: `PT${dish.prepTime ?? 0}M`,
		cookTime: 'PT0M',
		servings: dish.servings ?? 1,
		calories: dish.calories ?? 0,
		ingredients: dish.ingredients ?? [],
		instructions: dish.instructions ?? [],
	});
```

- [ ] **Step 3: Add JSON-LD script tag to JSX**

Replace line 47-54 (the return statement and MetaData) with:

```typescript
	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={dish.name}
				description={dish.description ?? ''}
				keywords={['рецепт', 'страва', 'готування', dish.name, dish.category ?? '']}
				type="article"
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
			/>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Test Schema.org markup in browser**

Run: `yarn dev` and navigate to any dish detail page
Open DevTools → Elements → Search for `application/ld+json`
Expected: Script tag with Recipe schema present

- [ ] **Step 6: Commit**

```bash
git add src/pages/DishDetail.tsx
git commit -m "feat(seo): add Recipe Schema.org markup to DishDetail"
```

---

## Task 7: Add Product Schema.org to ProductDetail

**Files:**
- Modify: `src/pages/ProductDetail.tsx`

- [ ] **Step 1: Import generateProductSchema utility**

Add import after line 8:

```typescript
import { fromSlug } from '@/shared/lib/utils/slug';
import { generateProductSchema } from '@/shared/lib/utils/schemaOrg';
```

- [ ] **Step 2: Generate product schema after product data is loaded**

Add after line 39 (after `const product = data.productByName;`):

```typescript
	const product = data.productByName;

	// Generate Product Schema.org markup
	const productSchema = generateProductSchema({
		name: product.name,
		description: product.description || `Продукт ${product.name} з детальною поживною інформацією`,
		image: product.imageUrl ?? 'https://mealvy.vercel.app/icon-512.png',
		brand: 'Mealvy',
		calories: product.calories ?? 0,
		protein: product.protein ?? 0,
		fat: product.fat ?? 0,
		carbs: product.carbs ?? 0,
	});
```

- [ ] **Step 3: Add JSON-LD script tag to JSX**

Replace line 41-54 (the return statement and MetaData) with:

```typescript
	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={product.name}
				description={product.description || `Продукт ${product.name}`}
				keywords={[
					'продукт',
					'харчування',
					'калорії',
					product.name,
					product.category || 'їжа',
				]}
				type="product"
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
			/>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Test Schema.org markup in browser**

Run: `yarn dev` and navigate to any product detail page
Open DevTools → Elements → Search for `application/ld+json`
Expected: Script tag with Product schema present

- [ ] **Step 6: Commit**

```bash
git add src/pages/ProductDetail.tsx
git commit -m "feat(seo): add Product Schema.org markup to ProductDetail"
```

---

## Task 8: Add Organization Schema.org to Home Page

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Import generateOrganizationSchema utility**

Add import after line 3:

```typescript
import { METADATA_CONFIG } from '@/shared/lib/config';
import { generateOrganizationSchema } from '@/shared/lib/utils/schemaOrg';
```

- [ ] **Step 2: Generate organization schema**

Add after line 5 (inside the Home component):

```typescript
const Home = () => {
	const organizationSchema = generateOrganizationSchema();

	return (
```

- [ ] **Step 3: Add JSON-LD script tag to JSX**

Replace line 6-13 (the return and MetaData) with:

```typescript
	return (
		<>
			<MetaData
				title={METADATA_CONFIG.titles.home}
				description={METADATA_CONFIG.descriptions.home}
				keywords={METADATA_CONFIG.keywords.home}
				type="website"
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `yarn tsc --noEmit`
Expected: No errors

- [ ] **Step 5: Test Schema.org markup in browser**

Run: `yarn dev` and navigate to home page
Open DevTools → Elements → Search for `application/ld+json`
Expected: Script tag with Organization schema present

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat(seo): add Organization Schema.org markup to Home"
```

---

## Task 9: Update Vercel Configuration for SEO

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Ensure sitemap.xml is excluded from SPA rewrites**

Verify line 4 includes `sitemap.xml`:

```json
{
	"rewrites": [
		{
			"source": "/:path((?!assets|sw|sw.js|site.webmanifest|robots.txt|sitemap.xml|favicon.svg|og-image.jpg).*)",
			"destination": "/index.html"
		}
	],
```

Note: `og-image.jpg` should also be excluded from rewrites

- [ ] **Step 2: Verify configuration is valid JSON**

Run: `cat vercel.json | python3 -m json.tool > /dev/null && echo "Valid JSON" || echo "Invalid JSON"`
Expected: `Valid JSON`

- [ ] **Step 3: Commit if changes were made**

```bash
git add vercel.json
git commit -m "feat(seo): exclude og-image from SPA rewrites"
```

---

## Task 10: Add Sitemap Reference to robots.txt

**Files:**
- Modify: `public/robots.txt`

- [ ] **Step 1: Add sitemap URL to robots.txt**

Add at the end of `public/robots.txt`:

```txt
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://mealvy.vercel.app/sitemap.xml
```

- [ ] **Step 2: Verify robots.txt is accessible**

Run: `yarn dev` and navigate to `http://localhost:5173/robots.txt`
Expected: File displays with Sitemap line

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat(seo): add sitemap reference to robots.txt"
```

---

## Task 11: Create SEO Documentation

**Files:**
- Create: `docs/seo.md`

- [ ] **Step 1: Create SEO documentation**

```markdown
# SEO Configuration

## Overview

This document describes the SEO setup for Mealvy frontend.

## Meta Tags

### Static Fallback (index.html)
- Title, description, keywords
- Open Graph tags for social sharing
- Twitter Card tags

### Dynamic Meta Tags (React)
- Managed by `react-head` library
- Component: `src/shared/components/metaData/MetaData.tsx`
- Configuration: `src/shared/lib/config/metaDataConfig.ts`

## Sitemap

**Location:** `public/sitemap.xml`

Contains all public routes:
- Home page (priority 1.0)
- Dishes, Products (priority 0.9)
- Schedule, Menu Planner (priority 0.8)
- Shopping List, Favorites (priority 0.7)
- Profile, Settings (priority 0.3)

**Update Process:**
1. Add new public routes to `public/sitemap.xml`
2. Update `lastmod` date
3. Submit to Google Search Console after deployment

## Schema.org Structured Data

### Recipe Schema (DishDetail)
- Type: `Recipe`
- Includes: name, description, image, prepTime, servings, nutrition, ingredients, instructions
- Enables rich snippets in Google Search

### Product Schema (ProductDetail)
- Type: `Product`
- Includes: name, description, image, brand, nutrition (calories, protein, fat, carbs)
- Enables product rich snippets

### Organization Schema (Home)
- Type: `Organization`
- Includes: name, logo, social media links, contact info
- Helps Google understand site ownership

## Open Graph Image

**Location:** `public/og-image.jpg`
**Size:** 1200x630px
**Usage:** Social media previews (Facebook, Twitter, LinkedIn)

## Environment Variables

```bash
VITE_SITE_URL="https://mealvy.vercel.app"
```

Used for:
- Canonical URLs
- Open Graph URLs
- Sitemap URLs
- Schema.org URLs

## Testing

### Local Testing
1. Run `yarn dev`
2. Check meta tags in browser DevTools
3. Validate Schema.org with [Google Rich Results Test](https://search.google.com/test/rich-results)

### Production Testing
1. Deploy to Vercel
2. Test with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
3. Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
4. Submit sitemap to Google Search Console

## Monitoring

### Google Search Console
- URL: https://search.google.com/search-console
- Submit sitemap: `https://mealvy.vercel.app/sitemap.xml`
- Monitor: Coverage, Performance, Enhancements

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1

## Future Improvements

1. **Dynamic Sitemap Generation**
   - Generate sitemap from database (dishes, products)
   - Update automatically on content changes

2. **Breadcrumb Schema**
   - Add BreadcrumbList schema to detail pages
   - Improve navigation understanding

3. **Prerendering**
   - Add react-snap or Vercel prerendering
   - Improve initial SEO for crawlers

4. **Multilingual Support**
   - Add hreflang tags for English version
   - Separate sitemaps per language
```

- [ ] **Step 2: Commit**

```bash
git add docs/seo.md
git commit -m "docs(seo): add SEO configuration documentation"
```

---

## Task 12: Verification and Testing

**Files:**
- None (testing only)

- [ ] **Step 1: Build production bundle**

Run: `yarn build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Verify sitemap in dist**

Run: `ls -la dist/sitemap.xml`
Expected: File exists in dist folder

- [ ] **Step 3: Verify og-image in dist**

Run: `ls -la dist/og-image.jpg`
Expected: File exists in dist folder

- [ ] **Step 4: Test production build locally**

Run: `yarn preview`
Navigate to: `http://localhost:4173`
Expected: Site loads correctly

- [ ] **Step 5: Check meta tags in production build**

Open DevTools → Elements → `<head>`
Verify:
- `<title>` tag present
- `<meta name="description">` present
- `<meta property="og:image">` points to `/og-image.jpg`
- `<script type="application/ld+json">` present on home, dish, product pages

- [ ] **Step 6: Validate Schema.org markup**

1. Copy JSON-LD from any detail page
2. Go to https://validator.schema.org/
3. Paste JSON and validate
Expected: No errors

- [ ] **Step 7: Create final commit**

```bash
git add -A
git commit -m "feat(seo): complete SEO improvements implementation

- Add environment variable for site URL
- Add fallback meta tags to index.html
- Create Open Graph image
- Create static sitemap.xml
- Add Recipe Schema.org to DishDetail
- Add Product Schema.org to ProductDetail
- Add Organization Schema.org to Home
- Update robots.txt with sitemap reference
- Add SEO documentation

Fixes critical SEO issues identified in audit."
```

---

## Post-Implementation Checklist

After deployment to production:

- [ ] Submit sitemap to Google Search Console
  - URL: https://search.google.com/search-console
  - Add property: `https://mealvy.vercel.app`
  - Submit sitemap: `https://mealvy.vercel.app/sitemap.xml`

- [ ] Test Open Graph with Facebook Debugger
  - URL: https://developers.facebook.com/tools/debug/
  - Enter: `https://mealvy.vercel.app`
  - Verify image loads

- [ ] Test Twitter Card
  - URL: https://cards-dev.twitter.com/validator
  - Enter: `https://mealvy.vercel.app`
  - Verify card preview

- [ ] Validate Rich Results
  - URL: https://search.google.com/test/rich-results
  - Test dish page (Recipe schema)
  - Test product page (Product schema)

- [ ] Monitor Core Web Vitals
  - Check PageSpeed Insights
  - Verify LCP, INP, CLS metrics

---

## Notes

- **og-image.jpg creation** requires manual design work or placeholder
- **Sitemap** is static; consider dynamic generation in future
- **Schema.org** uses existing utilities from `schemaOrg.ts`
- **Environment variable** allows different URLs for staging/production
- **All meta tags** have Ukrainian content matching site language
