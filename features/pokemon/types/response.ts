import { z } from 'zod';
import { pokemonListSchema, pokemonDetailsSchema } from '../schemas';

export type PokemonListResponse = z.infer<typeof pokemonListSchema>;
export type PokemonDetailsResponse = z.infer<typeof pokemonDetailsSchema>;
