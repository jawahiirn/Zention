'use client';

import { type ReactNode, useCallback, useMemo } from 'react';
import type { Layout } from 'react-resizable-panels';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarInset, type SidebarVariantType } from '@/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/app-sidebar';
import { SIDEBAR_MAX_WIDTH, SIDEBAR_MIN_WIDTH } from '@/shared/constants/app-sidebar-constants';

interface WorkspaceShellProps {
  children: ReactNode;
  defaultSidebarWidth: number;
  sidebarVariant: SidebarVariantType;
  initialLayout?: Layout;
}

export function WorkspaceShell({ children, defaultSidebarWidth, sidebarVariant, initialLayout }: WorkspaceShellProps) {
  const onLayoutChanged = useCallback((layout: Layout) => {
    document.cookie = `sidebar:layout=${JSON.stringify(layout)}; path=/; max-age=31536000`;
  }, []);

  const resizableSidebar = useMemo(
    () => (
      <ResizablePanel
        defaultSize={defaultSidebarWidth}
        minSize={SIDEBAR_MIN_WIDTH}
        maxSize={SIDEBAR_MAX_WIDTH}
        className="hidden md:block"
      >
        <AppSidebar variant={sidebarVariant} className="relative! w-full! min-w-0" />
      </ResizablePanel>
    ),
    [defaultSidebarWidth, sidebarVariant]
  );

  return (
    <ResizablePanelGroup
      onLayoutChanged={onLayoutChanged}
      orientation="horizontal"
      className="h-svh"
      defaultLayout={initialLayout}
    >
      {resizableSidebar}

      <ResizableHandle className="hidden md:flex" />

      <ResizablePanel defaultSize={100 - defaultSidebarWidth} minSize={50}>
        <SidebarInset>{children}</SidebarInset>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
