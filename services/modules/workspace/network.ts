import { axiosRequest } from '@/services/api-client';
import { createWorkspaceResponseSchema, getAllWorkspacesSchema, onboardingConfigSchema } from '@/services/schemas';
import type { CreateWorkspaceRequest, CreateWorkspaceResponse, WorkspaceList } from '@/services/types';

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

export { createWorkspace, getAllWorkspaces, getOnboardingConfig };
