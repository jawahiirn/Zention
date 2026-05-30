import { useSuspenseQuery } from '@tanstack/react-query';
import { getAllWorkspaces } from './endpoints';
import { workspaceKeys } from './keys';

export const useWorkspacesQuery = () => {
  return useSuspenseQuery({
    queryKey: workspaceKeys.list(),
    queryFn: getAllWorkspaces,
  });
};
