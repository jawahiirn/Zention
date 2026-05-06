import { ChevronsLeft, ChevronsRight, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { TooltipMessage } from '@/components/ui/tooltip';
import { NAV_ITEMS, WORKSPACE_DATA } from '@/shared/constants/app-sidebar-constants';
import { cn } from '@/shared/lib/utils';
import { WorkspaceSwitcher } from './workspace-switcher';

type AppSidebarProps = ComponentProps<typeof Sidebar>;

export function AppSidebar({ variant = 'sidebar', className, ...props }: AppSidebarProps) {
  const { toggleSidebar, state } = useSidebar();
  const pathname = usePathname();

  const isCollapsed = state === 'collapsed';

  useHotkeys(
    'mod+b',
    (e) => {
      e.preventDefault();
      toggleSidebar();
    },
    {
      scopes: ['global'],
      enableOnFormTags: true,
    }
  );

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

          <div className="flex items-center shrink-0 group-data-[collapsible=icon]:hidden">
            <TooltipMessage message="Create new page">
              <Button variant="ghost" size="icon-lg" className="size-8" onClick={() => { }}>
                <SquarePen className="size-4" />
              </Button>
            </TooltipMessage>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className={cn(
                    'transition-colors group-data-[collapsible=icon]:justify-center',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t mt-auto">
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
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
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
