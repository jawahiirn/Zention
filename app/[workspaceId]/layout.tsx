import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import type { Layout } from 'react-resizable-panels';

import { SidebarProvider, type SidebarVariantType } from '@/components/ui/sidebar';
import { WorkspaceShell } from '@/shared/components/layout/workspace-shell';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode; // This is our Global Top Header slot
  params: Promise<{ workspaceId: string }>;
}

export default async function DashboardLayout({ children, sidebar, header }: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const sidebarOpen = cookieStore.get('sidebar:state')?.value !== 'false';
  const layoutCookie = cookieStore.get('sidebar:layout')?.value;
  const sidebarVariant = (cookieStore.get('sidebar:variant')?.value ?? 'floating') as SidebarVariantType;

  let initialLayout: Layout | undefined;
  if (layoutCookie) {
    try {
      initialLayout = JSON.parse(layoutCookie) as Layout;
    } catch {
      initialLayout = undefined;
    }
  }

  return (
    <SidebarProvider defaultOpen={sidebarOpen} className="h-screen bg-background">
      <WorkspaceShell
        sidebar={sidebar}
        globalHeader={header}
        initialLayout={initialLayout}
        sidebarVariant={sidebarVariant}
      >
        {children}
      </WorkspaceShell>
    </SidebarProvider>
  );
}
