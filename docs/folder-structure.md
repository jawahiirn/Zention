# Folder Structure

## Current Architecture

```
pokedex-web/
├── app/                           # Next.js App Router (routes only)
│   ├── [locale]/                  # Locale-based routing (if needed)
│   ├── pokemon/
│   │   └── [name]/
│   │       └── page.tsx           # Pokemon detail page (RSC)
│   ├── font.ts                    # Font configuration
│   ├── layout.tsx                 # Root layout (RSC)
│   └── page.tsx                   # Home page (RSC)
│
├── features/                      # Feature modules (domain-driven)
│   ├── i18n/
│   │   ├── components/
│   │   │   └── language-switcher.tsx
│   │   ├── locale.ts
│   │   └── request.ts
│   │
│   ├── pokemon/
│   │   ├── api/
│   │   │   ├── endpoints.ts       # API functions with Zod validation
│   │   │   ├── prefetch.ts        # Server-side prefetch utilities
│   │   │   └── queries.ts         # TanStack Query hooks
│   │   ├── components/
│   │   │   ├── pokemon-detail.tsx
│   │   │   └── pokemon-list.tsx
│   │   ├── schemas/
│   │   │   ├── index.ts           # Barrel export for schemas
│   │   │   └── pokemon.schema.ts  # Zod schemas
│   │   └── types/
│   │       ├── index.ts           # Barrel export for types
│   │       ├── request.ts         # Request DTOs
│   │       ├── response.ts        # Response DTOs
│   │       └── shared.ts          # Domain types
│   │
│   └── theme/
│       └── components/
│           └── theme-toggle.tsx
│
├── shared/                        # Shared across features
│   ├── components/
│   │   └── error-boundary.tsx     # Global error boundary
│   ├── constants/
│   │   └── theme-constants.ts
│   ├── hooks/
│   │   ├── use-auth-token.ts      # Secure cookie-based auth
│   │   └── use-mobile.ts
│   ├── lib/
│   │   ├── api-client.ts          # Axios instance with interceptors
│   │   ├── query-client.tsx       # TanStack Query client
│   │   └── utils.ts               # Utility functions
│   └── types/
│       ├── api.types.ts           # Global API types
│       └── common.types.ts        # Common utility types
│
├── components/                    # UI Design System (shadcn/ui)
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── ...                    # 50+ shadcn components
│
├── providers/                     # React Context providers
│   ├── theme-provider.tsx
│   ├── query-client-provider.tsx
│   └── index.ts
│
├── store/                         # Global client state (Zustand)
│   └── use-token-store.ts         # (Deprecated - use cookies instead)
│
├── messages/                      # i18n translations
│   ├── en.json
│   └── bn.json
│
├── docs/                          # Project documentation
│   ├── architecture-audit.md
│   ├── naming-conventions.md
│   ├── folder-structure.md
│   └── type-ownership.md
│
├── public/                        # Static assets
├── styles/                        # Global styles
│   └── globals.css
├── .env
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Directory Responsibilities

### `app/`
- **Purpose**: Next.js App Router routes only
- **Rules**:
  - Keep pages as Server Components by default
  - Extract client logic to feature components
  - Use `loading.tsx`, `error.tsx` for route-level UI states

### `features/`
- **Purpose**: Feature-based organization (domain-driven design)
- **Structure**: Each feature has its own `api/`, `components/`, `schemas/`, `types/`
- **Rules**:
  - Features should be self-contained
  - Cross-feature dependencies go through `shared/`
  - Use barrel exports only for types and schemas

### `shared/`
- **Purpose**: Code shared across multiple features
- **Rules**:
  - No feature-specific logic
  - Must be generic and reusable
  - Avoid barrel exports for components

### `components/`
- **Purpose**: UI design system (shadcn/ui components)
- **Rules**:
  - Only primitive, reusable UI components
  - No business logic
  - Can be used by any feature

### `providers/`
- **Purpose**: React Context providers
- **Rules**:
  - Global application providers only
  - Feature-specific providers go in `features/*/providers/`

### `store/`
- **Purpose**: Global client state (Zustand)
- **Rules**:
  - Use sparingly (prefer TanStack Query for server state)
  - Avoid storing sensitive data (use cookies instead)

## Adding New Features

When adding a new feature (e.g., `user-profile`):

```bash
mkdir -p features/user-profile/{api,components,schemas,types}
touch features/user-profile/api/{endpoints.ts,queries.ts,prefetch.ts}
touch features/user-profile/schemas/{index.ts,user.schema.ts}
touch features/user-profile/types/{index.ts,request.ts,response.ts,domain.ts}
```

## Migration Notes

- ✅ `shared/` directory fully implemented
- ✅ Feature-based organization established
- ✅ Zod schemas integrated
- ⚠️ Optional: Rename `components/` to `ui/` for clarity
