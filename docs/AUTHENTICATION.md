# Authentication & Authorization Documentation

## Architecture

### Technology Stack

- **Backend**: Express.js with Passport.js
- **Authentication Strategy**: JWT (JSON Web Tokens)
- **OAuth Providers**: Google, GitHub, Facebook
- **Database**: MongoDB via Prisma ORM
- **Frontend**: React with Context API
- **GraphQL**: Apollo Client/Server

### File Structure

```
api/auth/
├── google-auth.ts      # Vercel serverless function for Google OAuth
├── github-auth.ts      # Vercel serverless function for GitHub OAuth
└── facebook-auth.ts    # Vercel serverless function for Facebook OAuth

server/
├── oauth.ts            # OAuth routes for local development
├── passport/
│   └── strategies.ts   # Passport strategy configurations
└── resolvers.ts        # GraphQL resolvers for auth

src/lib/auth/
└── AuthContext.tsx     # React authentication context & hooks

src/components/socialList/
└── SocialList.tsx      # Social login UI component

src/hooks/
└── useAuthActions.ts   # Auth action hooks
```

## User Model

### Prisma Schema

```prisma
model User {
  id         String    @id @default(auto()) @map("_id") @db.ObjectId
  email      String?   @unique
  name       String?
  password   String?   // For email/password auth
  
  // OAuth provider IDs
  googleId   String?   @unique
  facebookId String?   @unique
  githubId   String?   @unique
  
  // Profile
  avatar     String?
  
  // Relations
  dishes     Dish[]
  products   Product[]
  
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}
```

### Fields

- **id**: Unique MongoDB ObjectId
- **email**: User's email (optional for OAuth users)
- **name**: Display name
- **password**: Bcrypt hashed password (only for email/password auth)
- **googleId/facebookId/githubId**: OAuth provider unique identifiers
- **avatar**: Profile picture URL
- **dishes/products**: User's created content

## Authentication Methods

### 1. OAuth 2.0 Social Login

#### Supported Providers

1. **Google** - OAuth 2.0
2. **GitHub** - OAuth 2.0
3. **Facebook** - OAuth 2.0

#### Flow Diagram

```
User clicks login → Opens OAuth popup → Provider authentication
↓
User authorizes app
↓
Callback with auth code
↓
Exchange code for profile
↓
Find or create user in DB
↓
Generate JWT token
↓
Send token via postMessage
↓
Client stores token & fetches user
↓
Login complete
```

#### Implementation Details

##### Passport Strategies (Local Development)

Located in [server/passport/strategies.ts](server/passport/strategies.ts):

**Google Strategy**
```typescript
new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create user with googleId
  let user = await prisma.user.findUnique({
    where: { googleId: profile.id }
  });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        googleId: profile.id,
        email: profile.emails?.[0]?.value,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value
      }
    });
  }
  
  return done(null, user);
});
```

Similar strategies exist for GitHub and Facebook with provider-specific configurations.

##### OAuth Routes

Two implementations for different environments:

**Local Development** ([server/oauth.ts](server/oauth.ts)):
```typescript
// Entry point
router.get('/google-auth', (req, res, next) => {
  if (req.query.code) {
    // Handle callback
    handleOAuthCallback('google')(req, res, next);
  } else {
    // Initiate OAuth flow
    passport.authenticate('google', { 
      scope: ['profile', 'email'] 
    })(req, res, next);
  }
});

// Callback handler
const handleOAuthCallback = (provider) => (req, res, next) => {
  passport.authenticate(provider, { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '7d'
    });
    
    // Send HTML page that posts message to opener
    res.send(/* HTML with postMessage */);
  })(req, res, next);
};
```

**Production/Vercel** ([api/auth/google-auth.ts](api/auth/google-auth.ts)):
Serverless functions that replicate the same flow using Vercel's edge functions.

##### Frontend Integration

Located in [src/components/socialList/SocialList.tsx](src/components/socialList/SocialList.tsx):

```typescript
const handleSocialLogin = (provider: string) => {
  const apiUrl = getApiUrl(); // Determines local vs production
  const authUrl = `${apiUrl}/auth/${provider}-auth`;
  
  // Open centered popup
  window.open(authUrl, 'oauth-popup', 'width=500,height=600,...');
};

// Listen for OAuth success message
useEffect(() => {
  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === 'OAUTH_SUCCESS' && event.data.token) {
      const token = event.data.token;
      
      // Fetch user data with token
      fetch(`${apiUrl}/graphql`, {
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          query: `query Me { me { id email name avatar } }`
        })
      })
      .then(res => res.json())
      .then(data => {
        login(token, data.data.me); // Update context
        onOpenChange(false); // Close modal
      });
    }
  };
  
  window.addEventListener('message', handleMessage);
  return () => window.removeEventListener('message', handleMessage);
}, [login, onOpenChange]);
```

### 2. Email/Password Authentication

#### Registration Flow

**GraphQL Mutation**:
```graphql
mutation Register($email: String!, $password: String!, $name: String) {
  register(email: $email, password: $password, name: $name) {
    token
    user {
      id
      email
      name
    }
  }
}
```

**Resolver** ([server/resolvers.ts](server/resolvers.ts)):
```typescript
register: async (_parent, args, context) => {
  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash(args.password, 10);
  
  // Create user
  const user = await context.prisma.user.create({
    data: {
      email: args.email,
      password: hashedPassword,
      name: args.name
    }
  });
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  
  return { token, user };
}
```

#### Login Flow

**GraphQL Mutation**:
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      name
    }
  }
}
```

**Resolver**:
```typescript
login: async (_parent, args, context) => {
  // Find user by email
  const user = await context.prisma.user.findUnique({
    where: { email: args.email }
  });
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Verify password
  const valid = await bcrypt.compare(args.password, user.password || '');
  if (!valid) {
    throw new Error('Invalid email or password');
  }
  
  // Generate JWT
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  
  return { token, user };
}
```

## JWT Token Management

### Token Structure

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "iat": 1640000000,
  "exp": 1640604800
}
```

### Token Lifecycle

1. **Generation**: Created on successful authentication
2. **Storage**: Stored in `localStorage` under key `token`
3. **Usage**: Sent in `Authorization: Bearer <token>` header
4. **Validation**: Verified in GraphQL context middleware
5. **Expiration**: 7 days (configurable)
6. **Removal**: Cleared on logout or invalid token

### Token Validation

**Server-side** ([server/context.ts](server/context.ts)):
```typescript
export const createContext = ({ req }: { req: Request }): Context => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  let userId: string | undefined;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      userId = decoded.userId;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  
  return { prisma, userId };
};
```

## Client-Side Authentication

### Auth Context

Located in [src/lib/auth/AuthContext.tsx](src/lib/auth/AuthContext.tsx).

#### State Management

```typescript
interface AuthContextType {
  user: User | null;        // Current user data
  token: string | null;     // JWT token
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;       // Loading state
}
```

#### Initialization Flow

```typescript
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setShouldRefetch(true);
    } else {
      setIsLoading(false);
    }
  }, []);
  
  // Fetch user data when token is available
  const { data, loading, refetch } = useMeQuery({
    skip: !token,
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  });
  
  // Update user state when data arrives
  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
      setIsLoading(false);
    }
  }, [data]);
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Login Function

```typescript
const login = useCallback((newToken: string, newUser: User) => {
  // Store token in localStorage
  localStorage.setItem('token', newToken);
  
  // Update state
  setUser(newUser);
  setToken(newToken);
  
  // Update Apollo cache
  client.cache.modify({
    fields: {
      me() {
        return { ...newUser, __typename: 'User' };
      }
    }
  });
}, []);
```

#### Logout Function

```typescript
const logout = useCallback(() => {
  // Clear localStorage
  localStorage.removeItem('token');
  
  // Clear state
  setToken(null);
  setUser(null);
  
  // Clear Apollo cache
  client.clearStore();
}, []);
```

### useAuth Hook

```typescript
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

Usage in components:
```typescript
const { user, login, logout, isLoading } = useAuth();

if (isLoading) return <Spinner />;
if (!user) return <LoginPrompt />;

return <Dashboard user={user} />;
```

## Environment Configuration

### Required Environment Variables

#### OAuth Providers

**Google**
```env
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
```

**GitHub**
```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:4000/auth/github/callback
```

**Facebook**
```env
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:4000/auth/facebook/callback
```

#### JWT & Database

```env
JWT_SECRET=your-secure-random-secret
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/forksy
CLIENT_URL=http://localhost:5173  # Frontend URL
```

### Provider Setup

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:4000/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google-auth` (production)
6. Copy Client ID and Client Secret

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in application details
4. Set callback URL:
   - `http://localhost:4000/auth/github/callback` (development)
   - `https://yourdomain.com/api/auth/github-auth` (production)
5. Copy Client ID and generate Client Secret

#### Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth Redirect URIs:
   - `http://localhost:4000/auth/facebook/callback` (development)
   - `https://yourdomain.com/api/auth/facebook-auth` (production)
5. Copy App ID and App Secret

## Protected Routes & Authorization

### GraphQL Query Protection

**Me Query** - Returns current user:
```typescript
me: async (_parent, _args, context: Context) => {
  if (!context.userId) {
    throw new Error('Not authenticated');
  }
  
  return await context.prisma.user.findUnique({
    where: { id: context.userId }
  });
}
```

### Resource Ownership Validation

Example for user-owned resources:
```typescript
deleteDish: async (_parent, { id }, context: Context) => {
  if (!context.userId) {
    throw new Error('Not authenticated');
  }
  
  const dish = await context.prisma.dish.findUnique({
    where: { id }
  });
  
  if (dish?.userId !== context.userId) {
    throw new Error('Not authorized to delete this dish');
  }
  
  return await context.prisma.dish.delete({ where: { id } });
}
```

### Frontend Route Protection

Using React Router guards:
```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <SplashScreen />;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Usage in routes
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```
