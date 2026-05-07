'use client';

import { type ReactNode, useCallback, useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import type { Layout, PanelImperativeHandle } from 'react-resizable-panels';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarInset, SidebarTrigger, type SidebarVariantType, useSidebar } from '@/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/app-sidebar';
import {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_DEFAULT_WIDTH,
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
} from '@/shared/constants/app-sidebar-constants';
import { cn } from '@/shared/lib/utils';

interface WorkspaceShellProps {
  children: ReactNode;
  sidebarVariant: SidebarVariantType;
  initialLayout?: Layout;
}

export function WorkspaceShell({ children, sidebarVariant, initialLayout }: WorkspaceShellProps) {
  const { state, setOpen, toggleSidebar } = useSidebar();
  const panelRef = useRef<PanelImperativeHandle>(null);

  const onLayoutChanged = useCallback((layout: Layout) => {
    // biome-ignore lint/suspicious/noDocumentCookie: <>
    document.cookie = `sidebar:layout=${JSON.stringify(layout)}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);

  // Sync ResizablePanel → Sidebar: when the panel snaps to collapsed size, close the sidebar
  const onPanelResize = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (panel.isCollapsed()) {
      if (state !== 'collapsed') setOpen(false);
    } else {
      if (state !== 'expanded') setOpen(true);
    }
  }, [state, setOpen]);

  // Sync Sidebar → ResizablePanel: when sidebar is toggled via button/keyboard, move the panel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (state === 'collapsed') {
      panel.collapse();
    } else {
      panel.expand();
    }
  }, [state]);

  useHotkeys(
    'mod+b',
    (e) => {
      e.preventDefault();
      toggleSidebar();
    },
    {
      scopes: ['global'],
      enableOnFormTags: true,
    }
  );

  const defaultSize = initialLayout?.[0] ?? SIDEBAR_DEFAULT_WIDTH;
  const isCollapsed = state === 'collapsed';
  const isFloating = sidebarVariant === 'floating';

  return (
    <ResizablePanelGroup
      onLayoutChanged={onLayoutChanged}
      orientation="horizontal"
      className="h-full flex items-stretch overflow-hidden"
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
        <AppSidebar variant={sidebarVariant} className="h-full" isCollapsed={isCollapsed} onToggle={toggleSidebar} />
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
        <SidebarInset className="flex-1 min-w-0 bg-background overflow-hidden flex flex-col">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex-1 overflow-auto">{children}</div>
        </SidebarInset>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
