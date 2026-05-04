import { useQuery, type QueryClient } from '@tanstack/react-query';
import { getPokemonDetails, getPokemonList } from './endpoints';
import { pokemonKeys } from './keys';

export const usePokemonList = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: pokemonKeys.list({ limit, offset }),
    queryFn: () => getPokemonList(limit, offset),
  });
};

export const usePokemonDetails = (name: string) => {
  return useQuery({
    queryKey: pokemonKeys.detail(name),
    queryFn: () => getPokemonDetails({ name }),
    enabled: !!name,
  });
};

export const prefetchPokemonList = async (queryClient: QueryClient, limit: number = 20, offset: number = 0) => {
  await queryClient.prefetchQuery({
    queryKey: pokemonKeys.list({ limit, offset }),
    queryFn: () => getPokemonList(limit, offset),
  });
};
