# Forksy Frontend – Project Review

## Overview

Forksy Frontend is a React 19 / TypeScript SPA for a food-tracking and meal-planning platform. It communicates with a GraphQL backend via Apollo Client v4, is styled with Tailwind CSS v4 + shadcn/ui (Radix UI primitives), and is bundled with Vite v7.

---

## Architecture

### Layer breakdown

| Layer | Path | Responsibility |
|---|---|---|
| **App shell** | `src/app/` | Providers composition, routing, global layout |
| **Pages** | `src/pages/` | Route-level components, thin wrappers |
| **Features** | `src/features/<domain>/` | Domain logic: hooks, UI, helpers |
| **Shared** | `src/shared/` | Generic UI kit, API client, utilities, types |
| **Mock** | `src/mock/` | Static seed data for development / demos |

### Provider stack (outermost → innermost)

```
ApolloProvider
  AuthProvider
    SeoProvider
      QueryProvider (TanStack Query)
        ThemeProvider
          TooltipProvider
            <App />
```

`composeProviders()` utility flattens this hierarchy without nesting JSX manually.

### Routing

React Router v6 with file-based page components. Protected routes are wrapped with the `<ProtectedRoute>` HOC that gates on `AuthContext.isAuthenticated`. Route scroll-reset is handled globally in `AppRoutes`.

**Routes:**

| Path | Page | Protected |
|---|---|---|
| `/` | Home | No |
| `/schedule` | Schedule | No |
| `/menu-planner` | MenuPlanner | No |
| `/products` | Products | No |
| `/product/:id` | ProductDetail | No |
| `/products/add` | AddProduct | Yes |
| `/product/edit/:id` | AddProduct | Yes |
| `/dishes` | Dishes | No |
| `/dish/:id` | DishDetail | No |
| `/dishes/add` | AddDish | Yes |
| `/dish/edit/:id` | AddDish | Yes |
| `/settings` | Settings | Yes |
| `/favorites` | Favorites | Yes |
| `/profile` | Profile | Yes |

---

## Technology Stack

| Category | Technology | Version |
|---|---|---|
| UI Framework | React | 19.x |
| Language | TypeScript | 5.9.x |
| Build tool | Vite + `@vitejs/plugin-react-swc` | 7.x |
| Styling | Tailwind CSS v4 + shadcn/ui | 4.x |
| Component primitives | Radix UI | various |
| GraphQL client | Apollo Client | 4.x |
| Server-state cache | TanStack React Query | 5.x |
| Forms | React Hook Form + Zod | 7.x / 4.x |
| Routing | React Router DOM | 6.x |
| Toasts | Sonner + shadcn/ui Toaster | 1.x |
| Icons | Lucide React + react-icons | latest |
| Date handling | Day.js | 1.x |
| PWA / Service Worker | Custom `public/sw.js` | — |

---

## Feature Domains

### `auth`
JWT-based authentication stored in `localStorage`. `useAuthState` manages token parsing, login, logout, and `isAdmin` derivation. `AuthModal` renders login/register via `AuthForm`. `useAuthContext` is the public hook for consuming auth state anywhere.

### `dishes`
CRUD operations for recipes/dishes. Hooks: `useDish` wraps Apollo mutations and queries. UI includes `DishCardCompact`, `DishCardFull`, `DishForm`, `AddDishModal`, and `FeaturedDishes`. `dishHelpers.ts` contains nutrition aggregation logic.

### `products`
Individual food product management. `useProduct` for queries/mutations, `useProductSearch` for debounced search. Separate compact and full card views mirrors the dishes pattern.

### `favorites`
Toggle favourite state on dishes/products. `useFavorite` wraps the Apollo mutation with optimistic cache update. Thin `FavoriteButton` UI component re-exported from both `features/favorites` and `shared/components/favoriteButton`.

### `schedule`
Weekly/monthly meal schedule. `useSchedule` fetches planned meals; `useMenuPlanner` handles adding/removing days. UI: `ScheduleWeek`, `ScheduleMonth`, `ScheduleNavigation`, `CardPlaning`.

### `profile`
Reads user profile via `useProfile`. `UserMenu` renders dropdown with avatar and logout action.

---

## GraphQL & Code Generation

- `.gql` operation files live next to the feature that uses them (`src/shared/api/graphql/`).
- `graphql-codegen` with the `near-operation-file` preset generates `.gen.ts` files alongside each `.gql` file, outputting typed hooks (`useXxxQuery`, `useXxxMutation`) and `TypedDocumentNode` objects.
- Base scalar types are generated to `src/shared/types/api.ts`.
- A post-generation script (`scripts/add-operations-imports.js`) injects re-exports.
- Run generation with: `yarn generate`.

### Apollo Client setup (`src/shared/api/apollo.ts`)

- `createHttpLink` to `VITE_API_URL` (defaults to `http://localhost:4000/graphql`).
- `setContext` auth-link injects `Authorization: Bearer <token>` from `localStorage`.
- `onError` link logs GraphQL and network errors globally.
- Link chain: `errorLink → authLink → httpLink`.
- Cache uses `InMemoryCache`; persistence via `apollo3-cache-persist`.

---

## Styling Conventions

- **Tailwind CSS v4** with the Vite plugin (no `tailwind.config.ts` content config needed).
- **shadcn/ui** component library with a `components.json` configuration.
- All one-off utility merging goes through `cn()` (`clsx` + `tailwind-merge`).
- Class variance authority (`cva`) is used inside shared UI primitives for variant management.
- Dark mode via `next-themes` (`ThemeProvider`).

---

## PWA & Service Worker

The app ships a custom service worker at `public/sw.js` split into modules under `public/sw/`:

| File | Role |
|---|---|
| `main.js` | Entry point, registers other modules |
| `caches.js` | Cache names + versioning with build-hash injection |
| `strategies.js` | Fetch strategies (network-first, cache-first, stale-while-revalidate) |
| `queue.js` | Background sync queue for offline mutations |
| `utils.js` | Helpers |

Vite build plugin (`swBuildHashPlugin`) injects a content hash into `sw.js` and `sw/caches.js` on each production build to bust stale caches.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | No | Backend GraphQL endpoint (default: `http://localhost:4000/graphql`) |
| `API_URL` | No | Used by `codegen.ts` during type generation |

Configure in `.env.local` (not committed).

---

## Code Quality

- **ESLint** `eslint.config.js` with `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `eslint-plugin-import`.
- **Prettier** with `prettier-plugin-tailwindcss` for class sorting.
- `tsconfig.app.json` targets ES2020 with strict mode.
- No test runner is currently configured (no Jest / Vitest setup files present).

---

## Known Issues & Improvement Areas

1. **Dual state management** – both Apollo Client cache and TanStack React Query are configured as providers. The project should establish a clear boundary: use Apollo cache for GraphQL data, TanStack Query only for REST or native fetch calls. Currently it creates potential confusion.

2. **Missing test suite** – no test configuration files (`vitest.config`, `jest.config`, spec files) exist. Unit and integration tests should be added, starting with hooks and utility functions.

3. **Token storage in `localStorage`** – JWTs stored in `localStorage` are accessible to XSS. Consider `httpOnly` cookies (already partly configured via `credentials: 'include'` on the Apollo link) or a secure in-memory token store.

4. **Mock data in production bundle** – `src/mock/` data is imported directly into pages without tree-shaking guards. Ensure mock imports are dev-only or removed for production.

5. **Duplicate `FavoriteButton`** – exists in both `features/favorites/ui/` and `shared/components/favoriteButton/`. One should be the canonical source.

6. **`@ts-expect-error` in apollo.ts** – two suppressed type errors in the error link handler indicate a version mismatch between the codegen types and runtime Apollo v4. Should be resolved with proper type imports or a helper.

7. **No error boundaries** – the app lacks React error boundaries. At minimum, a top-level boundary should be added in `App.tsx`.

8. **No route-level code splitting** – all pages are eagerly imported in `AppRoutes.tsx`. Using `React.lazy` + `Suspense` per route would improve initial load time.
