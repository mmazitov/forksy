# Testing Guide

## Overview

Проект использует **Vitest** + **React Testing Library** для unit, integration и component тестов.

## Структура тестов

```
src/
├── features/
│   └── auth/
│       ├── __tests__/
│       │   └── auth-flow.integration.test.tsx  # Integration tests
│       └── hooks/
│           └── __tests__/
│               └── useAuthState.test.ts        # Hook tests
├── shared/
│   ├── components/
│   │   ├── backButton/
│   │   │   └── __tests__/
│   │   │       └── BackButton.test.tsx         # Component tests
│   │   └── ...
│   ├── hooks/
│   │   └── __tests__/
│   │       ├── useDebounce.test.ts
│   │       ├── useFavorite.test.ts
│   │       └── useToggle.test.ts
│   └── lib/
│       └── utils/
│           └── __tests__/
│               ├── cn.test.ts
│               ├── nutrition.test.ts
│               ├── slug.test.ts
│               └── validate.test.ts
└── test/
    └── setup.ts                                 # Global test setup
```

## Запуск тестов

```bash
# Запуск всех тестов
yarn test

# Запуск с UI интерфейсом
yarn test:ui

# Запуск с coverage
yarn test:coverage

# Запуск конкретного файла
yarn test src/shared/hooks/__tests__/useDebounce.test.ts

# Watch mode
yarn test --watch
```

## Coverage Thresholds

Настроены минимальные пороги покрытия в `vitest.config.ts`:

- **Lines**: 25%
- **Functions**: 20%
- **Branches**: 50%
- **Statements**: 25%

**Примечание**: Пороги установлены на текущий уровень покрытия. По мере добавления новых тестов их следует постепенно повышать.

## Типы тестов

### 1. Unit Tests

Тестируют отдельные функции и утилиты:

```typescript
// src/shared/lib/utils/__tests__/cn.test.ts
import { describe, expect, it } from 'vitest';
import { cn } from '../cn';

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });
});
```

### 2. Hook Tests

Тестируют custom React hooks:

```typescript
// src/shared/hooks/__tests__/useDebounce.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });
    
    await waitFor(() => {
      expect(result.current).toBe('updated');
    }, { timeout: 600 });
  });
});
```

### 3. Component Tests

Тестируют React компоненты:

```typescript
// src/shared/components/backButton/__tests__/BackButton.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import BackButton from '../BackButton';

describe('BackButton', () => {
  it('should call ctaButtonClick when CTA button is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <BrowserRouter>
        <BackButton
          title="Назад"
          href="/home"
          ctaButton={true}
          ctaButtonText="Зберегти"
          ctaButtonClick={handleClick}
        />
      </BrowserRouter>
    );

    const ctaButton = screen.getByText('Зберегти');
    await user.click(ctaButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 4. Integration Tests

Тестируют взаимодействие нескольких компонентов/модулей:

```typescript
// src/features/auth/__tests__/auth-flow.integration.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAuthState } from '../hooks/useAuthState';

describe('Auth Flow Integration', () => {
  it('should complete full auth flow: login → refresh → logout', async () => {
    const { result } = renderHook(() => useAuthState());

    // Test login
    result.current.login(mockUser);
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    // Test logout
    result.current.logout();
    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
```

## Best Practices

### 1. Именование тестов

- Используйте описательные названия: `should [expected behavior] when [condition]`
- Группируйте связанные тесты в `describe` блоки

### 2. Моки

```typescript
// Mock внешних зависимостей в setup.ts
vi.mock('react-loader-spinner', () => ({
  Circles: vi.fn(() => null),
}));

// Mock функций в тестах
const mockFn = vi.fn();
mockFn.mockResolvedValue({ data: {} });
```

### 3. Async тесты

```typescript
// Используйте waitFor для async операций
await waitFor(() => {
  expect(result.current.isLoading).toBe(false);
}, { timeout: 1000 });

// Используйте user-event для симуляции действий пользователя
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'text');
```

### 4. Cleanup

```typescript
// Автоматический cleanup после каждого теста (в setup.ts)
afterEach(() => {
  cleanup();
});

// Ручной cleanup для моков
afterEach(() => {
  vi.restoreAllMocks();
});
```

## CI/CD

Тесты автоматически запускаются в GitHub Actions при:
- Push в `main` или `develop`
- Создании Pull Request

Workflow файл: `.github/workflows/test.yml`

## Troubleshooting

### Проблема: Тесты падают с ошибкой "act(...)"

**Решение**: Оберните state updates в `waitFor`:

```typescript
await waitFor(() => {
  expect(result.current.value).toBe(expected);
});
```

### Проблема: Mock не работает

**Решение**: Убедитесь что mock определен до импорта компонента:

```typescript
vi.mock('./module', () => ({
  default: vi.fn(),
}));

import Component from './Component'; // После mock
```

### Проблема: Timeout ошибки

**Решение**: Увеличьте timeout в `waitFor`:

```typescript
await waitFor(() => {
  expect(result.current.value).toBe(expected);
}, { timeout: 2000 });
```

## Полезные ссылки

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library User Event](https://testing-library.com/docs/user-event/intro)
- [Vitest UI](https://vitest.dev/guide/ui.html)
