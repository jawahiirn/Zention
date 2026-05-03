import type { QueryClient } from '@tanstack/react-query';
import { getPokemonDetails, getPokemonList } from '@/services/endpoints';

export const pokemonDetailsQuery = (name: string) => ({
  queryKey: ['pokemon', name],
  queryFn: () => getPokemonDetails({ name }),
});

export const pokemonListQuery = (limit: number = 20, offset: number = 0) => ({
  queryKey: ['pokemon-list', limit, offset],
  queryFn: () => getPokemonList(limit, offset),
});

export const prefetchPokemonList = async (queryClient: QueryClient, limit: number = 20, offset: number = 0) => {
  await queryClient.prefetchQuery(pokemonListQuery(limit, offset));
};
