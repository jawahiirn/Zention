import type { ComponentProps } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu } from '@/components/ui/sidebar';
import { NAV_ITEMS } from '@/shared/constants/app-sidebar-constants';
import { cn } from '@/shared/lib/utils';
import { SidebarCollapseButton } from './sidebar-collapse-button';
import { SidebarNavLink } from './sidebar-nav-link';

type AppSidebarProps = ComponentProps<typeof Sidebar> & {};
// We will use the workspaceId & isCollapsed later...
export function AppSidebar({ variant = 'sidebar', className, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      variant={variant}
      collapsible="icon"
      className={cn(
        'h-full min-h-0 min-w-0 pt-0',
        variant === 'floating' ? 'pr-0! border-r-0!' : 'border-r',
        className
      )}
      {...props}
    >
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
