import { ArrowRightFromLine, ChevronDown, ChevronsLeft, Ellipsis, PlusIcon, Settings, SquarePen } from 'lucide-react';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import { NAV_ITEMS } from '@/shared/constants/app-sidebar-constants';
import { cn } from '@/shared/lib/utils';

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
            <PopoverContent align="start" className="w-[320px] rounded-xl min-w-[200px] p-0">
              <>
                <div className="flex flex-col w-full border-b p-4">
                  <p className="text-base font-medium">Jawahiir&#39;s Workspace</p>
                  <span className={'text-sm text-gray-600'}>1 Member</span>
                  <div className="flex items-center w-full">
                    <TooltipMessage message={'Settings'}>
                      <Button variant="ghost" className="px-0.5!" onClick={() => {}} title="Create new page">
                        <Settings className="size-4" /> Settings
                      </Button>
                    </TooltipMessage>
                    <TooltipMessage message={'Invite Members'}>
                      <Button variant="ghost" className="" onClick={() => {}} title="Create new page">
                        <SquarePen className="size-4" /> Invite members
                      </Button>
                    </TooltipMessage>
                  </div>
                </div>
                <div className="bg-accent w-full flex flex-col py-4 gap-y-2">
                  <div className="flex items-center justify-between w-full px-4">
                    <p className="text-gray-500 text-sm">jawahiirnabhan@gmail.com</p>
                    <Button variant={'secondary'} size={'icon-xs'} className={'hover:bg-gray-300!'}>
                      <Ellipsis />
                    </Button>
                  </div>
                  <TooltipMessage
                    side={'right'}
                    message={
                      <div className={'flex flex-col'}>
                        <span>1 Member</span>
                        <span>Free plan</span>
                      </div>
                    }
                  >
                    <Button variant={'ghost'} className={'justify-start hover:bg-gray-300! font-medium text-base'}>
                      Jawahiir Nabhan&#39;s Workspace
                    </Button>
                  </TooltipMessage>
                  <TooltipMessage message={'Create New Workspace'}>
                    <Button
                      variant={'ghost'}
                      className={'justify-start text-blue-700 hover:bg-gray-400! font-medium text-base'}
                    >
                      <PlusIcon /> New Workspace
                    </Button>
                  </TooltipMessage>
                  <Button variant={'ghost'} className={'justify-start'}>
                    <ArrowRightFromLine className={'text-destructive'} />
                    <p className={'text-destructive text-sm'}>Logout</p>
                  </Button>
                </div>
              </>
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
