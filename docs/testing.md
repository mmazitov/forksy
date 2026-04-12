# Testing Guide

## Philosophy

This project follows a **pragmatic approach to testing**:
- Focus on critical business logic and user flows
- Prioritize high-value tests over coverage metrics
- Leverage TypeScript's type system to catch errors at compile time

## What We Test

### ✅ Critical Business Logic
- **Authentication** (`useAuthState`) — auth is critical for the app
- **Favorites** (`useFavorite`) — core UX feature
- **Validation** (`validate`) — data correctness
- **Nutrition calculations** (`nutrition`) — calculation accuracy

### ✅ Integration Flows
- **Auth flow** — login → refresh → logout
- Critical user journeys

### ✅ Reusable Hooks
- **useDebounce** — used in search and forms

## What We DON'T Test

### ❌ Library UI Components
- shadcn/ui components (Button, Input) — already tested upstream
- Simple wrapper components

### ❌ Trivial Utilities
- `cn` (clsx wrapper)
- `slug` (simple string transformation)
- `useToggle`, `useLocalStorage` — too simple

### ❌ Coverage for Coverage's Sake
- No thresholds
- No mandatory metrics

## Test Structure

```
src/
├── features/
│   └── auth/
│       ├── __tests__/
│       │   └── auth-flow.integration.test.tsx
│       └── hooks/
│           └── __tests__/
│               └── useAuthState.test.ts
├── shared/
│   ├── hooks/
│   │   └── __tests__/
│   │       ├── useDebounce.test.ts
│   │       └── useFavorite.test.ts
│   └── lib/
│       └── utils/
│           └── __tests__/
│               ├── nutrition.test.ts
│               └── validate.test.ts
└── test/
    └── setup.ts
```

## Running Tests

```bash
# Run all tests
yarn test

# Run with UI interface
yarn test:ui

# Watch mode
yarn test --watch
```

## Current Coverage

**~78 tests** cover critical parts:
- 8 tests — `useAuthState`
- 9 tests — `useFavorite`
- 6 tests — `useDebounce`
- 16 tests — `validate`
- 25 tests — `nutrition`
- 6 tests — auth integration flow
- 8 tests — `FavoriteButton`

## When to Add Tests

Add tests only if:
1. **Critical business logic** — a bug would lead to data loss or broken UX
2. **Complex calculations** — math, data transformations
3. **Regression** — bug already happened and needs prevention

**Don't add tests for:**
- Simple components
- Wrapper functions
- Obvious logic
- Achieving coverage metrics

## Test Infrastructure

- **Framework**: Vitest + React Testing Library
- **Environment**: jsdom
- **User interactions**: @testing-library/user-event
- **Setup**: `src/test/setup.ts`

## Best Practices

1. **Test behavior, not implementation**
   ```ts
   // ✅ Good
   expect(screen.getByText('Login')).toBeInTheDocument();
   
   // ❌ Bad
   expect(component.state.isLoggedIn).toBe(true);
   ```

2. **Use user-event for interactions**
   ```ts
   import { userEvent } from '@testing-library/user-event';
   
   await userEvent.click(button);
   await userEvent.type(input, 'text');
   ```

3. **Avoid over-mocking**
   - Mock only external dependencies (API, localStorage)
   - Don't mock internal modules unless necessary

4. **Write readable tests**
   ```ts
   describe('useAuthState', () => {
     it('should login user with valid credentials', async () => {
       // Arrange
       const { result } = renderHook(() => useAuthState());
       
       // Act
       await act(() => result.current.login(email, password));
       
       // Assert
       expect(result.current.user).toBeDefined();
     });
   });
   ```

## Troubleshooting

### Act warnings
```
Warning: An update to Component inside a test was not wrapped in act(...)
```

**Solution**: Wrap async updates in `act()` or use `waitFor()`

### Mock not working
Make sure the mock is defined **before** importing the tested module:

```ts
vi.mock('module', () => ({ ... }));
import { Component } from './Component'; // after mock
```

### jsdom limitations
jsdom doesn't support:
- Canvas API
- WebGL
- Some CSS features

For such cases, use manual testing.
