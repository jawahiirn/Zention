import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  fullName: z.string().nullish(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  joinedAt: z.iso.datetime(),
  isActive: z.boolean(),
  isPending: z.boolean(),
});
