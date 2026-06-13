'use client';

import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { LogOut, Rocket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getRandomColor } from '@/constants/colors';
import { OnboardingModal } from '@/features/onboarding/components/onboarding-modal';
import type { OnboardingValues } from '@/features/onboarding/types/request';
import { useCreateWorkspaceMutation } from '@/services/modules/workspace';

export default function OnboardingPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(true);
  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspaceMutation();

  const handleLogout = useCallback(() => {
    Cookies.remove('auth_token');
    Cookies.remove('has_onboarded');
    router.refresh();
    router.push('/');
  }, [router]);

  const handleComplete = useCallback(
    async (data: OnboardingValues) => {
      const invitedEmails = data.inviteEmails ? data.inviteEmails.split(/[,\s]+/).filter(Boolean) : [];

      const workspace = await createWorkspace({
        name: data.spaceName,
        icon: '',
        iconColor: getRandomColor('CREATE_WORKSPACE'),
        invitedEmails,
      });

      queryClient.setQueryData(['workspace', 'list'], (old: unknown) => {
        const list = Array.isArray(old) ? old : [];
        return [...list, workspace];
      });

      setOpen(false);
      router.push(`/${workspace.id}/home`);
    },
    [createWorkspace, queryClient, router]
  );

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-black">Welcome to Zention!</h1>
        <p className="text-muted-foreground max-sm">
          We&apos;re getting things ready for you. Please complete your onboarding steps.
        </p>

        <Button
          onClick={() => setOpen(true)}
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

      <OnboardingModal open={open} onOpenChange={setOpen} onComplete={handleComplete} isPending={isPending} />
    </div>
  );
}
