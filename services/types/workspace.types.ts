import type { z } from 'zod';
import type { createWorkspaceResponseSchema, getAllWorkspacesSchema, workspaceSchema } from '@/services/schemas';

export interface CreateWorkspaceRequest {
  name: string;
  icon: string;
  iconColor: string;
  invitedEmails: string[];
}

export type CreateWorkspaceResponse = z.infer<typeof createWorkspaceResponseSchema>;
export type Workspace = z.infer<typeof workspaceSchema>;
export type WorkspaceList = z.infer<typeof getAllWorkspacesSchema>;
