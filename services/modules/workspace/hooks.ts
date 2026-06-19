import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { setCachedMembers } from '@/lib/workspace/member-store';
import { createWorkspace, getWorkspaceMembers } from './network';

export const useCreateWorkspaceMutation = () =>
  useMutation({
    mutationFn: createWorkspace,
  });

export const useWorkspaceMembersQuery = (workspaceId: string) => {
  const query = useQuery({
    queryKey: ['workspace', 'members', workspaceId] as const,
    queryFn: () => getWorkspaceMembers(workspaceId),
    staleTime: 60 * 1000,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (query.data) {
      setCachedMembers(workspaceId, query.data);
    }
  }, [workspaceId, query.data]);

  return query;
};
