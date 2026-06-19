import type { z } from 'zod';
import type {
  createWorkspaceResponseSchema,
  getAllWorkspacesSchema,
  onboardingConfigSchema,
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

export type CreateWorkspaceResponse = z.infer<typeof createWorkspaceResponseSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export type WorkspaceList = z.infer<typeof getAllWorkspacesSchema>;
export type OnboardingConfig = z.infer<typeof onboardingConfigSchema>;
export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>;
export type WorkspaceMemberList = z.infer<typeof workspaceMembersResponseSchema>;
