import { z } from 'zod';

const pokemonSchema = z.object({
  name: z.string(),
  url: z.string().regex(/^https?:\/\//, 'Must be a valid URL'),
});

export const pokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(pokemonSchema),
});

const pokemonTypeSchema = z.object({
  slot: z.number().optional(),
  type: z.object({
    name: z.string(),
    url: z
      .string()
      .regex(/^https?:\/\//, 'Must be a valid URL')
      .optional(),
  }),
});

const pokemonSpritesSchema = z.object({
  front_default: z.string().regex(/^https?:\/\//, 'Must be a valid URL'),
  back_default: z
    .string()
    .regex(/^https?:\/\//, 'Must be a valid URL')
    .nullable()
    .optional(),
  front_shiny: z
    .string()
    .regex(/^https?:\/\//, 'Must be a valid URL')
    .nullable()
    .optional(),
  back_shiny: z
    .string()
    .regex(/^https?:\/\//, 'Must be a valid URL')
    .nullable()
    .optional(),
});

export const pokemonDetailsSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: pokemonSpritesSchema,
  types: z.array(pokemonTypeSchema),
});

