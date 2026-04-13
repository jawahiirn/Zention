'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Stepper, StepperContent, StepperNext } from '@/components/primitives/stepper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { ONBOARDING_STEPS, PURPOSE_OPTIONS } from '../config/onboarding.config';
import { onboardingSchema } from '../schemas/onboarding.schema';
import type { OnboardingValues } from '../types/request';
import { StepHeader } from './step-header';
import { StepNavigation } from './step-navigation';

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
    mode: 'onBlur',
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

  const purposeContent = useMemo(
    () => (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {PURPOSE_OPTIONS.map((option) => (
          <StepperNext key={option.id} asChild>
            <Button
              variant="default"
              onClick={() => form.setValue('purpose', option.id, { shouldValidate: true })}
              className="flex flex-col rounded-xl h-15 gap-4 text-xl font-semibold transition-all hover:border-primary hover:scale-[1.02]"
            >
              {option.label}
            </Button>
          </StepperNext>
        ))}
      </div>
    ),
    [form]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className="max-w-full md:max-w-7xl h-dvh sm:h-[70vh] sm:max-h-[70vh] rounded-2xl flex flex-col p-0 overflow-hidden"
      >
        <Stepper steps={steps} onComplete={form.handleSubmit(handleComplete)} className="flex flex-col h-full">
          <StepHeader />

          <StepperContent
            value="purpose"
            className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 p-6 sm:p-10"
          >
            {purposeContent}
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
                className={cn(
                  'focus-visible:border-primary! focus-visible:ring-primary/30! focus-visible:ring-[3px] h-15 sm:w-[60%] rounded-xl placeholder:text-lg text-lg! border-gray-400',
                  form.formState.errors.spaceName &&
                    'border-destructive focus-visible:border-destructive! focus-visible:ring-destructive/30!'
                )}
              />
              {form.formState.errors.spaceName && (
                <p className="text-destructive text-sm mt-2">{form.formState.errors.spaceName.message}</p>
              )}
            </div>
          </StepperContent>

          <div className="p-3 sm:px-5 sm:py-3 border-t border-border/40">
            <StepNavigation isFormValid={form.formState.isValid} />
          </div>
        </Stepper>
      </DialogContent>
    </Dialog>
  );
}
