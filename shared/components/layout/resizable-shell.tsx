'use client';

import { type ReactNode, useCallback, useEffect, useRef } from 'react';
import type { Layout, PanelImperativeHandle } from 'react-resizable-panels';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarInset, type SidebarVariantType, useSidebar } from '@/components/ui/sidebar';
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_DEFAULT_WIDTH,
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
} from '@/shared/constants/app-sidebar-constants';
import { cn } from '@/shared/lib/utils';

interface ResizableShellProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
  topHeader?: ReactNode;
  sidebarVariant: SidebarVariantType;
  initialLayout?: Layout;
}

export function ResizableShell({
  children,
  sidebar,
  header,
  topHeader,
  sidebarVariant,
  initialLayout,
}: ResizableShellProps) {
  const { state, setOpen } = useSidebar();
  const panelRef = useRef<PanelImperativeHandle>(null);

  const onLayoutChanged = useCallback((layout: Layout) => {
    // biome-ignore lint/suspicious/noDocumentCookie: <>
    document.cookie = `sidebar:layout=${JSON.stringify(layout)}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  const onPanelResize = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (panel.isCollapsed()) {
      if (state !== 'collapsed') setOpen(false);
    } else {
      if (state !== 'expanded') setOpen(true);
    }
  }, [state, setOpen]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (state === 'collapsed') {
      panel.collapse();
    } else {
      panel.expand();
    }
  }, [state]);

  const defaultSize = initialLayout?.[0] ?? SIDEBAR_DEFAULT_WIDTH;
  const isCollapsed = state === 'collapsed';
  const isFloating = sidebarVariant === 'floating';

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      {topHeader}
      <ResizablePanelGroup
        onLayoutChanged={onLayoutChanged}
        orientation="horizontal"
        className="flex-1 min-h-0 flex items-stretch overflow-hidden"
        defaultLayout={initialLayout}
      >
        <ResizablePanel
          id="sidebar-panel"
          panelRef={panelRef}
          collapsible
          collapsedSize={SIDEBAR_COLLAPSED_WIDTH}
          defaultSize={defaultSize}
          minSize={SIDEBAR_MIN_WIDTH}
          maxSize={SIDEBAR_MAX_WIDTH}
          onResize={onPanelResize}
          className={cn('hidden md:block h-full')}
        >
          {sidebar}
        </ResizablePanel>

        <ResizableHandle
          disabled={isCollapsed}
          className={cn(
            'hidden md:flex w-0.5 transition-colors z-50',
            isCollapsed ? 'pointer-events-none opacity-0' : 'hover:bg-accent',
            isFloating ? 'bg-transparent h-[calc(100%-16px)] top-2 rounded-full' : 'bg-border'
          )}
        />

        <ResizablePanel id="main-content" minSize={SIDEBAR_MIN_WIDTH} className="h-full">
          <SidebarInset className="flex-1 min-h-0 h-full min-w-0 bg-background overflow-hidden flex flex-col">
            {header}
            <div className="flex-1 overflow-auto">{children}</div>
          </SidebarInset>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
