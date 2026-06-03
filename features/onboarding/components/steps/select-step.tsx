'use client';

import { useFormContext } from 'react-hook-form';
import { StepperNext } from '@/components/primitives/stepper';
import { Button } from '@/components/ui/button';
import type { OnboardingConfig } from '@/services/types';
import type { OnboardingValues } from '../../types/request';

interface SelectStepProps {
  step: OnboardingConfig['steps'][number];
}

export function SelectStep({ step }: SelectStepProps) {
  const { setValue } = useFormContext<OnboardingValues>();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
      {step.options.map((option) => (
        <StepperNext key={option.value} asChild>
          <Button
            variant="default"
            onClick={() => setValue(step.id, option.value, { shouldValidate: true })}
            className="flex flex-col rounded-xl h-15 gap-4 text-xl font-semibold transition-all hover:border-primary hover:scale-[1.02]"
          >
            {option.label}
          </Button>
        </StepperNext>
      ))}
    </div>
  );
}
