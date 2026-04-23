'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/features/i18n/use-i18n';

interface AuthActionsProps {
  action: 'login' | 'signup' | 'none';
}

export function AuthActions({ action }: AuthActionsProps) {
  const { Auth } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (action === 'none' || !mounted) return null;

  return (
    <div className="mr-2 hidden items-center gap-3 sm:flex">
      <span className="text-muted-foreground mr-2 text-sm font-medium">
        {action === 'login' ? Auth.signup.haveAccount : Auth.login.noAccount}
      </span>
      <Button asChild variant="outline" className="border-border rounded-lg px-4 text-base font-semibold">
        <Link href={action === 'login' ? '/signup' : '/'}>
          {action === 'login' ? Auth.signup.link : Auth.login.link}
        </Link>
      </Button>
    </div>
  );
}
