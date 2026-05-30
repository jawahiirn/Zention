export const workspaceKeys = {
  all: ['workspace'] as const,
  session: () => [...workspaceKeys.all, 'session'] as const,
};
