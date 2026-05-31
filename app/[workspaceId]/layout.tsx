import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';
import type { Layout } from 'react-resizable-panels';
import { SidebarProvider, SidebarTrigger, type SidebarVariantType } from '@/components/ui/sidebar';
import { getAllWorkspaces, workspaceKeys } from '@/services/modules/workspace';
import { getQueryClient } from '@/services/query-client';
import { ResizableShell, SidebarHotkeys } from '@/shared/components/layout';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  header: ReactNode;
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

  const queryClient = getQueryClient();
  const token = cookieStore.get('auth_token')?.value;

  if (token) {
    await queryClient
      .fetchQuery({
        queryKey: workspaceKeys.list(),
        queryFn: () => getAllWorkspaces(token),
      })
      .catch(() => {});
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider defaultOpen={sidebarOpen} className="h-screen bg-background">
        <SidebarHotkeys />
        <ResizableShell
          sidebarVariant={sidebarVariant}
          initialLayout={initialLayout}
          topHeader={header}
          sidebar={sidebar}
          header={
            <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </header>
          }
        >
          {children}
        </ResizableShell>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
