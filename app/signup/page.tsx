'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/shared/components/header';
import { AuthCard } from '@/features/auth/components/auth-card';
import Link from 'next/link';

export default function SignupPage() {
  const t = useTranslations('Auth');

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-zention-gray-200 dark:bg-background">
      <Header action="login" />
      <div className="flex-1 flex flex-col items-center justify-center p-16 sm:p-32 w-full">
        <div className="w-full max-w-[440px] flex flex-col gap-24">
          <AuthCard type="signup" />

          {/* Footer */}
          <p className="text-center text-muted-foreground text-base">
            {t('signup.haveAccount')}{' '}
            <Link href="/" className="text-foreground font-bold hover:underline">
              {t('signup.link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
