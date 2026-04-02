# Type Ownership Rules

## Type Hierarchy

Types should be organized based on their scope and usage:

```
Global Types (shared/types/)
    ↓
Feature Types (features/*/types/)
    ↓
Component Props (inline in component files)
```

## Type Location Rules

| Type Category | Location | Example |
|---------------|----------|---------|
| **Feature Domain Types** | `features/{feature}/types/domain.ts` | `Pokemon`, `PokemonType` |
| **Feature API Request Types** | `features/{feature}/types/request.ts` | `CreatePokemonRequest` |
| **Feature API Response Types** | `features/{feature}/types/response.ts` | `PokemonListResponse` |
| **Global API Types** | `shared/types/api.types.ts` | `ApiError`, `PaginatedResponse<T>` |
| **Global Utility Types** | `shared/types/common.types.ts` | `Nullable<T>`, `AsyncState<T>` |
| **UI Component Props** | Same file as component | `type ButtonProps = {...}` |
| **Zod Schemas** | `features/{feature}/schemas/` | `pokemonSchema` |
| **Inferred Types from Zod** | `features/{feature}/types/` | `type Pokemon = z.infer<typeof pokemonSchema>` |

## Zod Schema Integration

**Best Practice**: Define Zod schemas first, then infer TypeScript types from them.

### Example: Pokemon Feature

```typescript
// features/pokemon/schemas/pokemon.schema.ts
import { z } from 'zod';

export const pokemonSchema = z.object({
  name: z.string(),
  url: z.string().regex(/^https?:\/\//, "Must be a valid URL"),
});

export const pokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonSchema),
});
```

```typescript
// features/pokemon/types/domain.ts
import { z } from 'zod';
import { pokemonSchema } from '../schemas';

// ✅ Single source of truth: Zod schema
export type Pokemon = z.infer<typeof pokemonSchema>;
```

```typescript
// features/pokemon/types/response.ts
import { PaginatedResponse } from '@/shared/types/api.types';
import { Pokemon } from './domain';

// ✅ Use global type for consistency
export type PokemonListResponse = PaginatedResponse<Pokemon>;
```

## Global Types

### `shared/types/api.types.ts`

```typescript
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
```

### `shared/types/common.types.ts`

```typescript
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};
```

## Type Import Rules

### ✅ Good Practices

```typescript
// Import from barrel exports for types
import { Pokemon, PokemonListResponse } from '@/features/pokemon/types';

// Import global types directly
import { PaginatedResponse, ApiError } from '@/shared/types/api.types';

// Import schemas for validation
import { pokemonSchema } from '@/features/pokemon/schemas';
```

### ❌ Bad Practices

```typescript
// ❌ Don't duplicate types across features
// features/user/types/common.ts
export type PaginatedResponse<T> = { /* ... */ }; // Already exists in shared!

// ❌ Don't define types in component files if they're reused
// features/pokemon/components/pokemon-list.tsx
type Pokemon = { name: string; url: string }; // Should be in types/
```

## Type Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Interfaces** | `PascalCase` | `interface PokemonListResponse` |
| **Types** | `PascalCase` | `type Pokemon = { ... }` |
| **Generic Types** | `PascalCase<T>` | `type AsyncState<T>` |
| **Utility Types** | `PascalCase<T>` | `type Nullable<T>` |
| **DTOs** | `PascalCase` + suffix | `CreatePokemonRequest`, `PokemonDetailsResponse` |

## When to Use Interfaces vs Types

### Use `interface` for:
- Object shapes that might be extended
- Public API contracts
- React component props

```typescript
interface PokemonDetailsResponse {
  id: number;
  name: string;
  // ...
}
```

### Use `type` for:
- Unions and intersections
- Utility types
- Inferred types from Zod
- Simple aliases

```typescript
type Pokemon = z.infer<typeof pokemonSchema>;
type PokemonListResponse = PaginatedResponse<Pokemon>;
type Status = 'idle' | 'loading' | 'success' | 'error';
```

## Type Reusability

### Global Types Should Be:
- Generic and reusable across features
- Well-documented
- Stable (avoid frequent changes)

### Feature Types Should Be:
- Specific to the feature domain
- Co-located with feature code
- Exported via barrel exports

## Example: Complete Type Flow

```typescript
// 1. Define Zod schema
// features/pokemon/schemas/pokemon.schema.ts
export const pokemonSchema = z.object({
  name: z.string(),
  url: z.string().regex(/^https?:\/\//),
});

// 2. Infer domain type
// features/pokemon/types/domain.ts
export type Pokemon = z.infer<typeof pokemonSchema>;

// 3. Use global type for response
// features/pokemon/types/response.ts
import { PaginatedResponse } from '@/shared/types/api.types';
export type PokemonListResponse = PaginatedResponse<Pokemon>;

// 4. Validate in API endpoint
// features/pokemon/api/endpoints.ts
import { pokemonListSchema } from '../schemas';
export const getPokemonList = async (): Promise<PokemonListResponse> => {
  const data = await axiosRequest({ url: '/pokemon' });
  return pokemonListSchema.parse(data); // Runtime validation
};

// 5. Use in component
// features/pokemon/components/pokemon-list.tsx
import { Pokemon } from '../types';
export const PokemonList = ({ pokemon }: { pokemon: Pokemon[] }) => {
  // ...
};
```
