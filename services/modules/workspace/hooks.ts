import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getMembers, setMembers } from '@/lib/workspace/member-store';
import type { InviteByEmailRequest, WorkspaceMemberList } from '@/services/types';
import { createWorkspace, getWorkspaceMembers, inviteByEmail } from './network';

export const useCreateWorkspaceMutation = () =>
  useMutation({
    mutationFn: createWorkspace,
  });

export const useInviteByEmailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workspaceId, data }: { workspaceId: string; data: InviteByEmailRequest }) =>
      inviteByEmail(workspaceId, data),
    onSuccess: (_data, { workspaceId }) => {
      queryClient.invalidateQueries({ queryKey: ['workspace', 'members', workspaceId] });
    },
  });
};

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
