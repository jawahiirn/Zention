import type { ReactNode } from 'react';
import type { Layout } from 'react-resizable-panels';
import { SidebarTrigger, type SidebarVariantType } from '@/components/ui/sidebar';
import { ResizableShell } from './resizable-shell';
import { SidebarHotkeys } from './sidebar-hotkeys';

interface WorkspaceShellProps {
  children: ReactNode;
  sidebar: ReactNode;
  globalHeader: ReactNode;
  sidebarVariant: SidebarVariantType;
  initialLayout?: Layout;
}

export function WorkspaceShell({
  children,
  sidebar,
  globalHeader,
  sidebarVariant,
  initialLayout,
}: WorkspaceShellProps) {
  return (
    <>
      <SidebarHotkeys />
      <ResizableShell
        sidebarVariant={sidebarVariant}
        initialLayout={initialLayout}
        topHeader={globalHeader}
        sidebar={sidebar}
        header={
          <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        }
      >
        {children}
      </ResizableShell>
    </>
  );
}
