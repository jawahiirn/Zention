import { z } from 'zod';
import { userSchema } from './user.schema';

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

export const createInvitationResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  status: z.string(),
  workspace: z.object({ id: z.string() }),
  invitedBy: z.object({ id: z.string() }),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const workspaceMemberInvitationSchema = z.object({
  id: z.string(),
  email: z.string(),
  status: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const workspaceMemberSchema = z.object({
  id: z.string(),
  user: userSchema,
  role: z.string(),
  joinedAt: z.iso.datetime(),
  invitation: workspaceMemberInvitationSchema,
});

export const workspaceMembersResponseSchema = z.array(workspaceMemberSchema);

export const onboardingStepSchema = z.object({
  id: z.string(),
  type: z.enum(['select', 'multi-select', 'radio', 'checkbox']),
  label: z.string(),
  options: z.array(z.object({ label: z.string(), value: z.string() })),
  required: z.boolean(),
  shortDescription: z.string(),
});

export const onboardingConfigSchema = z.object({
  steps: z.array(onboardingStepSchema),
});

export const memberRoleSchema = z.object({
  role: z.string(),
  title: z.string(),
  description: z.string(),
});

export const memberRolesConfigSchema = z.object({
  roles: z.array(memberRoleSchema),
});

export const onboardingConfigItemSchema = z.object({
  id: z.string(),
  key: z.literal('default'),
  config: onboardingConfigSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const memberRolesConfigItemSchema = z.object({
  id: z.string(),
  key: z.literal('member-roles'),
  config: memberRolesConfigSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const configSchema = z.array(
  z.discriminatedUnion('key', [onboardingConfigItemSchema, memberRolesConfigItemSchema])
);
