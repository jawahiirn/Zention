import { queryOptions } from '@tanstack/react-query';
import { getAllWorkspaces, getOnboardingConfig, getWorkspaceMembers } from './network';

export const workspaceQueries = {
  list: () =>
    queryOptions({
      queryKey: ['workspace', 'list'] as const,
      queryFn: () => getAllWorkspaces(),
      staleTime: 60 * 1000,
    }),
  config: () =>
    queryOptions({
      queryKey: ['workspace', 'config'] as const,
      queryFn: () => getOnboardingConfig(),
      staleTime: Infinity,
    }),
  members: (workspaceId: string) =>
    queryOptions({
      queryKey: ['workspace', 'members', workspaceId] as const,
      queryFn: () => getWorkspaceMembers(workspaceId),
      staleTime: 60 * 1000,
    }),
};
