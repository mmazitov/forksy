# Service Worker Documentation

## Architecture

The Service Worker is split into multiple modules for better maintainability:

```
/public/sw/
├── main.js         # Main SW logic & event handlers
├── strategies.js   # Caching strategies
├── caches.js       # Cache definitions & versioning
├── queue.js        # Offline request queue
└── utils.js        # Utility functions
```

## Cache Types

### Static Caches
- **APP_SHELL** (`app-shell-v1.2.0`) - Core app files (HTML, manifest)
- **STATIC** (`static-v1.2.0`) - JS, CSS, fonts, icons

### Data Caches
- **DISHES** (`dishes-v1`) - Dish data
- **PRODUCTS** (`products-v1`) - Product data
- **PLANS** (`meal-plans-v1`) - Meal planning data
- **IMAGES** (`images-v1`) - Image assets

### Special Caches
- **QUEUE** (`offline-queue-v1`) - Offline request queue

All caches are versioned to enable automatic cleanup when the app updates.

## Caching Strategies

### 1. Cache First
**Used for:** App Shell and static resources

```javascript
cacheFirst(request, cacheName)
```

- Checks cache first
- Falls back to network if not cached
- Updates cache with network response
- Ideal for assets that don't change frequently

### 2. Stale While Revalidate
**Used for:** Dishes and Products

```javascript
staleWhileRevalidate(request, cacheName)
```

- Returns cached version immediately (if available)
- Updates cache in background
- Provides instant response while keeping data fresh
- Best for data that can be slightly stale

### 3. Network First
**Used for:** Meal Plans

```javascript
networkFirst(request, cacheName)
```

- Tries network first
- Falls back to cache on network failure
- Updates cache with successful network responses
- Ensures data freshness when online

### 4. Network Only
**Used for:** Authentication requests

```javascript
networkOnly(request)
```

- Always uses network
- No caching
- Required for security-sensitive operations

## Request Routing

### Navigation Requests (GET)
- **Mode:** `navigate`
- **Strategy:** Cache First (APP_SHELL)
- Returns cached HTML for offline support

### Static Assets (GET)
- **Extensions:** `.js`, `.css`, `.woff2`, `.ttf`, `.eot`
- **Strategy:** Cache First (STATIC)
- Long-term caching for performance

### Authentication (GET)
- **Pattern:** `/api/auth/*`
- **Strategy:** Network Only
- No caching for security

### GraphQL API (GET)
Based on operation name:

| Operation   | Strategy               | Cache    |
| ----------- | ---------------------- | -------- |
| GetDishes   | Stale While Revalidate | DISHES   |
| GetProducts | Stale While Revalidate | PRODUCTS |
| *Plan*      | Network First          | PLANS    |
| Default     | Network First          | PLANS    |

### Images (GET)
- **Extensions:** `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg`
- **Strategy:** Cache First (IMAGES)
- Long-term caching

### Mutations (POST/PUT/DELETE)
- **Pattern:** `/api/*`
- Attempts network request
- On failure: Enqueues for background sync
- Returns 202 status with offline indicator

## Offline Queue

When network requests fail, they're stored in the offline queue for later replay.

### Enqueue Process
```javascript
enqueueRequest(request)
```

1. Clones request
2. Extracts body, headers, URL
3. Stores in QUEUE cache with timestamp
4. Notifies clients via `OFFLINE_ACTION_QUEUED` message

### Replay Process
```javascript
replayQueue()
```

1. Retrieves all queued requests
2. Attempts to replay each request
3. On success: Removes from queue, notifies clients
4. On failure: Leaves in queue for next sync

Triggered by:
- Background Sync API (`forksy-sync` tag)
- Manual retry from app

## Event Handlers

### Install Event
```javascript
self.addEventListener('install', ...)
```

- Caches App Shell (/, /index.html, /manifest.json)
- Calls `self.skipWaiting()` to activate immediately

### Activate Event
```javascript
self.addEventListener('activate', ...)
```

- Cleans up old cache versions
- Calls `self.clients.claim()` to control all clients

### Fetch Event
```javascript
self.addEventListener('fetch', ...)
```

- Routes requests to appropriate strategies
- Skips unsupported schemes and dev server requests
- Handles GET for caching, POST/PUT/DELETE for queue

### Sync Event
```javascript
self.addEventListener('sync', ...)
```

- Listens for `forksy-sync` tag
- Replays offline queue

### Message Event
```javascript
self.addEventListener('message', ...)
```

Handles client messages:
- `SKIP_WAITING` - Activates new SW immediately
- `CLEAR_CACHE` - Clears all caches

### Push Event
```javascript
self.addEventListener('push', ...)
```

- Displays push notifications (future feature)
- Shows notification with icon and badge

## Utility Functions

### Request Type Detection
- `isApiRequest(request)` - Checks if URL includes `/api/`
- `isGraphQLRequest(request)` - Checks for `/api/graphql`
- `isAuthRequest(request)` - Checks for `/api/auth/`

### URL Validation
- `isSupportedScheme(url)` - Validates http/https
- `isDevServerRequest(url)` - Detects Vite dev server

### Asset Detection
- `shouldCacheAsset(url)` - Matches cacheable file extensions

### Cache Management
- `cleanupOldCaches(allowedCaches)` - Removes outdated caches

## Client Communication

The Service Worker communicates with the app through `postMessage`:

### SW → Client Messages

**OFFLINE_ACTION_QUEUED**
```javascript
{
  type: 'OFFLINE_ACTION_QUEUED',
  url: requestUrl
}
```
Sent when a request is queued due to offline state.

**OFFLINE_ACTION_SYNCED**
```javascript
{
  type: 'OFFLINE_ACTION_SYNCED',
  url: requestUrl
}
```
Sent when a queued request is successfully replayed.

### Client → SW Messages

**SKIP_WAITING**
```javascript
{
  type: 'SKIP_WAITING'
}
```
Activates new SW version immediately.

**CLEAR_CACHE**
```javascript
{
  type: 'CLEAR_CACHE'
}
```
Clears all caches (useful for debugging).

## Version Management

Caches are versioned using constants from `caches.js`:

```javascript
APP_VERSION = 'v1.2.0'  // For app shell & static files
DATA_VERSION = 'v1'     // For data caches
```

When versions change:
1. New caches are created
2. Old caches are cleaned up during activation
3. Users automatically get the latest version

