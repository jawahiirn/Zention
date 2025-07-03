'use client';

import { useScrollTop } from '@/hooks/useScrollTop';
import { cn } from '@/lib/utils';
import { Logo } from '@/app/(marketing)/_components/Logo';

export const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <nav
      className={cn(
        'sticky inset-x-0 top-0 z-50 mx-auto flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div
        className={
          'md:ml-auto w-full flex items-center gap-x-2 md:justify-end justify-between'
        }
      >
        Login
      </div>
    </nav>
  );
};
