import { z } from 'zod';

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  iconColor: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  createdBy: z.object({ id: z.string() }).passthrough(),
});

export const createWorkspaceResponseSchema = workspaceSchema;

export const getAllWorkspacesSchema = z.array(workspaceSchema);

export const onboardingConfigSchema = z.object({
  steps: z.array(
    z.object({
      id: z.string(),
      type: z.enum(['select', 'multi-select', 'radio', 'checkbox']),
      label: z.string(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
      required: z.boolean(),
      shortDescription: z.string(),
    })
  ),
});
