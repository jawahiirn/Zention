# Folder Structure

## Current Architecture

```
zention/
├── app/                           # Next.js App Router (routes only)
│   ├── [workspaceId]/
│   │   ├── home/
│   │   └── layout.tsx
│   ├── onboarding/
│   ├── signup/
│   ├── error.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
│
├── services/                      # Centralized service layer (all API communication)
│   ├── api-client.ts              # Axios instance with interceptors
│   ├── endpoints/                 # HTTP call functions
│   │   ├── index.ts               # Barrel export
│   │   ├── auth.endpoints.ts
│   │   └── pokemon.endpoints.ts
│   ├── queries/                   # TanStack Query factories + prefetch
│   │   ├── index.ts               # Barrel export
│   │   ├── auth.queries.ts
│   │   └── pokemon.queries.ts
│   ├── schemas/                   # Zod schemas for API response validation
│   │   ├── index.ts               # Barrel export
│   │   ├── auth.schema.ts
│   │   └── pokemon.schema.ts
│   └── types/                     # Request/Response DTOs
│       ├── index.ts               # Barrel export
│       ├── auth.types.ts
│       └── pokemon.types.ts
│
├── features/                      # Feature modules (UI-only)
│   ├── auth/
│   │   ├── components/            # Login, signup forms
│   │   └── schemas/               # Form validation schemas (react-hook-form)
│   ├── i18n/
│   │   ├── components/
│   │   ├── config.ts
│   │   ├── locale.ts
│   │   ├── ls.ts
│   │   ├── request.ts
│   │   └── use-i18n.ts
│   ├── landing/
│   │   └── components/
│   ├── onboarding/
│   │   ├── components/
│   │   ├── config/                # UI step definitions
│   │   ├── schemas/               # Form validation schemas
│   │   └── types/                 # Form types
│   ├── pokemon/
│   │   └── components/
│   └── theme/
│       └── components/
│
├── shared/                        # Shared across features
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   └── lib/
│       ├── query-client.tsx       # TanStack Query client
│       └── utils.ts
│
├── components/                    # UI Design System (shadcn/ui)
│   ├── primitives/
│   └── ui/
│
├── providers/                     # React Context providers
│   ├── index.ts
│   ├── query-client-provider.tsx
│   └── theme-provider.tsx
│
├── messages/                      # i18n translations
├── docs/                          # Project documentation
├── public/                        # Static assets
└── styles/                        # Global styles
```

## Directory Responsibilities

### `app/`

- **Purpose**: Next.js App Router routes only
- **Rules**:
  - Keep pages as Server Components by default
  - Extract client logic to feature components
  - Use `loading.tsx`, `error.tsx` for route-level UI states

### `services/`

- **Purpose**: Centralized service layer for all backend communication
- **Structure**:
  - `api-client.ts` — Axios instance with auth interceptors
  - `endpoints/` — Raw HTTP call functions with Zod validation
  - `queries/` — TanStack Query factories and prefetch utilities
  - `schemas/` — Zod schemas for API response validation
  - `types/` — Request/Response DTOs inferred from schemas
- **Rules**:
  - All API communication flows through this layer
  - Each domain gets its own `{domain}.endpoints.ts`, `{domain}.queries.ts`, etc.
  - Barrel exports via `index.ts` in each subdirectory
  - Never import from `features/` — the dependency flows one way

### `features/`

- **Purpose**: UI-only feature modules
- **Structure**: Each feature has its own `components/` and optionally `schemas/`, `config/`, `types/` for UI concerns
- **Rules**:
  - No API call logic — import from `services/` instead
  - Form validation schemas stay here (used by react-hook-form)
  - Features should not cross-import from other features
  - Cross-feature dependencies go through `shared/`

### `shared/`

- **Purpose**: Code shared across multiple features
- **Rules**:
  - No feature-specific logic
  - Must be generic and reusable

### `components/`

- **Purpose**: UI design system (shadcn/ui components)
- **Rules**:
  - Only primitive, reusable UI components
  - No business logic

### `providers/`

- **Purpose**: React Context providers
- **Rules**:
  - Global application providers only
  - Feature-specific providers go in `features/*/providers/`

## Adding New Services

When adding a new service domain (e.g., `workspace`):

```bash
touch services/endpoints/workspace.endpoints.ts
touch services/queries/workspace.queries.ts
touch services/schemas/workspace.schema.ts
touch services/types/workspace.types.ts
```

Then add exports to each `index.ts` barrel file.

## Adding New Features

When adding a new UI feature (e.g., `settings`):

```bash
mkdir -p features/settings/components
```

Import API logic from `services/`, not from other features.
