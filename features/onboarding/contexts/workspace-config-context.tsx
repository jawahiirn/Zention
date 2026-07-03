'use client';

import { useQuery } from '@tanstack/react-query';
import { createContext, type ReactNode, useContext } from 'react';
import { workspaceQueries } from '@/services/modules/workspace';
import type { OnboardingConfig } from '@/services/types';

interface WorkspaceConfigContextValue {
  onboardingConfig: OnboardingConfig | undefined;
  isLoading: boolean;
}

const WorkspaceConfigContext = createContext<WorkspaceConfigContextValue | null>(null);

export function WorkspaceConfigProvider({ children }: { children: ReactNode }) {
  const { data: allConfigs, isLoading } = useQuery({
    ...workspaceQueries.config(),
    throwOnError: false,
  });

  const defaultConfigItem = allConfigs?.find((c) => c.key === 'default');
  const onboardingConfig = defaultConfigItem?.key === 'default' ? defaultConfigItem.config : undefined;

  return (
    <WorkspaceConfigContext.Provider value={{ onboardingConfig, isLoading }}>
      {children}
    </WorkspaceConfigContext.Provider>
  );
}

export function useWorkspaceConfig() {
  const ctx = useContext(WorkspaceConfigContext);
  if (!ctx) {
    throw new Error('useWorkspaceConfig must be used within WorkspaceConfigProvider');
  }
  return ctx;
}
