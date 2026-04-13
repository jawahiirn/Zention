import { axiosRequest } from '@/shared/lib/api-client';
import { pokemonDetailsSchema, pokemonListSchema } from '../schemas';
import type { PokemonDetailsRequest, PokemonDetailsResponse, PokemonListResponse } from '../types';

export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  const data = await axiosRequest({
    url: '/pokemon',
    params: { limit, offset },
  });
  return pokemonListSchema.parse(data);
};

export const getPokemonDetails = async (data: PokemonDetailsRequest): Promise<PokemonDetailsResponse> => {
  const result = await axiosRequest({
    url: `/pokemon/${data.name}`,
  });
  return pokemonDetailsSchema.parse(result);
};
