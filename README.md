# Forksy Frontend

React + TypeScript застосунок для планування меню та управління продуктами.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **TailwindCSS** + **Radix UI**
- **Apollo Client** (GraphQL)
- **React Router** v6
- **React Hook Form** + **Zod**

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Створи `.env` файл на основі `.env.example`:

```bash
cp .env.example .env
```

Вкажи URL твого backend API:

```env
VITE_API_URL=http://localhost:4000/graphql  # для development
# або
VITE_API_URL=https://forksy-api.onrender.com/graphql  # для production
```

### 3. Generate GraphQL types

```bash
npm run generate
```

Це згенерує TypeScript types з GraphQL schema.

### 4. Run development server

```bash
npm run dev
```

Застосунок буде доступний на `http://localhost:5173`

## Scripts

- `npm run dev` - запустити development server
- `npm run build` - build для production
- `npm run preview` - preview production build локально
- `npm run lint` - lint code
- `npm run generate` - згенерувати GraphQL types з backend schema

## Deployment (Vercel)

### Automatic deployment

1. Push код до GitHub
2. В Vercel Dashboard:
   - Import Project
   - Обери repository
   - Add environment variable: `VITE_API_URL`
3. Deploy!

Vercel автоматично:
- Детектить Vite project
- Запустить `npm run build`
- Деплоїть до edge network

### Manual deployment

```bash
npm run build
npx vercel --prod
```

## Environment Variables

- `VITE_API_URL` - URL твого GraphQL API endpoint

**Important:** Всі env variables для Vite мають починатися з `VITE_`

## Features

- 🍽️ Управління стравами та продуктами
- 📅 Планування меню на тиждень
- 🔍 Пошук та фільтрація
- 🎨 Темна/світла тема
- 📱 PWA (Progressive Web App)
- 🔐 OAuth authentication (Google, GitHub, Facebook)
- 🌐 Service Worker для offline capabilities

## Project Structure

```
src/
├── components/     # Переповторювані UI компоненти
├── pages/          # Page-level компоненти (routes)
├── hooks/          # Custom React hooks
├── lib/            # Utilities, configs, GraphQL setup
├── types/          # TypeScript type definitions
├── constants/      # App constants
└── modules/        # Feature-specific modules
```

## GraphQL Code Generation

Проєкт використовує GraphQL Code Generator для автоматичної генерації:
- TypeScript types з schema
- React hooks для queries/mutations
- Typed operations

Config: `codegen.ts`

Після зміни GraphQL schema на backend, запусти:

```bash
npm run generate
```

## Notes

- Apollo Client налаштований з credentials: 'include' для OAuth
- Service Worker кешує assets для offline mode
- PWA installable на мобільних пристроях
