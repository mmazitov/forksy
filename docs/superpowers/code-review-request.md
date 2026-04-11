# Code Review Request: Full Project Audit

## What Was Implemented

Complete Mealvy Frontend application — a React 19 / TypeScript SPA for food-tracking and meal-planning platform with the following major implementations:

1. **Cookie-based Authentication Migration**
   - Migrated from JWT tokens in localStorage to HTTP-only cookies
   - Removed token/refreshToken from GraphQL schema
   - Updated Apollo Client to use credentials: 'include'
   - Implemented OAuth flow without token exposure
   - Added logout mutation

2. **Security Hardening**
   - Content-Security-Policy headers
   - Input sanitization for JSON-LD
   - URL parameter validation (weekDiff clamping)
   - Service Worker message validation
   - OAuth postMessage source validation
   - Console logging guards for production
   - Dependency vulnerability fixes (react-router-dom CVE)

3. **Feature Development**
   - Shopping list page with week-based navigation
   - Meal planning and scheduling system
   - Product and dish management (CRUD)
   - Favorites system with optimistic updates
   - Profile management
   - PWA with custom service worker

4. **Architecture & Infrastructure**
   - Feature-sliced architecture (app/pages/features/shared)
   - Apollo Client v4 with cache persistence
   - GraphQL code generation with near-operation-file preset
   - TailwindCSS v4 + shadcn/ui components
   - React Router v6 with protected routes
   - Service Worker with modular architecture
   - Vite v7 build system with custom plugins

## Requirements/Plan

**Project Goals:**
- Production-ready food tracking and meal planning SPA
- Type-safe GraphQL integration
- Secure authentication (cookie-based)
- PWA capabilities with offline support
- Modern UI with dark mode
- Performance optimized
- Accessibility compliant

**Technical Requirements (from `.ai/rules/rules.md`):**
- No `any` types
- Functional components + hooks only
- Proper error handling and boundaries
- Security best practices (no XSS, no secrets in client)
- A11y compliance (ARIA, alt text, labels, focus management)
- Performance optimization (memoization, lazy loading, virtualization)
- Clean architecture (composition over inheritance, no circular imports)

**Known Issues to Address (from `.ai/project/overview.md`):**
1. Dual state management (Apollo + TanStack Query)
2. Missing test suite
3. Token storage security (now migrated to cookies ✓)
4. Mock data in production bundle
5. Duplicate FavoriteButton components
6. @ts-expect-error suppressions in apollo.ts
7. No error boundaries
8. No route-level code splitting

## Git Range to Review

**Base:** `0942906` (initial commit)
**Head:** `e16bf19` (current HEAD)

```bash
git diff --stat 0942906..e16bf19
# 345 files changed, 13463 insertions(+), 3673 deletions(-)
```

## Review Focus Areas

### 1. Security
- Cookie-based auth implementation
- CSP headers and inline script handling
- Input sanitization
- Service Worker message validation
- OAuth flow security
- No secrets exposure

### 2. Architecture
- Feature-sliced structure adherence
- Dependency direction (pages → features → entities → shared)
- No circular imports
- Separation of concerns
- Provider composition

### 3. TypeScript
- No `any` usage
- Proper type guards
- Strong typing for props/state/API
- Explicit null handling

### 4. React Best Practices
- Hooks rules compliance
- Effect cleanup
- Stable keys
- No unnecessary re-renders
- State co-location

### 5. Performance
- Lazy loading implementation
- Memoization usage
- Bundle size
- Tree-shaking
- N+1 query prevention

### 6. Error Handling
- Error boundaries presence
- Async error handling
- Race condition prevention
- Unmounted update guards

### 7. Accessibility
- ARIA roles
- Alt text on images
- Input labels
- Focus management

### 8. Code Quality
- Dead code removal
- Import organization
- Component size
- Naming conventions

## Specific Files to Review

**Critical:**
- `src/shared/api/apollo.ts` - Apollo Client setup with cookie auth
- `src/features/auth/` - Authentication implementation
- `src/app/providers/` - Provider composition
- `public/sw/` - Service Worker modules
- `vite.config.ts` - Build configuration with SW hash injection

**High Priority:**
- `src/shared/types/` - Type definitions
- `src/features/*/hooks/` - Custom hooks
- `src/pages/` - Route components
- `src/shared/components/` - Shared UI components

**Known Issues:**
- Check for duplicate FavoriteButton
- Review @ts-expect-error in apollo.ts
- Verify mock data tree-shaking
- Check for error boundaries
- Review lazy loading implementation

## Success Criteria

**Must Have:**
- No Critical security issues
- No `any` types
- Cookie auth correctly implemented
- No XSS vulnerabilities
- Proper error handling

**Should Have:**
- Error boundaries in place
- Route-level code splitting
- No duplicate components
- Clean type definitions
- Test suite foundation

**Nice to Have:**
- Performance optimizations
- A11y improvements
- Documentation completeness
