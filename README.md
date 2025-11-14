# Forksy - Meal Planner & Recipe Manager

A modern, Progressive Web App (PWA) for planning meals and managing your recipes with offline support.

## Features

- 📱 **Progressive Web App** - Install on your device like a native app
- 🔄 **Offline Support** - Works without internet connection
- 🚀 **Fast & Responsive** - Built with React + Vite
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS
- 🌙 **Dark Mode** - Comfortable dark theme support
- 📅 **Menu Planning** - Plan your meals by week or month
- 🍽️ **Recipe Management** - Store and organize your favorite recipes
- 📊 **Nutrition Tracking** - Track your meal statistics

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI + Radix UI
- **State Management**: React Query
- **Routing**: React Router
- **PWA**: Service Worker with intelligent caching

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd forksy

# Install dependencies
npm install

# Start development server
npm run start
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build with:
- Code splitting
- Asset hashing for cache busting
- Service Worker configuration
- PWA manifest

### Preview Production Build

```bash
npm run preview
```

## PWA Configuration

### Service Worker Features

The Service Worker (`public/sw.js`) handles:

1. **Intelligent Caching**
   - Cache-first strategy for assets (JS, CSS, images, fonts)
   - Network-first strategy for API calls
   - Automatic cache versioning and cleanup

2. **Cache Versioning**
   - Automatic cache invalidation on build
   - Hash-based asset naming
   - Cleanup of old cache versions

3. **Offline Support**
   - Fallback to cached version when offline
   - Graceful error handling
   - Service Worker message communication

### Manifest Configuration

The `site.webmanifest` includes:

- App metadata (name, description, theme colors)
- App icons (192x192 and 512x512)
- Home screen shortcuts for quick access to main features
- App display preferences

### Update Handling

When a new version is available:
- Users are notified via `pwa-update-available` event
- Call `SKIP_WAITING` message to activate new version
- Page auto-reloads with fresh content

## File Structure

```
src/
├── components/        # Reusable React components
├── hooks/            # Custom React hooks
├── modules/          # Feature modules
├── pages/            # Page components
├── lib/              # Utilities and helpers
├── constants/        # App constants
└── App.tsx          # Root component

public/
├── sw.js            # Service Worker
├── site.webmanifest # PWA Manifest
└── icons/           # App icons
```

## Build Configuration

The build process includes hash-based asset naming for automatic cache busting:

```typescript
// vite.config.ts
output: {
  entryFileNames: 'assets/[name]-[hash].js',
  chunkFileNames: 'assets/[name]-[hash].js',
  assetFileNames: 'assets/[name]-[hash][extname]',
}
```

This ensures users always get the latest version of assets while leveraging browser caching.

## Performance Optimizations

- Code splitting with dynamic imports
- Asset hashing for optimal caching
- Service Worker caching strategies
- Image optimization
- CSS purging with Tailwind

## Browser Support

- Chrome/Edge 90+
- Firefox 87+
- Safari 14.1+
- iOS Safari 14.5+

## Scripts

- `npm run start` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is licensed under the MIT License.
