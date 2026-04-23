'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useMounted } from '@/shared/hooks/use-mounted';

export function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && (resolvedTheme === 'dark' || theme === 'dark');
  const logoSrc = isDark ? '/logo-dark.jpg' : '/logo-light.jpg';

  return (
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
          <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
        )}
      </div>
      <span className="text-2xl font-bold">Zention</span>
    </div>
  );
}
