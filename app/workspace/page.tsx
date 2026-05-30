'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getAllWorkspaces, workspaceKeys } from '@/services/modules/workspace';

export default function WorkspaceEntry() {
  const { data: workspaces, isLoading } = useQuery({
    queryKey: workspaceKeys.list(),
    queryFn: getAllWorkspaces,
  });
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (workspaces && workspaces.length > 0) {
      router.replace(`/workspace/${workspaces[0].id}`);
    } else {
      router.replace('/onboarding');
    }
  }, [workspaces, isLoading, router]);

  return null;
}
