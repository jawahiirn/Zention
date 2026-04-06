'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LogOut, Rocket, User, Settings, Sparkles, ArrowLeft, ArrowRight, Check } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Stepper, StepperContent, StepperNext, StepperPrevious, useStepper } from '@/components/primitives/stepper';

const STEPS = ['profile', 'preferences', 'welcome'] as const;

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
    profile: { title: 'Step 1: Your Profile', description: 'Tell us a bit about yourself' },
    preferences: { title: 'Step 2: Preferences', description: 'Help us personalize your experience' },
    welcome: { title: 'Step 3: Ready to go!', description: 'Everything is set up' },
  };

  const header = headers[currentStep];
  if (!header) return null;

  return (
    <DialogHeader>
      <DialogTitle>{header.title}</DialogTitle>
      <DialogDescription>{header.description}</DialogDescription>
    </DialogHeader>
  );
}

function StepNavigation() {
  const { isFirst, isLast } = useStepper();

  return (
    <div className="flex justify-between pt-4">
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
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <Stepper steps={[...STEPS]} onComplete={handleComplete}>
            <StepHeader />

            <StepperContent value="profile">
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
                <div className="bg-primary/10 flex size-20 items-center justify-center rounded-full">
                  <User className="text-primary size-10" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Profile Setup</h3>
                  <p className="text-muted-foreground mt-1 text-sm">Customize your identity in Zention.</p>
                </div>
              </div>
            </StepperContent>

            <StepperContent value="preferences">
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-orange-500/10">
                  <Settings className="size-10 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Configuration</h3>
                  <p className="text-muted-foreground mt-1 text-sm">Adjust settings to fit your workflow.</p>
                </div>
              </div>
            </StepperContent>

            <StepperContent value="welcome">
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
                <div className="flex size-20 animate-bounce items-center justify-center rounded-full bg-green-500/10">
                  <Sparkles className="size-10 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Welcome Aboard!</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Your workspace is ready. Click complete to start.
                  </p>
                </div>
              </div>
            </StepperContent>

            <StepIndicator />
            <StepNavigation />
          </Stepper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
