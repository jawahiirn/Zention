'use client';

import * as React from 'react';
import { useI18n } from '@/features/i18n/use-i18n';
import { GoogleIcon } from '@/shared/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AuthCardShellProps {
  title: string;
  children: React.ReactNode;
  isPending?: boolean;
}

export function AuthCardShell({ title, children, isPending }: AuthCardShellProps) {
  const { Auth } = useI18n();

  return (
    <Card className='shadow-zention-medium dark:bg-card w-full max-w-[440px] rounded-2xl border-none bg-white p-20 sm:p-32'>
      <CardContent className='flex flex-col gap-24 p-0'>
        <h1 className='text-24 text-foreground text-center font-bold'>{title}</h1>

        {/* Google Login/Signup */}
        <Button
          variant='outline'
          type='button'
          disabled={isPending}
          className='text-16 border-border hover:bg-accent flex h-48 w-full items-center justify-center gap-12 font-medium transition-colors'
        >
          <GoogleIcon className='size-20' />
          {Auth.googleButton}
        </Button>

        {/* Separator */}
        <div className='relative flex items-center py-8'>
          <div className='border-border flex-grow border-t'></div>
          <span className='text-muted-foreground mx-16 flex-shrink text-sm font-medium tracking-wider uppercase'>
            {Auth.or}
          </span>
          <div className='border-border flex-grow border-t'></div>
        </div>

        {/* Specialized Form Content */}
        {children}
      </CardContent>
    </Card>
  );
}
