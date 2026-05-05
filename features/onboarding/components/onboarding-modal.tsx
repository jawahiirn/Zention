'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Stepper, StepperContent } from '@/components/primitives/stepper';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ONBOARDING_STEPS } from '../config/onboarding.config';
import { onboardingSchema } from '../schemas/onboarding.schema';
import type { OnboardingValues } from '../types/request';
import { StepHeader } from './step-header';
import { StepNavigation } from './step-navigation';
import { InviteStep } from './steps/invite-step';
import { PurposeStep } from './steps/purpose-step';
import { SpaceNameStep } from './steps/space-name-step';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: (data: OnboardingValues) => void;
  showCloseButton?: boolean;
}

export function OnboardingModal({ open, onOpenChange, onComplete, showCloseButton = false }: OnboardingModalProps) {
  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      purpose: '',
      inviteEmails: '',
      spaceName: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleComplete = useCallback(
    (data: OnboardingValues) => {
      onComplete?.(data);
      onOpenChange(false);
    },
    [onComplete, onOpenChange]
  );

  const steps = useMemo(() => [...ONBOARDING_STEPS], []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className="max-w-full md:max-w-7xl h-dvh sm:h-[70vh] sm:max-h-[70vh] rounded-2xl flex flex-col p-0 overflow-hidden"
      >
        <FormProvider {...form}>
          <Stepper steps={steps} onComplete={form.handleSubmit(handleComplete)} className="flex flex-col h-full">
            <StepHeader />

            <StepperContent
              value="purpose"
              className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 p-6 sm:p-10"
            >
              <PurposeStep />
            </StepperContent>

            <StepperContent value="invite" className="flex-1 flex flex-col items-center justify-center w-full">
              <InviteStep />
            </StepperContent>

            <StepperContent value="space-name" className="flex-1 flex flex-col items-center justify-center">
              <SpaceNameStep />
            </StepperContent>

            <div className="p-3 sm:px-5 sm:py-3 border-t border-border/40">
              <StepNavigation isFormValid={form.formState.isValid} />
            </div>
          </Stepper>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
