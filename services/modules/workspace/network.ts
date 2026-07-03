import { axiosRequest } from '@/lib/api-client';
import {
  configSchema,
  createInvitationResponseSchema,
  createWorkspaceResponseSchema,
  getAllWorkspacesSchema,
  workspaceMembersResponseSchema,
} from '@/services/schemas';
import type {
  ConfigList,
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

const getWorkspaceConfigs = async (): Promise<ConfigList> => {
  const result = await axiosRequest({
    url: '/config',
    method: 'GET',
  });
  return configSchema.parse(result);
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

export { createWorkspace, getAllWorkspaces, getWorkspaceConfigs, getWorkspaceMembers, inviteByEmail };
