'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useMounted } from '@/shared/hooks/use-mounted';
import { cn } from '@/shared/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button variant="ghost" className={cn('rounded-full', className)} disabled>
        <div className="size-5" />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark' || theme === 'dark';

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn('hover:bg-accent rounded-full transition-all', className)}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="size-5 text-yellow-400 transition-all scale-100 rotate-0" />
      ) : (
        <Moon className="text-primary size-5 transition-all scale-100 rotate-0" />
      )}
    </Button>
  );
}
