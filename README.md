# Mealvy Frontend

> A modern meal planning and nutrition tracking application built with React and TypeScript.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🚀 Features

- 🍽️ **Meal Management** - Create, edit, and organize dishes and products
- 📅 **Weekly Planning** - Plan your meals for the entire week
- 🔍 **Smart Search** - Advanced search and filtering capabilities
- 📊 **Nutrition Tracking** - Automatic calculation of nutritional values
- 🎨 **Theme Support** - Dark/light mode with system preference detection
- 📱 **PWA Ready** - Installable progressive web app with offline support
- 🔐 **OAuth Integration** - Sign in with Google
- ⚡ **Real-time Updates** - GraphQL subscriptions for live data
- 🌐 **Offline First** - Service Worker caching for offline capabilities
- ♿ **Accessibility First** - WCAG 2.1 Level A compliant with full keyboard navigation
- 🔎 **SEO Optimized** - Dynamic sitemap, Schema.org markup, Open Graph tags

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [SEO & Performance](#seo--performance)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## 🛠 Tech Stack

### Core
- **React 19** - UI library with latest features
- **TypeScript 5.9** - Type-safe development
- **Vite 7** - Next-generation build tool

### State & Data
- **Apollo Client 4** - GraphQL client with caching
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation

### UI & Styling
- **TailwindCSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Beautiful icon set

### Developer Experience
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GraphQL Code Generator** - Type-safe GraphQL operations

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Backend API** running (see [mealvy-backend](https://github.com/your-org/mealvy-backend))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-org/mealvy-frontend.git
cd mealvy-frontend
```

2. **Install dependencies**

```bash
yarn install
# or
npm install
```

3. **Configure environment variables**

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables:

```env
# GraphQL API endpoint
VITE_API_URL=https://mealvy-backend.fly.dev/graphql

# Site URL for SEO (sitemap, Open Graph)
VITE_SITE_URL=https://mealvy.vercel.app
```

4. **Generate GraphQL types**

```bash
yarn generate
```

This generates TypeScript types and React hooks from your GraphQL schema.

5. **Start development server**

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## 💻 Development

### Available Scripts

| Command                 | Description                           |
| ----------------------- | ------------------------------------- |
| `yarn dev`              | Start development server on port 5173 |
| `yarn build`            | Build for production                  |
| `yarn preview`          | Preview production build locally      |
| `yarn lint`             | Run ESLint                            |
| `yarn format`           | Format code with Prettier             |
| `yarn generate`         | Generate GraphQL types from schema    |
| `yarn generate:sitemap` | Generate sitemap.xml with API data    |
| `yarn test`             | Run tests                             |
| `yarn test:ui`          | Run tests with UI interface           |
| `yarn test:coverage`    | Run tests with coverage report        |

### Code Quality

The project enforces code quality through:

- **TypeScript** - Strict type checking enabled
- **ESLint** - Linting with React and TypeScript rules
- **Prettier** - Consistent code formatting
- **Husky** - Pre-commit hooks (optional)

### GraphQL Development

When the backend GraphQL schema changes:

1. Ensure the backend is running
2. Run `yarn generate` to update types
3. Review generated files in `src/shared/api/graphql/`

The code generator creates:
- TypeScript types for all GraphQL types
- React hooks for queries and mutations
- Typed document nodes for operations

## 🚀 Deployment

### Vercel (Recommended)

#### Automatic Deployment

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Configure environment variables:
   - `VITE_API_URL` - Your GraphQL API endpoint
4. Deploy!

Vercel automatically:
- Detects Vite configuration
- Runs `yarn build`
- Deploys to global edge network
- Provides preview deployments for PRs

#### Manual Deployment

```bash
yarn build
npx vercel --prod
```

### Other Platforms

The app can be deployed to any static hosting service:

- **Netlify** - `netlify deploy --prod`
- **Cloudflare Pages** - Connect via Git
- **AWS S3 + CloudFront** - Upload `dist/` folder
- **GitHub Pages** - Use `gh-pages` package

### Build Output

The production build creates optimized assets in `dist/`:

```bash
yarn build
```

Output includes:
- Minified JavaScript bundles
- Optimized CSS
- Service Worker for PWA
- Static assets with cache headers

### Environment Variables

| Variable        | Required | Description                           |
| --------------- | -------- | ------------------------------------- |
| `VITE_API_URL`  | Yes      | GraphQL API endpoint URL              |
| `VITE_SITE_URL` | Yes      | Site URL for SEO (sitemap, OG images) |

**Note:** All Vite environment variables must be prefixed with `VITE_`

## 📁 Project Structure

The project follows **Feature-Sliced Design** architecture:

```
src/
├── app/                    # Application initialization
│   ├── providers/         # Context providers (Auth, Apollo, Theme)
│   ├── routes/            # Route configuration
│   └── App.tsx            # Root component
│
├── pages/                  # Page components (routes)
│   ├── Home.tsx
│   ├── DishDetail.tsx
│   └── ...
│
├── features/               # Feature modules
│   ├── auth/              # Authentication feature
│   │   ├── hooks/         # useAuthState, useLogin
│   │   ├── model/         # AuthContext, types
│   │   └── __tests__/     # Feature tests
│   ├── dishes/            # Dishes management
│   └── products/          # Products management
│
├── shared/                 # Shared resources
│   ├── api/               # API layer
│   │   ├── apollo.ts      # Apollo Client setup
│   │   └── graphql/       # Generated GraphQL types
│   ├── components/        # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── search/        # Search component
│   │   └── ...
│   ├── hooks/             # Shared hooks
│   │   ├── useDebounce.ts
│   │   ├── useFavorite.ts
│   │   └── ...
│   ├── lib/               # Utilities and helpers
│   │   └── utils/         # Validation, formatting, etc.
│   └── types/             # Shared TypeScript types
│
├── test/                   # Test setup and utilities
│   └── setup.ts
│
└── main.tsx               # Application entry point
```

### Architecture Principles

- **Feature-Sliced Design** - Organized by features, not file types
- **Unidirectional dependencies** - `app` → `pages` → `features` → `shared`
- **Colocation** - Tests and types live near their implementation
- **Separation of concerns** - Clear boundaries between layers

## 🔧 GraphQL Code Generation

The project uses [GraphQL Code Generator](https://the-guild.dev/graphql/codegen) for type-safe GraphQL operations.

### Configuration

See `codegen.ts` for the complete configuration.

### Generated Files

The generator creates:

- **Types** - TypeScript interfaces for all GraphQL types
- **Hooks** - React hooks for queries and mutations
- **Documents** - Typed document nodes for operations

### Workflow

1. Write GraphQL operations in `.gql` files:

```graphql
# src/features/auth/api/auth.gql
query Me {
  me {
    id
    email
    name
  }
}
```

2. Run code generation:

```bash
yarn generate
```

3. Use generated hooks:

```typescript
import { useMeQuery } from './auth.generated';

const { data, loading } = useMeQuery();
```

### Benefits

- ✅ **Type Safety** - Compile-time type checking
- ✅ **Auto-completion** - IntelliSense for GraphQL operations
- ✅ **Refactoring** - Rename fields with confidence
- ✅ **Documentation** - Types serve as inline documentation

## 🧪 Testing

The project uses **Vitest** and **React Testing Library** for testing.

### Testing Philosophy

We follow a **pragmatic approach to testing**:

- ✅ **Test critical business logic** - Authentication, data validation, calculations
- ✅ **Test integration flows** - User journeys and feature interactions
- ✅ **Test reusable hooks** - Shared utilities used across the app
- ❌ **Don't test library components** - shadcn/ui is already tested
- ❌ **Don't test trivial code** - Simple wrappers and utilities

### Test Coverage

**Current: ~78 tests** covering:

| Module           | Tests | Description                     |
| ---------------- | ----- | ------------------------------- |
| `useAuthState`   | 8     | Authentication state management |
| `useFavorite`    | 9     | Favorite functionality          |
| `useDebounce`    | 6     | Debounce hook                   |
| `validate`       | 16    | Form validation logic           |
| `nutrition`      | 25    | Nutrition calculations          |
| `auth-flow`      | 6     | Integration tests               |
| `FavoriteButton` | 8     | Component with business logic   |

### Running Tests

```bash
# Run all tests
yarn test

# Run with UI
yarn test:ui

# Run with coverage
yarn test:coverage

# Watch mode
yarn test --watch
```

### Writing Tests

Example test structure:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useAuthState } from './useAuthState';

describe('useAuthState', () => {
  it('should login user with valid credentials', async () => {
    const { result } = renderHook(() => useAuthState());
    
    await act(() => result.current.login(email, password));
    
    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

For detailed testing guidelines, see [`docs/testing.md`](./docs/testing.md)

## ♿ Accessibility

Mealvy is built with **accessibility as a core principle**, ensuring the application is usable by everyone, including people with disabilities.

### WCAG Compliance

- ✅ **WCAG 2.1 Level A** - Fully compliant
- ⚠️ **WCAG 2.1 Level AA** - In progress (color contrast verification)

### Accessibility Features

#### Keyboard Navigation
- ✅ All interactive elements accessible via keyboard
- ✅ Logical tab order throughout the application
- ✅ Visible focus indicators on all focusable elements
- ✅ Escape key closes modals and dropdowns

#### Screen Reader Support
- ✅ Semantic HTML structure with proper headings
- ✅ ARIA labels for all icon-only buttons
- ✅ ARIA states (`aria-invalid`, `aria-expanded`, `aria-current`)
- ✅ ARIA descriptions linking errors to form fields
- ✅ Decorative elements hidden with `aria-hidden="true"`

#### Form Accessibility
- ✅ All inputs properly labeled
- ✅ Error messages linked to fields via `aria-describedby`
- ✅ Validation errors announced with `role="alert"`
- ✅ Clear focus management in multi-step forms

#### Visual Accessibility
- ✅ Dark/light theme support
- ✅ Sufficient color contrast (in progress)
- ✅ Text resizable up to 200% without loss of functionality
- ✅ No reliance on color alone for information

### Testing Accessibility

We recommend testing with:

```bash
# Run automated accessibility tests (coming soon)
yarn test:a11y

# Manual testing with screen readers:
# - macOS: VoiceOver (Cmd + F5)
# - Windows: NVDA or JAWS
# - Linux: Orca
```

### Browser Tools

- **axe DevTools** - Chrome/Firefox extension for automated testing
- **Lighthouse** - Built into Chrome DevTools
- **WAVE** - Web accessibility evaluation tool

### Accessibility Audit

A comprehensive accessibility audit was conducted on April 12, 2026:

- **15 components** updated with accessibility improvements
- **75+ enhancements** including ARIA labels, states, and descriptions
- All components now follow WCAG 2.1 Level A guidelines

### Reporting Accessibility Issues

If you encounter any accessibility barriers:

1. Open an [accessibility issue](https://github.com/mmazitov/mealvy/issues/new?labels=accessibility)
2. Include:
   - Description of the issue
   - Steps to reproduce
   - Assistive technology used (if applicable)
   - Expected vs. actual behavior

We prioritize accessibility issues and aim to resolve them quickly.

## 🔎 SEO & Performance

Mealvy is optimized for search engines and social media sharing.

### SEO Features

#### Meta Tags
- ✅ **Static fallback tags** in `index.html` for initial page load
- ✅ **Dynamic meta tags** via `react-head` for each page
- ✅ **Open Graph tags** for social media previews
- ✅ **Twitter Card tags** for Twitter sharing

#### Schema.org Structured Data
- ✅ **Recipe Schema** - Rich snippets for dish pages
- ✅ **Product Schema** - Rich snippets for product pages
- ✅ **Organization Schema** - Company information on home page
- ✅ **Breadcrumb Schema** - Navigation breadcrumbs on detail pages

#### Dynamic Sitemap
- ✅ **Auto-generated** before each build
- ✅ **Static routes** (9 URLs) - home, dishes, products, etc.
- ✅ **Dynamic routes** - fetched from GraphQL API
  - Dish detail pages with proper slugs
  - Product detail pages with proper slugs
- ✅ **Accurate dates** - uses `updatedAt` field for `lastmod`

**Example sitemap generation:**
```bash
yarn generate:sitemap
# ✅ Generated sitemap.xml with 120 URLs (9 static, 2 dishes, 109 products)
```

#### Open Graph Image
- ✅ **1200x630px** optimized image
- ✅ **Brand colors** and typography
- ✅ **Auto-generated** with Sharp

#### Performance
- ✅ **PWA** with Service Worker caching
- ✅ **Code splitting** with React.lazy()
- ✅ **Asset optimization** via Vite
- ✅ **CDN delivery** via Vercel Edge Network

### SEO Best Practices

1. **Update sitemap** after adding new content
2. **Submit to Google Search Console** after deployment
3. **Validate Schema.org** with [Google Rich Results Test](https://search.google.com/test/rich-results)
4. **Test social sharing** with [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### Scripts

```bash
# Generate sitemap with latest data
yarn generate:sitemap

# Generate Open Graph image
node scripts/create-og-image.js
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** - `git checkout -b feature/amazing-feature`
3. **Follow code style** - Run `yarn lint` and `yarn format`
4. **Write tests** - For critical business logic
5. **Commit changes** - Use conventional commits
6. **Push to branch** - `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Apollo Client](https://www.apollographql.com/docs/react/) - GraphQL client
- [Vite](https://vitejs.dev/) - Next-generation build tool

## 📧 Support

For questions or issues:

- 📫 Open an [issue](https://github.com/mmazitov/mealvy/issues)
- 💬 Start a [discussion](https://github.com/mmazitov/mealvy/discussions)
- 📧 Email: support@mealvy.app

---

**Built with ❤️ using React and TypeScript**
