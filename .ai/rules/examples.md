# Code Examples — Correct vs Incorrect

Reference this file before implementing new components, hooks, or utilities.
Each section maps to a rule in `rules.md`.

---

## TypeScript

### ❌ No `any`

```ts
// ❌ BAD — hides real type errors
function parseUser(data: any) {
  return data.name.toUpperCase()
}

// ❌ BAD — any spreads silently
const handler = (e: any) => console.log(e.target.value)
```

```ts
// ✅ GOOD — unknown + type guard
function parseUser(data: unknown): string {
  if (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    typeof (data as { name: unknown }).name === 'string'
  ) {
    return (data as { name: string }).name.toUpperCase()
  }
  throw new Error('Invalid user data')
}

// ✅ GOOD — explicit event type
const handler = (e: React.ChangeEvent<HTMLInputElement>) =>
  console.log(e.target.value)
```

---

### ❌ Implicit `null` / `undefined`

```ts
// ❌ BAD — possible runtime crash
function getDishName(dish: Dish) {
  return dish.name.trim()  // dish could be undefined at call-site
}
```

```ts
// ✅ GOOD — explicit null handling
function getDishName(dish: Dish | null | undefined): string {
  return dish?.name?.trim() ?? 'Unknown dish'
}
```

---

### Prefer `interface` for object shapes

```ts
// ❌ BAD — type alias for a plain object
type DishCardProps = {
  dish: Dish
  onFavorite: (id: string) => void
}

// ✅ GOOD
interface DishCardProps {
  dish: Dish
  onFavorite: (id: string) => void
}
```

---

## React

### ❌ Business logic inside UI components

```tsx
// ❌ BAD — Apollo call + mapping inside component body
export function DishList() {
  const { data } = useQuery(GET_DISHES)
  const sorted = [...(data?.dishes ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return <ul>{sorted.map(d => <li key={d.id}>{d.name}</li>)}</ul>
}
```

```tsx
// ✅ GOOD — logic extracted to hook
// hooks/useSortedDishes.ts
export function useSortedDishes() {
  const { data } = useQuery(GET_DISHES)
  return useMemo(
    () => [...(data?.dishes ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
    [data]
  )
}

// DishList.tsx
export function DishList() {
  const dishes = useSortedDishes()
  return <ul>{dishes.map(d => <li key={d.id}>{d.name}</li>)}</ul>
}
```

---

### ❌ Unstable keys

```tsx
// ❌ BAD — index key causes unnecessary re-mounts on reorder/insert
items.map((item, i) => <Card key={i} {...item} />)
```

```tsx
// ✅ GOOD — stable entity id
items.map(item => <Card key={item.id} {...item} />)
```

---

### ❌ Inline objects/functions in JSX

```tsx
// ❌ BAD — new object reference on every render breaks React.memo
<DishCard style={{ margin: 8 }} onSelect={() => setSelected(dish.id)} />
```

```tsx
// ✅ GOOD — stable references
const cardStyle = { margin: 8 } // outside component, or useMemo/useCallback

const handleSelect = useCallback(() => setSelected(dish.id), [dish.id])

<DishCard style={cardStyle} onSelect={handleSelect} />
```

---

### ❌ Unnecessary global state

```tsx
// ❌ BAD — local UI flag in global store
const [isModalOpen, setIsModalOpen] = useAtom(modalOpenAtom)

// ✅ GOOD — local state for local UI
const [isModalOpen, setIsModalOpen] = useState(false)
```

---

## Apollo Client / GraphQL

### ❌ Hand-written GraphQL types

```ts
// ❌ BAD — manually maintained, drifts from schema
interface Dish {
  id: string
  name: string
  calories: number
}
```

```ts
// ✅ GOOD — import from generated types
import type { Dish } from '@/shared/types/api'
// or use the generated hook directly
import { useGetDishQuery } from './getDish.gen'
```

---

### ❌ TanStack Query for GraphQL data

```ts
// ❌ BAD — duplicates Apollo cache
const { data } = useQuery(['dishes'], () =>
  fetch('/graphql', { method: 'POST', body: JSON.stringify({ query: GET_DISHES }) })
)

// ✅ GOOD — use Apollo hook
const { data } = useGetDishesQuery()
```

---

### ❌ Optimistic update without proper cache write

```ts
// ❌ BAD — no cache update, forces full refetch
await toggleFavorite({ variables: { id } })
await refetchDishes()
```

```ts
// ✅ GOOD — optimistic update in cache
await toggleFavorite({
  variables: { id },
  optimisticResponse: { toggleFavorite: { id, isFavorite: !current } },
  update(cache, { data }) {
    cache.modify({
      id: cache.identify({ __typename: 'Dish', id }),
      fields: {
        isFavorite: () => data?.toggleFavorite.isFavorite ?? false,
      },
    })
  },
})
```

---

## Performance

### ❌ Memoize everything by default

```tsx
// ❌ BAD — useMemo on a trivial expression wastes memory
const label = useMemo(() => `${first} ${last}`, [first, last])
```

```tsx
// ✅ GOOD — compute directly; memoize only expensive derivations
const label = `${first} ${last}`

// Memoize only when cost is measured:
const sortedList = useMemo(
  () => [...items].sort(heavyComparator),
  [items]
)
```

---

### ❌ Long lists without virtualization

```tsx
// ❌ BAD — renders 1000+ DOM nodes
<ul>
  {dishes.map(d => <DishCardCompact key={d.id} dish={d} />)}
</ul>

// ✅ GOOD — virtual scroll
import { VirtualList } from '@/shared/ui/VirtualList'

<VirtualList items={dishes} itemHeight={72}>
  {(dish) => <DishCardCompact key={dish.id} dish={dish} />}
</VirtualList>
```

---

### ❌ Eager imports for large routes

```tsx
// ❌ BAD — entire route bundle loaded upfront
import { SettingsPage } from '@/pages/Settings'

// ✅ GOOD — lazy-loaded
const SettingsPage = lazy(() => import('@/pages/Settings'))

// In router:
<Suspense fallback={<PageSkeleton />}>
  <SettingsPage />
</Suspense>
```

---

## Error Handling

### ❌ Unhandled async errors

```ts
// ❌ BAD — silent failure
async function saveDish(data: DishInput) {
  await createDish({ variables: { input: data } })
}
```

```ts
// ✅ GOOD — explicit try/catch + user feedback
async function saveDish(data: DishInput) {
  try {
    await createDish({ variables: { input: data } })
    toast.success('Dish saved!')
  } catch (err) {
    console.error('saveDish failed', err)
    toast.error('Failed to save dish. Please try again.')
  }
}
```

---

### ❌ Missing error boundary

```tsx
// ❌ BAD — single JS error crashes everything
export function AppRoutes() { ... }

// ✅ GOOD — wrap pages
<ErrorBoundary fallback={<ErrorPage />}>
  <AppRoutes />
</ErrorBoundary>
```

---

## Security

### ❌ dangerouslySetInnerHTML

```tsx
// ❌ BAD — XSS vector
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// ✅ GOOD — render as text, or sanitize before use
<div>{userContent}</div>

// If rich-text is genuinely needed, sanitize first:
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

---

### ❌ Secrets in client code

```ts
// ❌ BAD — bundled into JS, visible to any user
const API_SECRET = 'sk-prod-abc123'

// ✅ GOOD — server-side only; client uses public VITE_ vars
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Architecture

### ❌ Import from a higher-level slice

```ts
// ❌ BAD — shared importing from features (wrong direction)
// src/shared/utils/formatDish.ts
import { useDish } from '@/features/dishes/hooks/useDish'

// ✅ GOOD — dependency flows downward only
// src/features/dishes/hooks/useDish.ts
import { formatDate } from '@/shared/utils/date'
```

---

### ❌ God component

```tsx
// ❌ BAD — one component owns data, layout, mutations, and side-effects
export function DishesPage() {
  // 200 lines: queries, mutations, filters, sorting, pagination, modal state…
}

// ✅ GOOD — thin page delegates to feature components
export function DishesPage() {
  return <DishesList />
}
// DishesList handles its own data; sub-components handle their own state
```
