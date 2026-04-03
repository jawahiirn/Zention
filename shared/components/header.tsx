'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, startTransition } from 'react';
import Image from 'next/image';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface HeaderProps {
  action?: 'login' | 'signup' | 'none';
}

export function Header({ action = 'none' }: HeaderProps) {
  const t = useTranslations('Auth');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');

  return (
    <header className="sticky top-0 z-50 w-full py-8 md:py-16 backdrop-blur-md transition-all duration-300">
      <div className="flex w-full items-center justify-between px-8 sm:px-16 md:px-48">
        {/* Logo and Name */}
        <div className="flex items-center gap-8">
          {mounted ? (
            <Image
              src={isDark ? '/icon-dark.svg' : '/icon-light.svg'}
              alt="zention Logo"
              width={32}
              height={32}
              className="rounded-full shadow-sm transition-opacity duration-300"
            />
          ) : (
            <div className="h-32 w-32" />
          )}
          <span className="text-2xl font-semibold tracking-wide">Zention</span>
        </div>
        {/* Action Toggle */}
        <div className={mounted ? 'visible' : 'invisible'}>
          <div className="flex items-center gap-16">
            {action !== 'none' && mounted && (
              <div className="hidden sm:flex items-center gap-12 mr-8">
                <span className="text-sm font-medium text-muted-foreground mr-8">
                  {action === 'login' ? t('signup.haveAccount') : t('login.noAccount')}
                </span>
                <Button
                  asChild
                  variant="outline"
                  className=" px-16 text-sm font-bold border-border rounded-lg"
                  size={'lg'}
                >
                  <Link href={action === 'login' ? '/' : '/signup'}>
                    {action === 'login' ? t('signup.link') : t('login.link')}
                  </Link>
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="rounded-full transition-all hover:bg-accent"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="transition-all text-yellow-400 size-20" />
              ) : (
                <Moon className="transition-all text-primary size-20" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
