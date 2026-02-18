# Agent Instructions for `forksy-frontend`

This document provides authoritative instructions for AI agents working on the **forksy-frontend** codebase.

---

## 1. Project Overview

Forksy Frontend is a React 19 / TypeScript SPA for a food-tracking and meal-planning platform. It uses:

- **Vite 7** with `@vitejs/plugin-react-swc` for bundling
- **Apollo Client 4** for GraphQL
- **TanStack React Query 5** for non-GraphQL async state
- **React Router v6** for routing
- **Tailwind CSS v4** + **shadcn/ui** (Radix UI) for styling
- **React Hook Form + Zod** for form validation
- **graphql-codegen** for typed GraphQL hooks

---

## 2. Commands

### Development

```bash
yarn dev          # Start Vite dev server on port 5173
yarn build        # Run codegen, tsc, then Vite production build
yarn preview      # Preview the production build locally
```

### Code Quality

```bash
yarn lint         # Run ESLint
```

### GraphQL Types

```bash
yarn generate     # Run graphql-codegen + post-processing script
```

`VITE_API_URL` (or `API_URL`) must be set in `.env.local` before running codegen against a live schema.

---

## 3. Project Structure

```
src/
├── app/
│   ├── App.tsx                  # Root component
│   ├── providers/               # All React context providers
│   │   ├── Providers.tsx        # Provider composition via composeProviders()
│   │   ├── AuthProvider.tsx     # JWT auth context
│   │   ├── QueryProvider.tsx    # TanStack Query client
│   │   ├── ThemeProvider.tsx    # next-themes dark/light
│   │   └── ...
│   └── routes/
│       └── AppRoutes.tsx        # All route declarations
├── features/                    # Domain-driven feature slices
│   ├── auth/                    # Login, register, auth state
│   ├── dishes/                  # Dish CRUD, cards, forms
│   ├── favorites/               # Favourite toggle
│   ├── products/                # Product CRUD, search
│   ├── profile/                 # User profile, user menu
│   └── schedule/                # Weekly/monthly meal planner
├── pages/                       # Route-level page components (thin wrappers)
├── shared/
│   ├── api/
│   │   ├── apollo.ts            # Apollo Client setup
│   │   └── graphql/             # .gql files + generated .gen.ts hooks
│   ├── components/              # Reusable UI primitives
│   ├── constants/               # App-wide constants
│   ├── hooks/                   # Generic shared hooks
│   ├── lib/                     # Utilities (cn, composeProviders, hoc, …)
│   └── types/                   # Generated & manual TypeScript types
└── mock/                        # Static seed/mock data (dev only)
```

### Feature slice anatomy

Each `features/<domain>/` directory follows this shape:

```
features/<domain>/
├── index.ts          # Public barrel re-exports
├── hooks/            # useXxx.ts hooks (Apollo or custom)
├── ui/               # React components for this domain
└── lib/              # Pure helpers / formatters
```

---

## 4. Code Style

### TypeScript

- **Strict mode** is enabled in `tsconfig.app.json`. Never use `any`; use `unknown` and narrow.
- Use `type` for unions/intersections; use `interface` for object shapes that may be extended.
- Prefer explicit return types on exported functions and hooks.

### React

- Functional components only. No class components.
- Hooks must start with `use` and follow Rules of Hooks.
- Keep components focused on a single responsibility.
- Use `React.memo` when a component renders purely from props and is called in a list.
- **No eager page imports** – prefer `React.lazy` + `Suspense` for new pages added to `AppRoutes`.

### Naming

| Artifact | Convention | Example |
|---|---|---|
| React components | PascalCase file + export | `DishCard.tsx` |
| Hooks | camelCase, `use` prefix | `useDish.ts` |
| Utilities / helpers | camelCase | `dishHelpers.ts` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Types / Interfaces | PascalCase, no `I` prefix | `DishFormValues` |
| SCSS / CSS modules | `styles.scss` in component folder | — |

### Imports

Strict import order enforced by `eslint-plugin-import`:

1. `react`, `react-dom`, `react-router-dom`
2. External scoped packages (`@apollo/client`, `@radix-ui/…`, `@tanstack/…`)
3. External unscoped packages (`dayjs`, `classnames`, …)
4. Internal absolute imports from `src/` using the `@/` alias
5. Relative parent imports (`../`)
6. Relative sibling imports (`./`)
7. Asset imports (`.gql`, `.svg`, `.css`)

Use the `@/` path alias (maps to `src/`). Example:

```ts
import { useDish } from '@/features/dishes';
import { cn } from '@/shared/lib/utils';
```

### Styling

- Use Tailwind utility classes as the primary styling mechanism.
- Compose variants with `cva` (class-variance-authority) inside shared UI primitives.
- Merge conflicting classes with `cn()` (`clsx` + `tailwind-merge`), never string concatenation.
- Dark mode is provided by `next-themes`; use `dark:` Tailwind variants.
- Do not introduce CSS-in-JS or SCSS modules for new work; new code should be Tailwind-only.

---

## 5. GraphQL Workflow

1. Write or edit a `.gql` operation file inside `src/shared/api/graphql/` (or next to the feature that owns it).
2. Run `yarn generate` to produce the corresponding `.gen.ts` file with typed hooks.
3. Import the generated hook (e.g. `useGetDishesQuery`) and the `TypedDocumentNode` from the `.gen.ts` file.
4. Never hand-write Apollo `useQuery` / `useMutation` calls with string queries; always use generated typed hooks.

**Apollo Client link chain** (defined in `src/shared/api/apollo.ts`):

```
errorLink → authLink → httpLink
```

- `authLink` reads `localStorage.getItem('token')` and injects `Authorization: Bearer <token>`.
- `errorLink` logs all GraphQL and network errors.

---

## 6. Authentication

- Auth state lives in `AuthContext` (provided by `AuthProvider`).
- Consume auth with `useAuthContext()` from `@/features/auth`.
- The context exposes: `user`, `token`, `isAuthenticated`, `isAdmin`, `login()`, `logout()`, `isLoading`.
- Protect routes by wrapping page elements with `<ProtectedRoute>` in `AppRoutes.tsx`.
- Tokens are stored in `localStorage` under the `token` key. Avoid re-reading `localStorage` directly; use `useAuthContext()`.

---

## 7. Forms

Use **React Hook Form** with **Zod** for all forms:

```ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({ name: z.string().min(1) });
type FormValues = z.infer<typeof schema>;

const form = useForm<FormValues>({ resolver: zodResolver(schema) });
```

Shared `<FormInput>` component lives in `src/shared/components/formInput/`.

---

## 8. State Management Rules

| Data type | Where to manage |
|---|---|
| Remote GraphQL data | Apollo Client cache (via generated hooks) |
| Remote non-GraphQL data | TanStack React Query |
| Auth state | `AuthContext` |
| Ephemeral UI state | `useState` / `useReducer` in the component |
| Theme | `ThemeProvider` / `next-themes` |

Do **not** introduce Redux, Zustand, Jotai, or any additional global state library.

---

## 9. Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `VITE_API_URL` | Recommended | Backend GraphQL URL (`http://localhost:4000/graphql` default) |
| `API_URL` | Dev codegen only | Override for `yarn generate` when `VITE_API_URL` is not loaded |

Create `.env.local` in `forksy-frontend/` (never commit it):

```
VITE_API_URL=http://localhost:4000/graphql
```

---

## 10. Service Worker / PWA

The custom service worker lives entirely in `public/sw.js` and `public/sw/`. Do not move it into the Vite build pipeline. The Vite plugin `swBuildHashPlugin` (in `vite.config.ts`) injects a content hash into cache names on each production build.

When modifying caching strategies, edit `public/sw/strategies.js`. When adding new cache buckets, edit `public/sw/caches.js`.

---

## 11. Adding a New Feature

1. Create `src/features/<name>/` with `index.ts`, `hooks/`, and `ui/` sub-directories.
2. Define Zod schemas and TypeScript types inside the feature or in `shared/types/`.
3. Write `.gql` operations in `src/shared/api/graphql/` and run `yarn generate`.
4. Create the page component in `src/pages/<Name>.tsx` (thin wrapper only).
5. Register the route in `src/app/routes/AppRoutes.tsx` using `React.lazy`.
6. Export public API from `src/features/<name>/index.ts`.

---

## 12. Do Not

- Do not commit `.env.local`, `.DS_Store`, or generated `.gen.ts` files that are already git-ignored.
- Do not import from `src/mock/` in production code paths.
- Do not add `@ts-ignore` or `@ts-expect-error` without a comment explaining why.
- Do not bypass the `ProtectedRoute` HOC for authenticated pages.
- Do not call `localStorage` directly outside of `useAuthState` and `apollo.ts`.
- Do not create components in `src/pages/` that contain business logic; keep pages as thin route shells.
