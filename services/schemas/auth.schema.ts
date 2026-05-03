import { z } from 'zod';

export const loginResponseSchema = z.object({
  token: z.string(),
});

export const signupResponseSchema = z.object({
  token: z.string(),
});

export const authStatusSchema = z.object({
  isOnboarded: z.boolean(),
});
