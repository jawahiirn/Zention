import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { useHotkeys } from 'react-hotkeys-hook';
import { NAV_ITEMS } from '@/shared/constants/app-sidebar-constants';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronsLeft, SquarePen } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { TooltipMessage } from '@/components/ui/tooltip';

type AppSidebarProps = ComponentProps<typeof Sidebar>;

export function AppSidebar({ variant = 'sidebar', className, ...props }: AppSidebarProps) {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // Keyboard shortcut
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
    <Sidebar variant={variant} collapsible="icon" className={cn('min-w-0', className)} {...props}>
      <SidebarHeader className="min-w-0">
        <div className="flex items-center gap-1 min-w-0">
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                className="flex-1 text-lg justify-start gap-2 px-2 overflow-hidden min-w-0"
                variant="ghost"
                size="lg"
              >
                <span className="truncate text-left font-semibold">Jawahiir&#39;s Workspace</span>
                <ChevronDown className="shrink-0 opacity-50 size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-[200px]">
              <div className="p-2 text-sm font-medium">Workspaces</div>
            </PopoverContent>
          </Popover>
          <div className="flex items-center">
            <TooltipMessage message={'Toggle Sidebar'}>
              <Button
                variant="ghost"
                size="icon-lg"
                className="shrink-0"
                onClick={toggleSidebar}
                title="Collapse Sidebar"
              >
                <ChevronsLeft className="size-4" />
              </Button>
            </TooltipMessage>
            <TooltipMessage message={'Create new page'}>
              <Button variant="ghost" size="icon-lg" className="shrink-0" onClick={() => {}} title="Create new page">
                <SquarePen className="size-4" />
              </Button>
            </TooltipMessage>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>{/* user menu */}</SidebarFooter>
    </Sidebar>
  );
}
