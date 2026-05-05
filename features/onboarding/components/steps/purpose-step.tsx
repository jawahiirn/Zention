'use client';

import { useFormContext } from 'react-hook-form';
import { StepperNext } from '@/components/primitives/stepper';
import { Button } from '@/components/ui/button';
import { PURPOSE_OPTIONS } from '../../config/onboarding.config';
import type { OnboardingValues } from '../../types/request';

export function PurposeStep() {
  const { setValue } = useFormContext<OnboardingValues>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
      {PURPOSE_OPTIONS.map((option) => (
        <StepperNext key={option.id} asChild>
          <Button
            variant="default"
            onClick={() => setValue('purpose', option.id, { shouldValidate: true })}
            className="flex flex-col rounded-xl h-15 gap-4 text-xl font-semibold transition-all hover:border-primary hover:scale-[1.02]"
          >
            {option.label}
          </Button>
        </StepperNext>
      ))}
    </div>
  );
}
