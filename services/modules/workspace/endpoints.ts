import { axiosRequest } from '@/services/api-client';
import { createWorkspaceResponseSchema } from '@/services/schemas';
import type { CreateWorkspaceRequest, CreateWorkspaceResponse } from '@/services/types';

const createWorkspace = async (data: CreateWorkspaceRequest): Promise<CreateWorkspaceResponse> => {
  const result = await axiosRequest<CreateWorkspaceResponse>({
    url: '/workspaces',
    method: 'POST',
    data,
  });
  return createWorkspaceResponseSchema.parse(result);
};

const getAllWorkspaces = async () => {
  const result = await axiosRequest<CreateWorkspaceResponse>({
    url: '/workspaces',
    method: 'GET',
  });
  return createWorkspaceResponseSchema.parse(result);
};

export { createWorkspace, getAllWorkspaces };
