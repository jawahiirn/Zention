import { useMutation } from '@tanstack/react-query';
import { createWorkspace } from './network';

export const useCreateWorkspaceMutation = () =>
  useMutation({
    mutationFn: createWorkspace,
  });
