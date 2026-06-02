import { queryOptions } from '@tanstack/react-query';
import { getAllWorkspaces } from './network';

export const workspaceQueries = {
  list: () =>
    queryOptions({
      queryKey: ['workspace', 'list'] as const,
      queryFn: () => getAllWorkspaces(),
      staleTime: 0,
    }),
};
