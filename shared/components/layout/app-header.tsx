'use client';

import { WorkspaceSwitcher } from '@/shared/components/layout';

export function AppHeader() {
  return (
    <header className="h-10 m-1 rounded-xl flex items-center shrink-0 overflow-hidden border">
      <div className="w-full px-2 flex items-center justify-between ">
        <WorkspaceSwitcher />
      </div>
    </header>
  );
}
