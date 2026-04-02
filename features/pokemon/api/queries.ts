import { getPokemonDetails, getPokemonList } from './endpoints';

export const pokemonDetailsQuery = (name: string) => ({
  queryKey: ['pokemon', name],
  queryFn: () => getPokemonDetails({ name }),
});

export const pokemonListQuery = (limit: number = 20, offset: number = 0) => ({
  queryKey: ['pokemon-list', limit, offset],
  queryFn: () => getPokemonList(limit, offset),
});