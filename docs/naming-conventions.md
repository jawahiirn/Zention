# Naming Conventions

## File Naming Rules

All files should use `kebab-case` for consistency and compatibility across different operating systems.

| File Type | Convention | Example |
|-----------|-----------|---------|
| **Components** | `kebab-case.tsx` | `pokemon-detail.tsx` |
| **Hooks** | `use-*.ts` | `use-pokemon-filters.ts` |
| **Types** | `*.types.ts` | `pokemon.types.ts` |
| **Schemas** | `*.schema.ts` | `pokemon.schema.ts` |
| **Constants** | `*-constants.ts` | `pokemon-type-constants.ts` |
| **Utils** | `*.utils.ts` or `utils.ts` | `string.utils.ts` |
| **API Endpoints** | `endpoints.ts` | `endpoints.ts` |
| **Queries** | `queries.ts` | `queries.ts` |
| **Mutations** | `mutations.ts` | `mutations.ts` |
| **Prefetch** | `prefetch.ts` | `prefetch.ts` |
| **Providers** | `*-provider.tsx` | `theme-provider.tsx` |
| **Stores** | `use-*-store.ts` | `use-preferences-store.ts` |

## Export Naming Rules

| Export Type | Convention | Example |
|-------------|-----------|---------|
| **Components** | `PascalCase` | `export const PokemonDetail` |
| **Hooks** | `camelCase` (use*) | `export const usePokemonFilters` |
| **Functions** | `camelCase` | `export const getPokemonList` |
| **Types/Interfaces** | `PascalCase` | `export type PokemonResponse` |
| **Constants** | `UPPER_SNAKE_CASE` | `export const API_BASE_URL` |
| **Schemas** | `camelCase` (ends in Schema) | `export const pokemonSchema` |

## Examples

### ✅ Good Examples

```typescript
// File: features/pokemon/components/pokemon-detail.tsx
export const PokemonDetail = () => { /* ... */ };

// File: shared/hooks/use-auth-token.ts
export const useAuthToken = () => { /* ... */ };

// File: features/pokemon/schemas/pokemon.schema.ts
export const pokemonSchema = z.object({ /* ... */ });

// File: shared/constants/api-constants.ts
export const API_BASE_URL = 'https://pokeapi.co/api/v2';
```

### ❌ Bad Examples

```typescript
// ❌ File: features/pokemon/components/PokemonDetail.tsx (PascalCase filename)
// ❌ File: shared/hooks/useAuthToken.ts (camelCase filename)
// ❌ File: features/pokemon/schemas/PokemonSchema.ts (PascalCase filename)
```

## Import Path Conventions

Use path aliases consistently:

```typescript
// ✅ Good
import { PokemonDetail } from '@/features/pokemon/components/pokemon-detail';
import { useAuthToken } from '@/shared/hooks/use-auth-token';
import { Button } from '@/components/ui/button';

// ❌ Bad - avoid relative imports for cross-feature imports
import { PokemonDetail } from '../../../features/pokemon/components/pokemon-detail';
```

## Barrel Exports

**Avoid barrel exports for components** to improve tree-shaking and build performance in Next.js App Router.

### ✅ Use Barrel Exports For:
- Type definitions (`features/*/types/index.ts`)
- Schemas (`features/*/schemas/index.ts`)
- Pure utility modules

### ❌ Avoid Barrel Exports For:
- Components (especially mixing client/server components)
- Hooks
- API functions

```typescript
// ✅ Good - Direct import
import { ErrorBoundary } from '@/shared/components/error-boundary';

// ❌ Bad - Barrel export
import { ErrorBoundary } from '@/shared/components';
```
