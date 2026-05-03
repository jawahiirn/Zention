import type { z } from 'zod';
import type { pokemonDetailsSchema, pokemonListSchema } from '@/services/schemas';

export type PokemonListResponse = z.infer<typeof pokemonListSchema>;
export type PokemonDetailsResponse = z.infer<typeof pokemonDetailsSchema>;

export interface PokemonDetailsRequest {
  name: string;
}
