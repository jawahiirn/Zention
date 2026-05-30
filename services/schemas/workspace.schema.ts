import { z } from 'zod';
import { userSchema } from '@/services/schemas/user.schema';

export const createWorkspaceResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  iconColor: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  createdBy: userSchema,
});

export const getAllWorkspacesSchema = z.array(workspaceSchema);
