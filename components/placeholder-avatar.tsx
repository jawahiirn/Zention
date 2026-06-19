'use client';

import type { Style } from '@dicebear/core';
import { createAvatar } from '@dicebear/core';
import type { Options as InitialsOptions } from '@dicebear/initials';
import { create, meta, schema } from '@dicebear/initials';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { rgbToHex } from '@/utils/color-utils';
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
  src?: string | null;
  fontSize?: string | number;
}

export function PlaceholderAvatar({
  name,
  seed,
  iconColor,
  size = 'default',
  rounded,
  className,
  chars = 1,
  src,
  fontSize,
}: PlaceholderAvatarProps) {
  const pixelSize = typeof size === 'number' ? size : sizeMap[size];

  const imageSrc = useMemo(() => {
    if (src) return src;

    const style: Style<InitialsOptions> = { create, meta, schema };
    const avatar = createAvatar(style, {
      seed: name ?? seed ?? '?',
      backgroundColor: iconColor ? [rgbToHex(iconColor)] : undefined,
      chars,
    });

    return `data:image/svg+xml,${encodeURIComponent(avatar.toString())}`;
  }, [src, name, seed, iconColor, chars]);

  const computedFontSize = fontSize ?? `${Math.round(pixelSize * 0.4)}px`;

  return (
    <Avatar
      size={typeof size === 'number' ? 'default' : size}
      className={cn(rounded && rounded !== 'full' && roundedClasses[rounded], className)}
      style={typeof size === 'number' ? { width: pixelSize, height: pixelSize } : undefined}
    >
      <AvatarImage src={imageSrc} alt={name ?? ''} />
      <AvatarFallback
        className="bg-transparent text-inherit font-semibold"
        style={{ fontSize: typeof fontSize === 'number' ? `${fontSize}px` : computedFontSize }}
      >
        {(name ?? seed ?? '?').slice(0, chars).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
