import type { ReactNode } from 'react';
import type { Layout } from 'react-resizable-panels';
import type { SidebarVariantType } from '@/components/ui/sidebar';
import { ResizableShell } from '@/shared/components/resizable-shell';
import { SidebarHotkeys } from '@/shared/components/sidebar-hotkeys';

interface WorkspaceShellProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
  sidebarVariant: SidebarVariantType;
  initialLayout?: Layout;
}

export function WorkspaceShell({ children, sidebar, header, sidebarVariant, initialLayout }: WorkspaceShellProps) {
  return (
    <>
      <SidebarHotkeys />
      <ResizableShell sidebarVariant={sidebarVariant} initialLayout={initialLayout} sidebar={sidebar} header={header}>
        {children}
      </ResizableShell>
    </>
  );
}
