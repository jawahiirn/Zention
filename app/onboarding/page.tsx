'use client';

import Cookies from 'js-cookie';
import { LogOut, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ModalTypes, useModal } from '@/providers/modal-provider';

export default function OnboardingPage() {
  const router = useRouter();
  const { openModal } = useModal();

  const handleLogout = useCallback(() => {
    Cookies.remove('auth_token');
    Cookies.remove('has_onboarded');
    router.refresh();
    router.push('/');
  }, [router]);

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-black">Welcome to Zention!</h1>
        <p className="text-muted-foreground max-sm">
          We&apos;re getting things ready for you. Please complete your onboarding steps.
        </p>

        <Button
          onClick={() => openModal(ModalTypes.ONBOARDING)}
          className="mt-2 h-12 px-8 text-base font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <Rocket className="mr-2 size-5" />
          Start Onboarding
        </Button>

        <div className="border-border/50 mt-8 w-full border-t pt-8">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive gap-2 transition-colors"
          >
            <LogOut className="size-4" />
            Logout from session
          </Button>
        </div>
      </div>
    </div>
  );
}
