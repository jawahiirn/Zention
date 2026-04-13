'use client';

import { type ReactNode, useCallback } from 'react';
import type { Layout } from 'react-resizable-panels';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarInset, type SidebarVariantType } from '@/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/app-sidebar';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_MIN_WIDTH, SIDEBAR_DEFAULT_WIDTH } from '@/shared/constants/app-sidebar-constants';

interface WorkspaceShellProps {
  children: ReactNode;
  sidebarVariant: SidebarVariantType;
  initialLayout?: Layout;
}

export function WorkspaceShell({ children, sidebarVariant, initialLayout }: WorkspaceShellProps) {
  const onLayoutChanged = useCallback((layout: Layout) => {
    document.cookie = `sidebar:layout=${JSON.stringify(layout)}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const defaultSize = initialLayout?.[0] ?? SIDEBAR_DEFAULT_WIDTH;

  return (
    <ResizablePanelGroup
      onLayoutChanged={onLayoutChanged}
      orientation="horizontal"
      className="h-full flex items-stretch overflow-hidden"
      defaultLayout={initialLayout}
    >
      <ResizablePanel
        defaultSize={defaultSize}
        minSize={SIDEBAR_MIN_WIDTH}
        maxSize={SIDEBAR_MAX_WIDTH}
        className="hidden md:block h-full transition-all duration-300 ease-in-out"
      >
        <AppSidebar variant={sidebarVariant} className="h-full" />
      </ResizablePanel>

      <ResizableHandle className="hidden md:flex w-1 hover:bg-accent transition-colors" />

      <ResizablePanel defaultSize={100 - defaultSize} minSize={30} className="h-full">
        <SidebarInset className="h-full overflow-hidden flex flex-col">
          {children}
        </SidebarInset>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

