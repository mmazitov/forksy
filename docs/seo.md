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
	{ name: 'Головна', url: '/' },
	{ name: 'Страви', url: '/dishes' },
	{ name: 'Dish Name', url: '/dishes/dish-name' },
];

<Breadcrumb items={items} />
```

### Prerendering with react-snap

**Status:** ⚠️ Temporarily disabled (requires Chrome/Puppeteer setup)

**Configuration:** `package.json` → `reactSnap` section

Prerenders static HTML for all routes to improve initial SEO and load times.

**Known Issues:**
- `react-snap` is outdated (last updated 2018)
- Requires Chrome/Chromium installed locally
- Puppeteer version conflicts with Node.js 22

**Alternative Solutions:**
1. **Vercel ISR** - Use Vercel's Incremental Static Regeneration
2. **Vite SSG Plugin** - `vite-ssg` for static site generation
3. **Manual Prerendering** - Custom script with Playwright

**To enable react-snap:**
1. Install Chrome/Chromium
2. Update `package.json`: `"postbuild": "react-snap"`
3. Run `yarn build`

## Future Improvements

1. **Dynamic Sitemap with API Data**
   - Fetch dishes/products from database
   - Include detail page URLs in sitemap

2. **Multilingual Support**
   - Add hreflang tags for English version
   - Separate sitemaps per language
