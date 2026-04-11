import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import type { Layout } from 'react-resizable-panels';
import { SidebarProvider, SidebarVariantType } from '@/components/ui/sidebar';
import { WorkspaceShell } from '@/shared/components/workspace-shell';
import { SIDEBAR_DEFAULT_WIDTH } from '@/shared/constants/app-sidebar-constants';

interface DashboardLayoutProps {
  children: ReactNode;
  params: Promise<{ workspaceId: string }>;
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { workspaceId } = await params;
  const cookieStore = await cookies();
  const sidebarOpen = cookieStore.get('sidebar:state')?.value === 'true';
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
    <SidebarProvider defaultOpen={sidebarOpen}>
      <WorkspaceShell
        initialLayout={initialLayout}
        defaultSidebarWidth={initialLayout?.[0] ?? SIDEBAR_DEFAULT_WIDTH}
        sidebarVariant={sidebarVariant}
      >
        {children}
      </WorkspaceShell>
    </SidebarProvider>
  );
}
