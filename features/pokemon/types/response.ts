import type { z } from 'zod';
import type { pokemonDetailsSchema, pokemonListSchema } from '../schemas';

export type PokemonListResponse = z.infer<typeof pokemonListSchema>;
export type PokemonDetailsResponse = z.infer<typeof pokemonDetailsSchema>;
