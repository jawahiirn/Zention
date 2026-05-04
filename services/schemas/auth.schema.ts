import { z } from 'zod';

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const signupResponseSchema = z.object({
  token: z.string(),
});
