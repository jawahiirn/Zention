import { useMutation, useQuery } from '@tanstack/react-query';
import { createWorkspace } from './network';
import { workspaceQueries } from './queries';

export const useCreateWorkspaceMutation = () =>
  useMutation({
    mutationFn: createWorkspace,
  });

export const useWorkspaceMembersQuery = (workspaceId: string) => useQuery(workspaceQueries.members(workspaceId));
