# Code Review Fixes — Design Spec
Date: 2026-03-29

## Overview

Fix all 12 issues found in the full-project code review, grouped into 4 domains to minimize context switching. Approach B (domain grouping) was selected.

---

## Group 1: `schedule`

### 1a. Fix stale closure in `removeDishFromMenu`

**Problem:** `removeDishFromMenu` reads `selectedDay` from the closure. In `PlannerWeek.tsx`, `setSelectedDay(dayKey)` is called immediately before `removeDishFromMenu(...)`. Because React batches state updates, `selectedDay` inside the callback is stale — the dish is removed from the wrong day.

**Fix:**
- Change signature: `removeDishFromMenu(day: string, meal: string, dishId: string) => void`
- Remove `selectedDay` from the callback's dependency array (no longer needed there)
- Update `PlannerWeek.tsx` and `CardPlaning.tsx` to pass `day` explicitly
- `selectedDay` state in `useMenuPlanner` is kept for other consumers (day selection UI)

**Files:**
- `src/features/schedule/hooks/useMenuPlanner.ts`
- `src/features/schedule/ui/PlannerWeek.tsx`
- `src/features/schedule/ui/CardPlaning.tsx`

### 1b. Move weekly stats out of page component

**Problem:** `weeklyTotalCalories` and `weeklyTotalDishes` computed via nested `reduce` in `MenuPlanner.tsx` — violates "no business logic in UI components" rule.

**Fix:** Move both computations into `useMenuPlanner` alongside `getDailyStats`. Return from hook, consume in page.

**Files:**
- `src/features/schedule/hooks/useMenuPlanner.ts`
- `src/pages/MenuPlanner.tsx`

---

## Group 2: `auth/architecture`

### 2a. Fix `features/auth` → `app/providers` dependency inversion

**Problem:** `useAuthState`, `useAuthContext`, `useAuth` import `AuthContext` and `User` from `src/app/providers/AuthContext` — features must not depend on app layer.

**Fix:**
- Move `AuthContext.ts` and `User` interface into `src/features/auth/` (e.g., `src/features/auth/model/AuthContext.ts`)
- `src/app/providers/AuthProvider.tsx` imports context from `features/auth`
- Update all existing imports

**Files:**
- `src/app/providers/AuthContext.ts` → `src/features/auth/model/AuthContext.ts`
- `src/app/providers/AuthProvider.tsx`
- `src/features/auth/hooks/useAuthState.ts`
- `src/features/auth/hooks/useAuthContext.ts`
- `src/features/auth/hooks/useAuth.ts`

### 2b. Fix `shared/components` → `features` dependency inversion

**Problem:** `Header`, `NavigationDesktop`, `MenuButton` in `shared/components` import from `features/auth` and `features/profile`. `shared/components/modal/index.ts` re-exports feature modals. `ProtectedRoute` in `shared/lib/hoc` imports from `features/auth`.

**Fix:**
- Move `Header.tsx`, `NavigationDesktop.tsx`, `MenuButton.tsx` to `src/app/components/`
- Move `ProtectedRoute.tsx` to `src/features/auth/hoc/`
- Remove feature modal re-exports from `src/shared/components/modal/index.ts` — consumers import from features directly
- Update `src/app/` layout/routing to use new paths

**Files:**
- `src/shared/components/header/Header.tsx` → `src/app/components/Header.tsx`
- `src/shared/components/navigation/NavigationDesktop.tsx` → `src/app/components/NavigationDesktop.tsx`
- `src/shared/components/navigation/MenuButton.tsx` → `src/app/components/MenuButton.tsx`
- `src/shared/lib/hoc/ProtectedRoute.tsx` → `src/features/auth/hoc/ProtectedRoute.tsx`
- `src/shared/components/modal/index.ts`
- All consumers updated

---

## Group 3: `shared`

### 3a. Add `componentDidCatch` to `ErrorBoundary`

**Problem:** Render errors in production show fallback UI with no log/trace anywhere.

**Fix:** Add `componentDidCatch(error: Error, info: React.ErrorInfo)` with `console.error`. Structured for future Sentry integration via a prop or environment check.

**Files:**
- `src/shared/components/errorBoundary/ErrorBoundary.tsx`

### 3b. Consolidate duplicate `FavoriteButton`

**Problem:** Two implementations with different prop contracts and icon sets.

**Fix:**
- Delete `src/features/favorites/ui/FavoriteButton.tsx`
- All consumers switch to `src/shared/components/favoriteButton/FavoriteButton.tsx` (has `cn`, `e.preventDefault`, consistent icons)
- Verify prop interface compatibility for all call sites

**Files:**
- `src/features/favorites/ui/FavoriteButton.tsx` (delete)
- All consumers

### 3c. Remove duplicate `ProductNutrition` interface

**Problem:** `NutritionInfo` and `ProductNutrition` in `src/shared/types/app.ts` are identical shapes.

**Fix:** Delete `ProductNutrition`, replace all usages with `NutritionInfo`.

**Files:**
- `src/shared/types/app.ts`
- All consumers of `ProductNutrition`

### 3d. Guard `console.log` calls behind `import.meta.env.DEV`

**Problem:** Several PWA/SW hooks log unconditionally in production.

**Fix:** Wrap all `console.log`/`console.warn` in `if (import.meta.env.DEV)` blocks in:
- `src/shared/hooks/usePwaInstallPrompt.ts`
- `src/shared/hooks/useSplashScreen.ts`
- `src/shared/hooks/useServiceWorker.ts`
- `src/shared/lib/utils/pwa-utils.ts`

---

## Group 4: `misc`

### 4a. Remove `any` from `useFavorite`

**Problem:** `AnyMutationFn = (options: any) => Promise<any>` violates "No `any`" rule.

**Fix:** Replace with generic: `type MutationFn<TVariables> = (options: { variables: TVariables }) => Promise<unknown>`. Use discriminated union or generics to type both `addDish` and `addProduct` mutation variants.

**Files:**
- `src/features/favorites/hooks/useFavorite.ts`

### 4b. Document intentional run-once in `useFormPersist`

**Problem:** Empty `[]` dependency array in `useLayoutEffect` silently violates exhaustive-deps rule.

**Fix:** Add `// eslint-disable-next-line react-hooks/exhaustive-deps` with explanatory comment: "Intentional run-once: restore draft only on mount to avoid overwriting user edits on re-render."

**Files:**
- `src/shared/hooks/useFormPersist.ts`

### 4c. Replace `null` return in `AuthProvider` with `<Loader />`

**Problem:** `return null` during token verification unmounts the full provider tree (Apollo, Router), clears cache, causes re-fetches.

**Fix:** Return `<Loader />` (or existing loading component) instead of `null` so the provider tree stays mounted.

**Files:**
- `src/app/providers/AuthProvider.tsx`

### 4d. Delete dead code `dishHelpers.ts` in shared

**Problem:** `src/shared/lib/utils/dishHelpers.ts` is unreferenced and has a divergent `PreparedFormData` interface vs the active version in `features/dishes/lib/`.

**Fix:** Delete the file.

**Files:**
- `src/shared/lib/utils/dishHelpers.ts` (delete)

---

## Execution Order

1. Group 4d (delete dead code — zero risk)
2. Group 4b (comment only — zero risk)
3. Group 3d (console guards — zero risk)
4. Group 3c (interface dedup)
5. Group 3a (ErrorBoundary)
6. Group 4a (useFavorite types)
7. Group 4c (AuthProvider loader)
8. Group 1b (weekly stats to hook)
9. Group 1a (removeDishFromMenu signature — most impactful bug fix)
10. Group 3b (FavoriteButton consolidation)
11. Group 2a (AuthContext relocation)
12. Group 2b (Header/Nav/ProtectedRoute relocation — largest refactor)

Riskier structural changes (Groups 2a, 2b) come last to minimize blast radius if earlier fixes reveal issues.

---

## Success Criteria

- `yarn lint` passes with no new errors
- `yarn build` succeeds
- No TypeScript errors (`yarn tsc --noEmit`)
- All 12 issues resolved per the code review findings
