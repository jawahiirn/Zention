import { queryOptions } from '@tanstack/react-query';
import { getAllWorkspaces, getOnboardingConfig } from './network';

export const workspaceQueries = {
  list: () =>
    queryOptions({
      queryKey: ['workspace', 'list'] as const,
      queryFn: () => getAllWorkspaces(),
      staleTime: 0,
    }),
  config: () =>
    queryOptions({
      queryKey: ['workspace', 'config'] as const,
      queryFn: () => getOnboardingConfig(),
      staleTime: Infinity,
    }),
};
