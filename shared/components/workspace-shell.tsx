import type { ReactNode } from 'react';
import type { Layout } from 'react-resizable-panels';
import { SidebarTrigger, type SidebarVariantType } from '@/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/app-sidebar';
import { ResizableShell } from '@/shared/components/resizable-shell';
import { SidebarHotkeys } from '@/shared/components/sidebar-hotkeys';

interface WorkspaceShellProps {
  children: ReactNode;
  workspaceId: string;
  sidebarVariant: SidebarVariantType;
  sidebarOpen: boolean;
  initialLayout?: Layout;
}

export function WorkspaceShell({ children, sidebarVariant, initialLayout }: WorkspaceShellProps) {
  return (
    <>
      <SidebarHotkeys />
      <ResizableShell
        sidebarVariant={sidebarVariant}
        initialLayout={initialLayout}
        sidebar={<AppSidebar variant={sidebarVariant} />}
        header={
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
        }
      >
        {children}
      </ResizableShell>
    </>
  );
}
