'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Cookies from 'js-cookie';
import { LogOut, Rocket, ArrowLeft, ArrowRight, Check } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Stepper, StepperContent, StepperNext, StepperPrevious, useStepper } from '@/components/primitives/stepper';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';

const STEPS = ['purpose', 'invite', 'space-name'] as const;

const onboardingSchema = z.object({
  purpose: z.string().min(1),
  inviteEmails: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const emails = val.split(/[,\s]+/).filter(Boolean);
        return emails.every((email) => z.string().email().safeParse(email).success);
      },
      { message: 'One or more email addresses are invalid' }
    ),
  spaceName: z.string().min(2),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

const purposeOptions = ['Work', 'School', 'Personal'];

function StepHeader() {
  const { currentStep } = useStepper();

  const headers: Record<string, { title: string; description: string }> = {
    purpose: { title: 'What will you use this Space for?', description: '' },
    invite: { title: 'Invite people to your Space', description: '' },
    'space-name': { title: 'Lastly! What would you like to name your Space', description: '' },
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

function StepNavigation({ isFormValid }: { isFormValid: boolean }) {
  const { isFirst, isLast, currentStep } = useStepper();

  return (
    <div className="flex justify-between">
      <StepperPrevious asChild>
        <Button variant="outline" className={isFirst ? 'invisible' : 'h-12 text-lg rounded-xl'}>
          <ArrowLeft />
          Back
        </Button>
      </StepperPrevious>

      <StepperNext asChild disabled={currentStep === 'space-name' && !isFormValid}>
        <Button className={'h-12 text-lg rounded-xl'}>
          {isLast ? 'Complete Setup' : currentStep === 'invite' ? 'Skip' : 'Next'}
          {isLast ? <Check /> : <ArrowRight />}
        </Button>
      </StepperNext>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      purpose: '',
      inviteEmails: '',
      spaceName: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const handleLogout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('has_onboarded');
    router.refresh();
    router.push('/');
  };

  const handleComplete = (data: OnboardingValues) => {};

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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-full md:max-w-7xl h-dvh sm:h-[70vh] sm:max-h-[70vh] rounded-2xl flex flex-col p-0 overflow-hidden"
        >
          <Stepper steps={[...STEPS]} onComplete={form.handleSubmit(handleComplete)} className="flex flex-col h-full">
            <StepHeader />

            <StepperContent
              value="purpose"
              className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
                {purposeOptions.map((purpose) => (
                  <StepperNext key={purpose} asChild>
                    <Button
                      variant="default"
                      onClick={() => form.setValue('purpose', purpose, { shouldValidate: true })}
                      className="flex flex-col rounded-xl h-15 gap-4 text-xl font-semibold transition-all hover:border-primary hover:scale-[1.02]"
                    >
                      {purpose}
                    </Button>
                  </StepperNext>
                ))}
              </div>
            </StepperContent>

            <StepperContent value="invite" className="flex-1 flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4 w-full">
                <Input
                  {...form.register('inviteEmails')}
                  placeholder={'Enter email addresses (or paste multiple)'}
                  className={cn(
                    'focus-visible:border-primary! focus-visible:ring-primary/30! focus-visible:ring-[3px] h-15 sm:w-[60%] rounded-xl placeholder:text-lg text-lg! border-gray-400',
                    form.formState.errors.inviteEmails &&
                      'border-destructive focus-visible:border-destructive! focus-visible:ring-destructive/30!'
                  )}
                />
                {form.formState.errors.inviteEmails && (
                  <p className="text-destructive text-sm mt-2">{form.formState.errors.inviteEmails.message}</p>
                )}
              </div>
            </StepperContent>

            <StepperContent value="space-name" className="flex-1 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4 w-full">
                <Input
                  {...form.register('spaceName')}
                  placeholder={`E.g: Jawahiir's Space`}
                  className={
                    'focus-visible:border-primary! focus-visible:ring-primary/30! focus-visible:ring-[3px] h-15 sm:w-[60%] rounded-xl placeholder:text-lg text-lg border-gray-400'
                  }
                />
              </div>
            </StepperContent>

            <div className="p-3 sm:px-5 sm:py-3 border-t border-border/40">
              <StepNavigation isFormValid={form.formState.isValid} />
            </div>
          </Stepper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
