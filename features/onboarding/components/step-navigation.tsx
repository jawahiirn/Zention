import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { StepperNext, StepperPrevious, useStepper } from '@/components/primitives/stepper';
import { Button } from '@/components/ui/button';

export function StepNavigation({ isFormValid }: { isFormValid: boolean }) {
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
          {isLast ? 'Complete Setup' : currentStep === 'invite' ? 'Continue' : 'Next'}
          {isLast ? <Check /> : <ArrowRight />}
        </Button>
      </StepperNext>
    </div>
  );
}
