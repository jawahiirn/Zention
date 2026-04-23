'use client';

import Link from 'next/link';
import { SignupForm } from '@/features/auth/components/signup-form';
import { useI18n } from '@/features/i18n/use-i18n';
import { HeaderView } from '@/features/landing/components';

export default function SignupPage() {
  const { Auth } = useI18n();

  return (
    <div className="bg-zention-gray-200 dark:bg-background flex min-h-screen w-full flex-col items-center">
      <HeaderView action="login" />
      <div className="flex w-full flex-1 flex-col items-center justify-center p-16">
        <div className="flex w-full max-w-[440px] flex-col gap-32">
          <SignupForm />
          {/* Footer */}
          <p className="text-muted-foreground text-center text-base">
            {Auth.signup.haveAccount}{' '}
            <Link href="/" className="text-foreground font-bold hover:underline">
              {Auth.signup.link}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
