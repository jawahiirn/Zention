import type { z } from 'zod';
import type {
  configSchema,
  createInvitationResponseSchema,
  createWorkspaceResponseSchema,
  getAllWorkspacesSchema,
  onboardingConfigSchema,
  onboardingStepSchema,
  workspaceMemberSchema,
  workspaceMembersResponseSchema,
  workspaceSchema,
} from '@/services/schemas';

export interface CreateWorkspaceRequest {
  name: string;
  icon: string;
  iconColor: string;
  invitedEmails: string[];
}

export interface InviteByEmailRequest {
  email: string;
}

export type CreateInvitationResponse = z.infer<typeof createInvitationResponseSchema>;
export type CreateWorkspaceResponse = z.infer<typeof createWorkspaceResponseSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export type WorkspaceList = z.infer<typeof getAllWorkspacesSchema>;
export type ConfigList = z.infer<typeof configSchema>;
export type OnboardingConfig = z.infer<typeof onboardingConfigSchema>;
export type OnboardingStep = z.infer<typeof onboardingStepSchema>;
export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>;
export type WorkspaceMemberList = z.infer<typeof workspaceMembersResponseSchema>;
