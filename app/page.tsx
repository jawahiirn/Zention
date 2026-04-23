'use client';

import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/login-form';
import { useI18n } from '@/features/i18n/use-i18n';
import { HeaderView } from '@/features/landing/components';

export default function Home() {
  const { Auth } = useI18n();

  return (
    <div className="dark:bg-background bg-zention-gray-200 flex min-h-screen w-full flex-col items-center">
      <HeaderView action="signup" />
      <div className="flex w-full flex-1 flex-col items-center justify-center p-16">
        <div className="flex w-full max-w-[440px] flex-col gap-32">
          <LoginForm />

          {/* Footer */}
          <p className="text-muted-foreground text-center text-base">
            {Auth.login.noAccount}{' '}
            <Link href="/signup" className="text-foreground font-bold hover:underline">
              {Auth.login.link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
