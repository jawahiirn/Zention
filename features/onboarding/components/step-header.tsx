import { useStepper } from '@/components/primitives/stepper';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ONBOARDING_METADATA } from '@/features/onboarding/config/onboarding.config';

export function StepHeader() {
  const { currentStep } = useStepper();
  const header = ONBOARDING_METADATA[currentStep as keyof typeof ONBOARDING_METADATA];

  if (!header) return null;
  if (!header) return null;

  return (
    <DialogHeader className={'p-6 sm:p-10'}>
      <DialogTitle className={'text-2xl font-semibold'}>{header.title}</DialogTitle>
      <DialogDescription className={'text-base text-accent-foreground'}>{header.description}</DialogDescription>
    </DialogHeader>
  );
}
