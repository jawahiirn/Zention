'use client';

import Image from 'next/image';
import type * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/features/i18n/use-i18n';

interface AuthCardShellProps {
  title: string;
  children: React.ReactNode;
  isPending?: boolean;
}

export function AuthCardShell({ title, children, isPending }: AuthCardShellProps) {
  const { Auth } = useI18n();

  return (
    <Card className="shadow-zention-medium dark:bg-card w-full max-w-[440px] rounded-2xl border-none bg-white p-5 sm:p-8">
      <CardContent className="flex flex-col gap-6 p-0">
        <h1 className="text-2xl text-foreground text-center font-bold">{title}</h1>

        {/* Google Login/Signup */}
        <Button
          variant="outline"
          type="button"
          disabled={isPending}
          className="text-16 rounded-xl border-border hover:bg-accent flex h-12 w-full items-center justify-center text-center relative font-medium transition-colors"
        >
          <Image width={20} height={20} src={'/google.svg'} alt={'Google Icon'} className={'absolute top-3 left-4'} />
          {Auth.googleButton}
        </Button>

        {/* Separator */}
        <div className="relative flex items-center py-2">
          <div className="border-border flex-grow border-t"></div>
          <span className="text-muted-foreground mx-4 flex-shrink text-sm font-medium tracking-wider uppercase">
            {Auth.or}
          </span>
          <div className="border-border flex-grow border-t"></div>
        </div>

        {/* Specialized Form Content */}
        {children}
      </CardContent>
    </Card>
  );
}
