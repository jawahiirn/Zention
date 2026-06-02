'use client';

import type { ReactNode } from 'react';
import { WorkspaceConfigProvider } from '@/features/onboarding/contexts/workspace-config-context';

export default function WorkspaceGroupLayout({ children }: { children: ReactNode }) {
  return <WorkspaceConfigProvider>{children}</WorkspaceConfigProvider>;
}
