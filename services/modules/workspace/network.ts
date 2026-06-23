import { axiosRequest } from '@/lib/api-client';
import {
  createInvitationResponseSchema,
  createWorkspaceResponseSchema,
  getAllWorkspacesSchema,
  onboardingConfigSchema,
  workspaceMembersResponseSchema,
} from '@/services/schemas';
import type {
  CreateInvitationResponse,
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  InviteByEmailRequest,
  WorkspaceList,
  WorkspaceMemberList,
} from '@/services/types';

const createWorkspace = async (data: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse> => {
  const result = await axiosRequest<CreateWorkspaceResponse>({
    url: '/workspaces',
    method: 'POST',
    data,
  });
  return createWorkspaceResponseSchema.parse(result);
};

const getAllWorkspaces = async (serverToken?: string): Promise<WorkspaceList> => {
  const headers: Record<string, string> = {};
  if (serverToken) headers.Authorization = `Bearer ${serverToken}`;

  const result = await axiosRequest<WorkspaceList>({
    url: '/workspaces',
    method: 'GET',
    headers,
  });
  return getAllWorkspacesSchema.parse(result);
};

const getOnboardingConfig = async () => {
  const result = await axiosRequest<void>({
    url: '/onboarding/config',
    method: 'GET',
  });
  return onboardingConfigSchema.parse(result);
};

const getWorkspaceMembers = async (workspaceId: string): Promise<WorkspaceMemberList> => {
  const result = await axiosRequest<WorkspaceMemberList>({
    url: `/workspaces/${workspaceId}/members`,
    method: 'GET',
  });
  return workspaceMembersResponseSchema.parse(result);
};

const inviteByEmail = async (workspaceId: string, data: InviteByEmailRequest): Promise<CreateInvitationResponse> => {
  const result = await axiosRequest<CreateInvitationResponse>({
    url: `/workspaces/${workspaceId}/invitations`,
    method: 'POST',
    data,
  });
  return createInvitationResponseSchema.parse(result);
};

export { createWorkspace, getAllWorkspaces, getOnboardingConfig, getWorkspaceMembers, inviteByEmail };
