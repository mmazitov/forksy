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
