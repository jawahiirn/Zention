'use client';

import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { startTransition, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/features/i18n/use-i18n';

interface HeaderProps {
  action?: 'login' | 'signup' | 'none';
}

export function Header({ action = 'none' }: HeaderProps) {
  const { Auth } = useI18n();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');
  const logoSrc = isDark ? '/logo-dark.jpg' : '/logo-light.jpg';

  return (
    <header className="sticky top-0 z-50 w-full py-2 backdrop-blur-md transition-all duration-300 md:py-4">
      <div className="flex w-full items-center justify-between px-2 sm:px-4 md:px-12">
        {/* Logo and Name */}
        <div className="flex items-center gap-2">
          <div className="shrink-0 overflow-hidden rounded-full shadow-sm">
            {mounted ? (
              <Image
                key={logoSrc}
                src={logoSrc}
                width={32}
                height={32}
                alt="zention Logo"
                className="object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="bg-muted h-full w-full animate-pulse" />
            )}
          </div>
          <span className="text-2xl font-bold">Zention</span>
        </div>
        {/* Action Toggle */}
        <div className={mounted ? 'visible' : 'invisible'}>
          <div className="flex items-center gap-4">
            {action !== 'none' && mounted && (
              <div className="mr-2 hidden items-center gap-3 sm:flex">
                <span className="text-muted-foreground mr-2 text-sm font-medium">
                  {action === 'login' ? Auth.signup.haveAccount : Auth.login.noAccount}
                </span>
                <Button asChild variant="outline" className="border-border rounded-lg px-4 text-base font-semibold">
                  <Link href={action === 'login' ? '/' : '/signup'}>
                    {action === 'login' ? Auth.signup.link : Auth.login.link}
                  </Link>
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="hover:bg-accent rounded-full transition-all"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="size-5 text-yellow-400 transition-all" />
              ) : (
                <Moon className="text-primary size-5 transition-all" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
