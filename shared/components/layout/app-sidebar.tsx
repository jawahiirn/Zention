import type { ComponentProps } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu } from '@/components/ui/sidebar';
import { SidebarCollapseButton } from './sidebar-collapse-button';
import { SidebarCreatePageButton } from './sidebar-create-page-button';
import { SidebarNavLink } from './sidebar-nav-link';
import { WorkspaceSwitcher } from './workspace-switcher';
import { NAV_ITEMS, WORKSPACE_DATA } from '@/shared/constants/app-sidebar-constants';
import { cn } from '@/shared/lib/utils';

type AppSidebarProps = ComponentProps<typeof Sidebar> & {};
// We will use the workspaceId & isCollapsed later...
export function AppSidebar({ variant = 'sidebar', className, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      variant={variant}
      collapsible="icon"
      className={cn('min-w-0', variant === 'floating' ? 'pr-0! border-r-0!' : 'border-r', className)}
      {...props}
    >
      <SidebarHeader className="p-2 overflow-hidden">
        <div className="flex items-center justify-between gap-1 w-full group-data-[collapsible=icon]:justify-center">
          <WorkspaceSwitcher currentWorkspace={WORKSPACE_DATA} />
          <SidebarCreatePageButton />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          {NAV_ITEMS.map((item) => (
            <SidebarNavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={<item.icon className="size-4" />}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t mt-auto">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarCollapseButton />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
