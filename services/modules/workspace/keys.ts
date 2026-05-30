export const workspaceKeys = {
  all: ['workspace'] as const,
  list: () => [...workspaceKeys.all, 'list'] as const,
};
