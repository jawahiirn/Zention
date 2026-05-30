'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useWorkspacesQuery } from '@/services/modules/workspace';

export default function WorkspaceEntry() {
  const { data: workspaces } = useWorkspacesQuery();
  const router = useRouter();

  useEffect(() => {
    if (workspaces.length > 0) {
      router.replace(`/${workspaces[0].id}/home`);
    } else {
      router.replace('/onboarding');
    }
  }, [workspaces, router]);

  return null;
}
