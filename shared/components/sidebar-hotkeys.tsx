'use client';

import { useHotkeys } from 'react-hotkeys-hook';
import { useSidebar } from '@/components/ui/sidebar';

export function SidebarHotkeys() {
  const { toggleSidebar } = useSidebar();

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

  return null;
}
