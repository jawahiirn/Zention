'use client';

import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useSearch } from '@/hooks/use-search';
import { useSidebar } from '@/hooks/use-sidebar';

export const KeyboardShortcutProvider = () => {
  const search = useSearch();
  const sidebar = useSidebar();

  useKeyboardShortcuts([
    {
      key: 'k',
      ctrlKey: true,
      callback: search.toggle,
    },
    {
      key: 'l',
      ctrlKey: true,
      callback: sidebar.toggle,
    },
  ]);

  return null;
};
