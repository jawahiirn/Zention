'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogOut, Rocket, User, Settings, Sparkles } from 'lucide-react';

import { MultiStepModal } from '@/components/ui/multi-step-modal';
import { Button } from '@/components/ui/button';

export default function OnboardingPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const handleLogout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('has_onboarded');
    router.refresh();
    router.push('/');
  };

  const handleComplete = () => {
    Cookies.set('has_onboarded', 'true');
    setOpen(false);
    router.push('/pokemon');
  };

  return (
    <div className='bg-zention-gray-200 dark:bg-background flex min-h-screen flex-col items-center justify-center p-6'>
      <div className='flex flex-col items-center gap-6 text-center'>
        <h1 className='text-32 text-foreground font-black'>Welcome to Zention!</h1>
        <p className='text-muted-foreground max-w-[400px]'>
          We&#39;re getting things ready for you. Please complete your onboarding steps.
        </p>

        <Button onClick={() => setOpen(true)} variant={'default'}>
          <Rocket className='mr-8 size-20' />
          Start Onboarding
        </Button>

        <div className='border-border/50 mt-32 w-full border-t pt-32'>
          <Button
            variant='ghost'
            onClick={handleLogout}
            className='text-muted-foreground hover:text-destructive gap-32 transition-colors'
          >
            <LogOut className='size-16' />
            Logout from session
          </Button>
        </div>
      </div>

      <MultiStepModal
        open={open}
        onOpenChange={setOpen}
        onComplete={handleComplete}
        showCloseButton={false}
        className='overflow-hidden p-0 sm:max-w-[500px]' // Custom styling
        overlayClassName='bg-gray-500 backdrop-blur-sm' // Custom overlay
      >
        <div className='flex h-full flex-col'>
          <MultiStepModal.Header className='bg-muted/30 border-b p-6' />

          <div className='flex-1 px-6 py-8'>
            <MultiStepModal.Step id='profile' title='Step 1: Your Profile' description='Tell us a bit about yourself'>
              <div className='flex flex-col items-center justify-center gap-24 text-center'>
                <div className='bg-primary/10 flex size-80 items-center justify-center rounded-full shadow-inner'>
                  <User className='text-primary size-40' />
                </div>
                <div>
                  <h3 className='text-20 font-bold'>Profile Setup</h3>
                  <p className='text-muted-foreground text-15 mx-auto mt-8 max-w-[300px] leading-relaxed'>
                    Customize your identity in Zention. First impressions matter!
                  </p>
                </div>
              </div>
            </MultiStepModal.Step>

            <MultiStepModal.Step
              id='preferences'
              title='Step 2: Preferences'
              description='Help us personalize your experience'
            >
              <div className='flex flex-col items-center justify-center gap-24 text-center'>
                <div className='bg-zention-orange/10 flex size-80 items-center justify-center rounded-full shadow-inner'>
                  <Settings className='text-zention-orange size-40' />
                </div>
                <div>
                  <h3 className='text-20 font-bold'>Configuration</h3>
                  <p className='text-muted-foreground text-15 mx-auto mt-8 max-w-[300px] leading-relaxed'>
                    Adjust notifications and accessibility settings to fit your workflow.
                  </p>
                </div>
              </div>
            </MultiStepModal.Step>

            <MultiStepModal.Step id='welcome' title='Step 3: Ready to go!' description='Everything is set up'>
              <div className='flex flex-col items-center justify-center gap-24 text-center'>
                <div className='bg-zention-green/10 flex size-80 animate-bounce items-center justify-center rounded-full shadow-inner'>
                  <Sparkles className='text-zention-green size-40' />
                </div>
                <div>
                  <h3 className='text-20 font-bold'>Welcome Aboard!</h3>
                  <p className='text-muted-foreground text-15 mx-auto mt-8 max-w-[300px] leading-relaxed'>
                    Your workspace is ready. Click complete to start exploring Zention.
                  </p>
                </div>
              </div>
            </MultiStepModal.Step>
          </div>

          <div className='bg-muted/10 space-y-24 border-t p-24'>
            <MultiStepModal.Progress variant='dots' />
            <MultiStepModal.Navigation completeLabel='Complete Setup' className='border-0 bg-transparent p-0' />
          </div>
        </div>
      </MultiStepModal>
    </div>
  );
}
