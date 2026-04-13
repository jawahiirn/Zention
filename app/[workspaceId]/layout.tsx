import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import type { Layout } from 'react-resizable-panels';

import { SidebarProvider, type SidebarVariantType } from '@/components/ui/sidebar';
import { WorkspaceShell } from '@/shared/components/workspace-shell';

interface DashboardLayoutProps {
  children: ReactNode;
  params: Promise<{ workspaceId: string }>;
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { workspaceId } = await params;
  const cookieStore = await cookies();
  const sidebarOpen = cookieStore.get('sidebar:state')?.value !== 'false';
  const layoutCookie = cookieStore.get('sidebar:layout')?.value;
  const sidebarVariant = (cookieStore.get('sidebar:variant')?.value ?? 'sidebar') as SidebarVariantType;

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
      <WorkspaceShell initialLayout={initialLayout} sidebarVariant={sidebarVariant}>
        {children}
      </WorkspaceShell>
    </SidebarProvider>
  );
}
