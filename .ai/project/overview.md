# Mealvy Frontend – Project Review

## Overview

Mealvy Frontend is a React 19 / TypeScript SPA for a food-tracking and meal-planning platform. It communicates with a GraphQL backend via Apollo Client v4, is styled with Tailwind CSS v4 + shadcn/ui (Radix UI primitives), and is bundled with Vite v7.

---

## Architecture

### Layer breakdown

| Layer         | Path                     | Responsibility                                |
| ------------- | ------------------------ | --------------------------------------------- |
| **App shell** | `src/app/`               | Providers composition, routing, global layout |
| **Pages**     | `src/pages/`             | Route-level components, thin wrappers         |
| **Features**  | `src/features/<domain>/` | Domain logic: hooks, UI, helpers              |
| **Shared**    | `src/shared/`            | Generic UI kit, API client, utilities, types  |
| **Mock**      | `src/mock/`              | Static seed data for development / demos      |

### Provider stack (outermost → innermost)

```
ApolloProvider
  AuthProvider
    SeoProvider
      ThemeProvider
        TooltipProvider
          <App />
```

`composeProviders()` utility flattens this hierarchy without nesting JSX manually.

**Note:** TanStack Query is not currently used. All data fetching is handled by Apollo Client.

### Routing

React Router v6 with file-based page components. Protected routes are wrapped with the `<ProtectedRoute>` HOC that gates on `AuthContext.isAuthenticated`. Route scroll-reset is handled globally in `AppRoutes`.

**Routes:**

| Path                | Page          | Protected |
| ------------------- | ------------- | --------- |
| `/`                 | Home          | No        |
| `/schedule`         | Schedule      | No        |
| `/menu-planner`     | MenuPlanner   | No        |
| `/products`         | Products      | No        |
| `/product/:id`      | ProductDetail | No        |
| `/products/add`     | AddProduct    | Yes       |
| `/product/edit/:id` | AddProduct    | Yes       |
| `/dishes`           | Dishes        | No        |
| `/dish/:id`         | DishDetail    | No        |
| `/dishes/add`       | AddDish       | Yes       |
| `/dish/edit/:id`    | AddDish       | Yes       |
| `/settings`         | Settings      | Yes       |
| `/favorites`        | Favorites     | Yes       |
| `/profile`          | Profile       | Yes       |

---

## Technology Stack

| Category             | Technology                        | Version   |
| -------------------- | --------------------------------- | --------- |
| UI Framework         | React                             | 19.x      |
| Language             | TypeScript                        | 5.9.x     |
| Build tool           | Vite + `@vitejs/plugin-react-swc` | 7.x       |
| Styling              | Tailwind CSS v4 + shadcn/ui       | 4.x       |
| Component primitives | Radix UI                          | various   |
| GraphQL client       | Apollo Client                     | 4.x       |
| Server-state cache   | TanStack React Query              | 5.x       |
| Forms                | React Hook Form + Zod             | 7.x / 4.x |
| Routing              | React Router DOM                  | 6.x       |
| Toasts               | Sonner + shadcn/ui Toaster        | 1.x       |
| Icons                | Lucide React + react-icons        | latest    |
| Date handling        | Day.js                            | 1.x       |
| PWA / Service Worker | Custom `public/sw.js`             | —         |

---

## Feature Domains

### `auth`
Cookie-based authentication using HTTP-only cookies. `useAuthState` manages user state, login, logout, and `isAdmin` derivation. Authentication tokens are stored in HTTP-only cookies on the backend. User object is persisted in `localStorage` for UI state. `AuthModal` renders login/register via `AuthForm`. `useAuthContext` is the public hook for consuming auth state anywhere.

### `dishes`
CRUD operations for recipes/dishes. Hooks: `useDish` wraps Apollo mutations and queries. UI includes `DishCardCompact`, `DishCardFull`, `DishForm`, `AddDishModal`, and `FeaturedDishes`. `dishHelpers.ts` contains nutrition aggregation logic.

### `products`
Individual food product management. `useProduct` for queries/mutations, `useProductSearch` for debounced search. Separate compact and full card views mirrors the dishes pattern.

### `favorites`
Toggle favourite state on dishes/products. `useFavorite` wraps the Apollo mutation with optimistic cache update. `FavoriteButton` UI component located in `shared/components/favoriteButton`.

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

- `createHttpLink` to `VITE_API_URL` (defaults to `http://localhost:4000/graphql`) with `credentials: 'include'` for cookie-based auth.
- `onError` link logs GraphQL and network errors globally, triggers logout on UNAUTHENTICATED errors.
- Link chain: `errorLink → httpLink`.
- Cache uses `InMemoryCache` with `cache-first` default fetch policy.
- No auth link needed — authentication handled via HTTP-only cookies.

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

| File            | Role                                                                  |
| --------------- | --------------------------------------------------------------------- |
| `main.js`       | Entry point, registers other modules                                  |
| `caches.js`     | Cache names + versioning with build-hash injection                    |
| `strategies.js` | Fetch strategies (network-first, cache-first, stale-while-revalidate) |
| `queue.js`      | Background sync queue for offline mutations                           |
| `utils.js`      | Helpers                                                               |

Vite build plugin (`swBuildHashPlugin`) injects a content hash into `sw.js` and `sw/caches.js` on each production build to bust stale caches.

---

## Environment Variables

| Variable       | Required | Description                                                         |
| -------------- | -------- | ------------------------------------------------------------------- |
| `VITE_API_URL` | No       | Backend GraphQL endpoint (default: `http://localhost:4000/graphql`) |
| `API_URL`      | No       | Used by `codegen.ts` during type generation                         |

Configure in `.env.local` (not committed).

---

## Code Quality

- **ESLint** `eslint.config.js` with `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, and `eslint-plugin-import`.
- **Prettier** with `prettier-plugin-tailwindcss` for class sorting.
- `tsconfig.app.json` targets ES2020 with strict mode.
- **Error Boundaries** implemented at app and route levels for graceful error handling.
- **Code Splitting** all routes use `React.lazy` + `Suspense` for optimal bundle size.
- **Testing** Vitest + React Testing Library configured. Run `yarn install` to install dependencies, then `yarn test` to run tests. Example test included for `useToggle` hook.

---

## Known Issues & Improvement Areas

1. **Limited test coverage** – Vitest infrastructure is configured, but only one example test exists. Unit and integration tests should be added for hooks, utilities, and components.

2. **User object in localStorage** – while authentication tokens are now in HTTP-only cookies (✓), the user object is still stored in localStorage. Consider fetching from `/auth/me` endpoint instead and storing only a minimal flag.
