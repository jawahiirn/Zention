import { getAuthStatus } from '@/services/endpoints';

export const authStatusQuery = () => ({
  queryKey: ['auth', 'status'],
  queryFn: () => getAuthStatus(),
});
