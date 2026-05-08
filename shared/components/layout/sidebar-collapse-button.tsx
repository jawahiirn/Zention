'use client';

import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { TooltipMessage } from '@/components/ui/tooltip';

export function SidebarCollapseButton() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenuItem>
      <TooltipMessage message={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}>
        <SidebarMenuButton
          onClick={toggleSidebar}
          className="w-full justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
        >
          {isCollapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
          <span className="group-data-[collapsible=icon]:hidden">Collapse Sidebar</span>
        </SidebarMenuButton>
      </TooltipMessage>
    </SidebarMenuItem>
  );
}
