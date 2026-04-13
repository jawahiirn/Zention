import { Activity, BarChart2, CheckSquare, Home, LayoutDashboard, Search, Settings } from 'lucide-react';

export const SIDEBAR_MIN_WIDTH = 180;
export const SIDEBAR_MAX_WIDTH = 480;
export const SIDEBAR_DEFAULT_WIDTH = 220;

export const WORKSPACE_DATA = {
  name: "Jawahiir's Workspace",
  memberCount: 1,
  email: 'jawahiirnabhan@gmail.com',
};

export const NAV_ITEMS = [
  {
    href: '/home',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/search',
    label: 'Search',
    icon: Search,
  },
  {
    href: '/tasks',
    label: 'Tasks',
    icon: CheckSquare,
  },
  {
    href: '/activity',
    label: 'Activity',
    icon: Activity,
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: BarChart2,
  },
  {
    href: '/settings',
    label: 'Preferences',
    icon: Settings,
  },
] as const;

