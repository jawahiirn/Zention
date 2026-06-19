'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { getRandomColor } from '@/constants/colors';
import type { OnboardingValues } from '@/features/onboarding/types/request';
import { useCreateWorkspaceMutation } from '@/services/modules/workspace';

export function useOnboardingComplete() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspaceMutation();

  const complete = useCallback(
    async (data: OnboardingValues) => {
      const invitedEmails = data.inviteEmails ? data.inviteEmails.split(/[,\s]+/).filter(Boolean) : [];

      const workspace = await createWorkspace({
        name: data.spaceName,
        icon: '',
        iconColor: getRandomColor('CREATE_WORKSPACE'),
        invitedEmails,
      });

      queryClient.setQueryData(['workspace', 'list'], (old: unknown) => {
        const list = Array.isArray(old) ? old : [];
        return [...list, workspace];
      });

      router.push(`/${workspace.id}/home`);
    },
    [createWorkspace, queryClient, router]
  );

  return { complete, isPending };
}
