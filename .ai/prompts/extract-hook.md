---
description: Extract reusable custom React hooks from components for cleaner architecture
---

# Extract Custom Hook

You are a React expert focused on clean code and DRY principles. The goal is to refactor a React component by extracting reusable logic into a custom Hook.

## Task

Given a React component that has some complex or repeated logic, refactor that logic out into a custom hook. Provide the new hook code and show how the component uses it, improving clarity and reusability.

**Input to provide**:
1. The original component code (or relevant parts) that contain the logic to be abstracted.
2. What the logic does (so we know the purpose of the hook).
3. If known, other components that might benefit from the new hook (to illustrate reuse).

## Why & When to Extract a Hooka
- The component has **multiple concerns** (e.g., state management and UI rendering). A hook can manage the state or side-effects, letting the component focus on UI.
- The same logic (e.g., form handling, data fetching, animation controls) is used in more than one place.
- Improving **testability**: logic in a hook (plain JS) can be unit-tested more easily than logic intertwined with JSX.

## Plan
1. **Identify the hook’s responsibility**: e.g., “usePagination” for page state management, “useAuth” for authentication status, “useInterval” for a setInterval timer, etc.
2. **Design the hook API**: Decide what inputs (parameters) it takes and what outputs it returns (state values, handler functions). The hook should hide implementation details and expose a clean interface.
3. **Ensure reusability**: The hook should not directly depend on specific component JSX or styles. It should be pure logic (perhaps using other generic hooks like useState, useEffect, etc.).

## Example Walkthrough

**Original Component Snippet (Before):**
```tsx
function UserList() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const total = useSelector(state => state.users.total);  // total items from Redux store
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    // Fetch users whenever page or pageSize changes
    dispatch(fetchUsers({ page, pageSize }));
  }, [page, pageSize]);

  const nextPage = () => setPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage(prev => Math.max(prev - 1, 1));
  // ... UI rendering with Next/Prev buttons calling nextPage/prevPage
}
```

In this example, the pagination logic (state and functions) can be extracted to a `usePagination` hook.

**Extracted Hook (Design):** 
```ts
function usePagination({ totalItems, initialPage = 1, pageSize = 20 }) {
  // returns: page, pageSize, totalPages, setPage, setPageSize, nextPage, prevPage (and any other utility like resetPage)
}
```

**New Hook Implementation:**
```tsx
// hooks/usePagination.ts
import { useState, useCallback, useMemo } from 'react';

interface UsePaginationOptions {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
}
interface UsePaginationResult {
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (p: number) => void;
  setPageSize: (size: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination({ totalItems, initialPage = 1, initialPageSize = 20 }: UsePaginationOptions): UsePaginationResult {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / pageSize)), [totalItems, pageSize]);

  const setPageSafe = useCallback((newPage: number) => {
    // Clamp the page between 1 and totalPages
    setPage(prev => {
      const pageNum = Number(newPage);
      if (isNaN(pageNum)) return prev;
      return Math.min(Math.max(pageNum, 1), totalPages);
    });
  }, [totalPages]);

  const nextPage = useCallback(() => setPage(prev => (prev < totalPages ? prev + 1 : prev)), [totalPages]);
  const prevPage = useCallback(() => setPage(prev => (prev > 1 ? prev - 1 : prev)), []);

  return { page, pageSize, totalPages, setPage: setPageSafe, setPageSize, nextPage, prevPage };
}
```

**Refactored Component (After):**
```tsx
import { usePagination } from '../hooks/usePagination';

function UserList() {
  const totalUsers = useSelector(state => state.users.total);
  const { page, pageSize, totalPages, setPage, setPageSize, nextPage, prevPage } = usePagination({ totalItems: totalUsers, initialPage: 1, initialPageSize: 20 });

  useEffect(() => {
    dispatch(fetchUsers({ page, pageSize }));
  }, [page, pageSize]);

  return (
    <div>
      {/* ... render list of users ... */}
      <p>Page {page} of {totalPages}</p>
      <button onClick={prevPage} disabled={page === 1}>Previous</button>
      <button onClick={nextPage} disabled={page === totalPages}>Next</button>
      <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
}
```
Now the `UserList` component is much cleaner – it delegates pagination logic to the hook, and we can reuse `usePagination` in other list components.

## Output Format

When writing the answer:
- Provide the **new hook code** (`useYourHookName`) in a markdown code block, with an explanation of how it works if needed (comments in code or outside).
- Show the **modified component code** snippet using the new hook, to illustrate usage.
- If relevant, show how another component could use the same hook (to emphasize reusability).
- Ensure the hook is **fully typed** with TypeScript (if applicable), and that it does not produce lint warnings (like exhaustive deps issues, etc.).

## Testing the Hook (if applicable)
- Mention how you would test this hook. For example, using React’s testing library for hooks (`@testing-library/react-hooks` or the built-in utilities in React 18+) to verify it manages state as expected.
- If the hook involves side effects (like useEffect), note how to test those (could be via unit tests by mocking modules or integration test in a dummy component).

### Common Patterns for Hooks Extraction (for inspiration):
- **Form state management**: `useForm` to handle input values, change handlers, validation.
- **Toggle or Modal visibility**: `useToggle` for simple show/hide state and callbacks.
- **Data fetching**: `useFetch` or useReactQuery (though often a library, you can wrap common fetch logic).
- **Animation controls**: `useAnimationFrame`, `useInterval`, etc., to encapsulate timing logic.
- **Complex state logic**: e.g., `useSelection` to manage a list of selected items (checkbox list selection logic), etc.

Emphasize how extracting the hook improves the component:
- The component is shorter and focused on presentation.
- The logic is reusable and easier to test in isolation.
- Other developers can discover the hook and use it, rather than duplicating logic.

Finish with a short summary: 
“This refactor keeps the component lean and promotes reuse. The new hook `usePagination` can now be used anywhere we have paginated data, ensuring consistent behavior across the app.”
