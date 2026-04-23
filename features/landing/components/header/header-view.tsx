'use client';

import { ThemeToggle } from '@/shared/components/theme-toggle';
import { AuthActions } from './auth-actions';
import { Logo } from './logo';

interface HeaderProps {
  action?: 'login' | 'signup' | 'none';
}

export function HeaderView({ action = 'none' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full py-2 backdrop-blur-md transition-all duration-300 md:py-4">
      <div className="flex w-full items-center justify-between px-2 sm:px-4 md:px-12">
        <Logo />
        <div className="flex items-center gap-4">
          <AuthActions action={action} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
