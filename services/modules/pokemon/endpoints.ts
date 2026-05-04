import { axiosRequest } from '@/services/api-client';
import { pokemonDetailsSchema, pokemonListSchema } from '@/services/schemas/pokemon.schema';
import type { PokemonDetailsRequest, PokemonDetailsResponse, PokemonListResponse } from '@/services/types/pokemon.types';

export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  const data = await axiosRequest<PokemonListResponse>({
    url: '/pokemon',
    params: { limit, offset },
  });
  return pokemonListSchema.parse(data);
};

export const getPokemonDetails = async (data: PokemonDetailsRequest): Promise<PokemonDetailsResponse> => {
  const result = await axiosRequest<PokemonDetailsResponse>({
    url: `/pokemon/${data.name}`,
  });
  return pokemonDetailsSchema.parse(result);
};
