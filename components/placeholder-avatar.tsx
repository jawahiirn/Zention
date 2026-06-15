'use client';

import { useMemo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getColorByTagWithSeed } from '@/constants/colors';
import { getContrastText } from '@/utils/color-utils';
import { cn } from '@/utils/utils';

const sizeMap = { sm: 24, default: 32, lg: 40 } as const;

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

interface PlaceholderAvatarProps {
  name?: string | null;
  seed?: string;
  iconColor?: string;
  size?: number | 'default' | 'sm' | 'lg';
  rounded?: keyof typeof roundedClasses;
  className?: string;
  chars?: number;
}

export function PlaceholderAvatar({
  name,
  seed,
  iconColor,
  size = 'default',
  rounded,
  className,
  chars = 1,
}: PlaceholderAvatarProps) {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size];

  const bgColor = iconColor ?? getColorByTagWithSeed('AVATAR', seed ?? '');
  const textColor = getContrastText(bgColor);

  const initials = useMemo(() => {
    const str = name ?? seed ?? '?';
    return str.slice(0, chars).toUpperCase();
  }, [name, seed, chars]);

  return (
    <Avatar
      size={typeof size === 'number' ? 'default' : size}
      className={cn(rounded && rounded !== 'full' && roundedClasses[rounded], className)}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        ...(typeof size === 'number' ? { width: pixelSize, height: pixelSize } : {}),
      }}
    >
      <AvatarFallback className="bg-transparent text-inherit text-xs font-semibold">{initials}</AvatarFallback>
    </Avatar>
  );
}
