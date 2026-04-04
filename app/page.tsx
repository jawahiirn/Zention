'use client';

import * as React from 'react';
import { LoginForm } from '@/features/auth/components/login-form';
import { useI18n } from '@/features/i18n/use-i18n';
import { Header } from '@/shared/components/header';
import Link from 'next/link';

export default function Home() {
  const { Auth } = useI18n();

  return (
    <div className='bg-zention-gray-200 dark:bg-background flex min-h-screen w-full flex-col items-center'>
      <Header action='signup' />
      <div className='flex w-full flex-1 flex-col items-center justify-center p-16'>
        <div className='flex w-full max-w-[440px] flex-col gap-32'>
          <LoginForm />

          {/* Footer */}
          <p className='text-muted-foreground text-center text-base'>
            {Auth.login.noAccount}{' '}
            <Link href='/signup' className='text-foreground font-bold hover:underline'>
              {Auth.login.link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
