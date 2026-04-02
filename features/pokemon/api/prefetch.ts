import { QueryClient } from '@tanstack/react-query';
import { pokemonListQuery } from './queries';

export const prefetchPokemonList = async (queryClient: QueryClient, limit: number = 20, offset: number = 0) => {
  await queryClient.prefetchQuery(pokemonListQuery(limit, offset));
};
