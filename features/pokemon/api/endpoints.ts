import { axiosRequest } from '@/shared/lib/api-client';
import { PokemonListResponse, PokemonDetailsResponse, CreatePokemonRequest, PokemonDetailsRequest } from '../types';
import { pokemonListSchema, pokemonDetailsSchema } from '../schemas';

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

export const createPokemon = (data: CreatePokemonRequest) => {
  return axiosRequest({
    url: '/pokemon',
    method: 'POST',
    data,
  });
};
