import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getMembers, setMembers } from '@/lib/workspace/member-store';
import type { WorkspaceMemberList } from '@/services/types';
import { createWorkspace, getWorkspaceMembers } from './network';

export const useCreateWorkspaceMutation = () =>
  useMutation({
    mutationFn: createWorkspace,
  });

export const useWorkspaceMembersQuery = (workspaceId: string) => {
  const [cached, setCached] = useState<WorkspaceMemberList>();

  useEffect(() => {
    getMembers(workspaceId).then(setCached);
  }, [workspaceId]);

  return useQuery({
    queryKey: ['workspace', 'members', workspaceId] as const,
    queryFn: async () => {
      const data = await getWorkspaceMembers(workspaceId);
      await setMembers(workspaceId, data);
      return data;
    },
    placeholderData: cached,
    staleTime: 60 * 1000,
    refetchOnMount: false,
    networkMode: 'offlineFirst',
  });
};
