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
    <Sidebar variant={variant} collapsible="icon" className={className} {...props}>
      <SidebarHeader>{/* logo / workspace switcher */}</SidebarHeader>

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
