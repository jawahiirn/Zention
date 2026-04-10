'use client';

import { useCallback, useMemo, ReactNode } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { SidebarInset, SidebarVariantType } from '@/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/app-sidebar';
import { SIDEBAR_MIN_WIDTH, SIDEBAR_MAX_WIDTH } from '@/shared/constants/app-sidebar-constants';
import type { Layout } from 'react-resizable-panels';

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
        <AppSidebar variant={sidebarVariant} className="relative! w-full!" />
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
