import { axiosRequest } from '@/services/api-client';
import { createWorkspaceResponseSchema, getAllWorkspacesSchema } from '@/services/schemas';
import type { CreateWorkspaceRequest, CreateWorkspaceResponse, WorkspaceList } from '@/services/types';

const createWorkspace = async (data: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse> => {
  const result = await axiosRequest<CreateWorkspaceResponse>({
    url: '/workspaces',
    method: 'POST',
    data,
  });
  return createWorkspaceResponseSchema.parse(result);
};

const getAllWorkspaces = async (): Promise<WorkspaceList> => {
  const result = await axiosRequest<WorkspaceList>({
    url: '/workspaces',
    method: 'GET',
  });
  return getAllWorkspacesSchema.parse(result);
};

export { createWorkspace, getAllWorkspaces };
