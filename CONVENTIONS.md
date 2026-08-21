# Code Conventions

## Folder Structure
```
src/
├── app/                    # Next.js routes (App Router)
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (admin)/           # Admin pages (protected)
│   ├── api/               # API routes
│   │   ├── auth/          # Auth endpoints
│   │   ├── products/      # Product endpoints
│   │   └── orders/        # Order endpoints
│   ├── dashboard/         # User dashboard
│   ├── products/          # Product pages
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Basic UI (Button, Card, etc)
│   ├── layout/           # Layout components (Header, Sidebar)
│   ├── forms/            # Form components
│   └── [Feature]/        # Feature-specific components
├── lib/                  # Utilities & helpers
│   ├── db.ts            # Prisma client
│   ├── auth.ts          # Auth helpers
│   └── utils.ts         # General utilities
├── types/               # TypeScript types
│   ├── index.ts         # Shared types
│   └── [Feature].ts     # Feature-specific types
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Auth hook
│   └── useCart.ts       # Cart hook
└── services/            # External API calls
    ├── stripe.ts        # Stripe API
    └── email.ts         # Email service
```

## Naming Conventions

### Files & Folders
- Folders: `lowercase-with-hyphens` (e.g., `api-routes`, `ui-components`)
- Components: `PascalCase` (e.g., `ProductCard.tsx`)
- Utilities: `camelCase` (e.g., `formatPrice.ts`)
- Types: `PascalCase` (e.g., `User.ts`, `Product.ts`)

### Variables & Functions
- Functions: `camelCase` (e.g., `fetchProducts()`, `handleSubmit()`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `API_BASE_URL`)
- React state: `camelCase` (e.g., `const [isLoading, setIsLoading]`)

### Database
- Table names: `lowercase_plural` (e.g., `users`, `products`, `orders`)
- Column names: `camelCase` (e.g., `createdAt`, `userId`)

## TypeScript
- No `any` type—use proper types
- Use interfaces for object shapes
- Export types from `types/` folder
- Use `type` for type aliases, `interface` for extensible objects

## React Components
- Use functional components (no class components)
- Use hooks for state management
- Keep components small and focused
- Props should be typed with TypeScript

Example:
```typescript
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  onAddToCart: (id: string) => void;
}

export function ProductCard({ id, name, price, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded p-4">
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={() => onAddToCart(id)}>Add to Cart</button>
    </div>
  );
}
```

## API Routes
- Request/response should be typed
- Use consistent error responses
- Validate input data
- Return proper HTTP status codes

Example:
```typescript
export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  if (!email || !password) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }
  
  // Logic here
  return Response.json({ success: true }, { status: 201 });
}
```

## Git Commits
- Use clear, descriptive messages
- Format: `type: brief description`
- Types: `feat`, `fix`, `refactor`, `docs`, `chore`

Examples:
- `feat: add user authentication with NextAuth`
- `fix: resolve product image loading issue`
- `docs: update README with setup instructions`

## Comments
- Only add comments for non-obvious logic
- Avoid redundant comments (code should be self-documenting)
- Use JSDoc for exported functions
