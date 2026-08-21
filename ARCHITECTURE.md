# E-Commerce Architecture

## Tech Stack

### Frontend
- **Next.js 16.2.6** - React framework with built-in routing, API routes, optimization
- **React 19.2.4** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling

### Backend
- **Next.js API Routes** - Serverless functions for backend logic
- **Prisma 7.9.1** - ORM for database operations
- **PostgreSQL** (recommended) - Relational database

### Authentication
- **NextAuth.js** (to be added) - Session-based auth
- **JWT tokens** for API security
- **Password hashing** with bcrypt

### Additional Libraries
- **Recharts 3.10.1** - Data visualization (dashboards, analytics)

## Architecture Decisions

### Why Next.js App Router?
- Modern, file-based routing
- Server Components for better performance
- Built-in API routes (no separate backend needed)
- Simpler deployment

### Why Prisma?
- Type-safe database queries
- Automatic migrations
- Developer experience with schema definitions

### Why NextAuth.js?
- Secure session management
- Built for Next.js
- Supports multiple auth providers (email, OAuth)
- Handles cookies, CSRF protection

## Data Flow
```
User → Next.js Frontend (React Components)
    ↓
API Routes (getServerSession, middleware)
    ↓
Prisma (ORM)
    ↓
PostgreSQL Database
```

## Folder Organization
- `src/app/` - Next.js routes and pages
- `src/components/` - Reusable React components
- `src/lib/` - Utilities, helpers, database queries
- `src/types/` - TypeScript type definitions
- `src/hooks/` - Custom React hooks
- `src/services/` - External API integrations

## Security
- Environment variables for secrets
- CSRF protection via NextAuth
- Secure password hashing
- Role-based access control (RBAC) for admin features
