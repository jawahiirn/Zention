'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogOut, Rocket, Settings, Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Stepper, StepperContent, StepperNext, StepperPrevious, useStepper } from '@/components/primitives/stepper';

const STEPS = ['purpose', 'preferences', 'welcome'] as const;

function StepIndicator() {
  const { steps, currentStep } = useStepper();
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <div
          key={step}
          className={`size-2 rounded-full transition-all duration-300 ${
            step === currentStep
              ? 'bg-primary scale-125'
              : i < currentIndex
                ? 'bg-primary/60'
                : 'bg-muted-foreground/25'
          }`}
        />
      ))}
    </div>
  );
}

function StepHeader() {
  const { currentStep } = useStepper();

  const headers: Record<string, { title: string; description: string }> = {
    purpose: {
      title: 'What will you use this Space for?',
      description: '',
    },
    preferences: { title: 'Step 2: Preferences', description: 'Help us personalize your experience' },
    welcome: { title: 'Step 3: Ready to go!', description: 'Everything is set up' },
  };

  const header = headers[currentStep];
  if (!header) return null;

  return (
    <DialogHeader className={'p-6 sm:p-10'}>
      <DialogTitle className={'text-2xl font-semibold'}>{header.title}</DialogTitle>
      <DialogDescription className={'text-base text-accent-foreground'}>{header.description}</DialogDescription>
    </DialogHeader>
  );
}

function StepNavigation() {
  const { isFirst, isLast } = useStepper();

  return (
    <div className="flex justify-between">
      <StepperPrevious asChild>
        <Button variant="outline" className={isFirst ? 'invisible' : ''}>
          <ArrowLeft />
          Back
        </Button>
      </StepperPrevious>

      <StepperNext asChild>
        <Button>
          {isLast ? 'Complete Setup' : 'Continue'}
          {isLast ? <Check /> : <ArrowRight />}
        </Button>
      </StepperNext>
    </div>
  );
}

const purposeOptions = ['Work', 'School', 'Personal'];

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
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-black">Welcome to Zention!</h1>
        <p className="text-muted-foreground max-w-sm">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-full md:max-w-7xl h-dvh sm:h-[70vh] sm:max-h-[70vh] rounded-2xl flex flex-col p-0 overflow-hidden"
        >
          <Stepper steps={[...STEPS]} onComplete={handleComplete} className="flex flex-col h-full">
            <StepHeader />

            <StepperContent
              value="purpose"
              className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
                {purposeOptions.map((purpose) => {
                  return (
                    <Button
                      key={purpose}
                      variant="default"
                      className="flex flex-col rounded-xl h-15 gap-4 text-xl font-semibold transition-all hover:border-primary  hover:scale-[1.02]"
                    >
                      {purpose}
                    </Button>
                  );
                })}
              </div>
            </StepperContent>

            <StepperContent value="preferences" className="flex-1 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4">
                <div className="flex size-24 items-center justify-center rounded-3xl bg-orange-500/10 shadow-inner">
                  <Settings className="size-12 text-orange-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Configuration</h3>
                  <p className="text-muted-foreground text-lg max-w-md">
                    Adjust settings to fit your workflow perfectly.
                  </p>
                </div>
              </div>
            </StepperContent>

            <StepperContent value="welcome" className="flex-1 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4">
                <div className="flex size-24 items-center justify-center rounded-3xl bg-green-500/10 shadow-inner">
                  <Sparkles className="size-12 text-green-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Welcome Aboard!</h3>
                  <p className="text-muted-foreground text-lg max-w-md">
                    Your workspace is ready. Click complete to start your journey.
                  </p>
                </div>
              </div>
            </StepperContent>

            <div className="p-3 sm:px-5 sm:py-3 border-t border-border/40">
              <StepIndicator />
              <StepNavigation />
            </div>
          </Stepper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
