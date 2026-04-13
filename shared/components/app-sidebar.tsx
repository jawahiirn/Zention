import { ChevronsLeft, ChevronsRight, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
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
    <Sidebar variant={variant} collapsible="icon" className={cn('min-w-0 border-r', className)} {...props}>
      <SidebarHeader className="p-2">
        <div className="flex items-center justify-between gap-1 w-full">
          <WorkspaceSwitcher currentWorkspace={WORKSPACE_DATA} />

          <div className="flex items-center shrink-0">
            <TooltipMessage message="Toggle Sidebar">
              <Button variant="ghost" size="icon-lg" onClick={toggleSidebar} className="size-8">
                {isCollapsed ? <ChevronsRight className="size-4" /> : <ChevronsLeft className="size-4" />}
              </Button>
            </TooltipMessage>
            <TooltipMessage message="Create new page">
              <Button variant="ghost" size="icon-lg" className="size-8" onClick={() => {}}>
                <SquarePen className="size-4" />
              </Button>
            </TooltipMessage>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                  className={cn(
                    'transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      {/*<SidebarFooter className="p-2 border-t">*/}
      {/*  /!* Placeholder for User Profile / Account Switcher *!/*/}
      {/*</SidebarFooter>*/}
    </Sidebar>
  );
}
