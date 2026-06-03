import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { StepperNext, StepperPrevious, useStepper } from '@/components/primitives/stepper';
import { Button } from '@/components/ui/button';

export function StepNavigation({ isFormValid, isPending }: { isFormValid: boolean; isPending?: boolean }) {
  const { isFirst, isLast } = useStepper();

  return (
    <div className="flex justify-between">
      <StepperPrevious asChild>
        <Button variant="outline" className={isFirst ? 'invisible' : 'h-12 text-lg rounded-xl'}>
          <ArrowLeft />
          Back
        </Button>
      </StepperPrevious>
      <StepperNext asChild disabled={isLast && (!isFormValid || isPending)}>
        <Button className="h-12 text-lg rounded-xl" disabled={isPending}>
          {isPending ? <Loader2 className="size-5 animate-spin" /> : isLast ? <Check /> : <ArrowRight />}
          {isPending ? 'Creating...' : isLast ? 'Complete Setup' : 'Continue'}
        </Button>
      </StepperNext>
    </div>
  );
}
