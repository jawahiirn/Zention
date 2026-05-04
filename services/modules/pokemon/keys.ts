export const pokemonKeys = {
  all: ['pokemon'] as const,
  lists: () => [...pokemonKeys.all, 'list'] as const,
  list: (params: { limit: number; offset: number }) => [...pokemonKeys.lists(), params] as const,
  details: () => [...pokemonKeys.all, 'detail'] as const,
  detail: (name: string) => [...pokemonKeys.details(), name] as const,
};
