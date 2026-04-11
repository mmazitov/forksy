# Testing Setup

This project uses **Vitest** for unit and integration testing.

## Running Tests

```bash
# Run tests in watch mode
yarn test

# Run tests with UI
yarn test:ui

# Run tests with coverage
yarn test:coverage
```

## Writing Tests

### Example: Testing a Hook

```typescript
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useToggle } from '../useToggle';

describe('useToggle', () => {
  it('should toggle value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });
});
```

### Example: Testing a Component

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Button } from '../Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## Test Structure

- Place tests in `__tests__` folders next to the code they test
- Use `.test.ts` or `.test.tsx` extension
- Follow the Arrange-Act-Assert pattern
- Use descriptive test names

## Coverage

Coverage reports are generated in the `coverage/` directory.

Excluded from coverage:
- `node_modules/`
- `src/test/`
- Type definition files (`*.d.ts`)
- Config files
- Mock data
- Build output (`dist/`)

## Dependencies

The following testing libraries are installed:
- `vitest` - Test runner
- `@vitest/ui` - UI for running tests
- `@vitest/coverage-v8` - Coverage reporting
- `@testing-library/react` - React testing utilities
- `@testing-library/dom` - DOM testing utilities (peer dependency)
- `@testing-library/jest-dom` - Custom matchers
- `jsdom` - DOM environment for Node.js

## Next Steps

1. ✅ Dependencies installed
2. Write tests for critical hooks and utilities
3. Add tests for components
4. Set up CI/CD to run tests automatically
