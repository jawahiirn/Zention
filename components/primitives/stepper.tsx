'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/shared/lib/utils';

interface StepperContextValue {
  steps: string[];
  currentStep: string;
  currentIndex: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  isValidating: boolean;
  progress: number;
  next: () => Promise<void>;
  back: () => void;
  goTo: (step: string) => void;
  reset: () => void;
}

const StepperContext = React.createContext<StepperContextValue | null>(null);

function useStepper(): StepperContextValue {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a <Stepper>');
  }
  return context;
}

interface StepperProps extends React.ComponentProps<'div'> {
  steps: string[];
  defaultValue?: string;
  onValueChange?: (step: string) => void;
  onComplete?: () => void;
  onBeforeNext?: (currentStep: string) => boolean | Promise<boolean>;
  asChild?: boolean;
}

function Stepper({
  steps,
  defaultValue,
  onValueChange,
  onComplete,
  onBeforeNext,
  asChild,
  className,
  children,
  ...props
}: StepperProps) {
  const [currentStep, setCurrentStep] = React.useState(
    () => defaultValue ?? steps[0] ?? ''
  );
  const [isValidating, setIsValidating] = React.useState(false);

  const [prevSteps, setPrevSteps] = React.useState(steps);
  if (JSON.stringify(steps) !== JSON.stringify(prevSteps)) {
    setPrevSteps(steps);
    if (!steps.includes(currentStep)) {
      setCurrentStep(steps[0] ?? '');
    }
  }

  const currentIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSteps - 1;
  const progress = totalSteps > 1 ? (currentIndex / (totalSteps - 1)) * 100 : 100;

  const navigate = React.useCallback(
    (stepId: string) => {
      setCurrentStep(stepId);
      onValueChange?.(stepId);
    },
    [onValueChange]
  );

  const next = React.useCallback(async () => {
    if (onBeforeNext) {
      setIsValidating(true);
      try {
        const allowed = await onBeforeNext(currentStep);
        setIsValidating(false);
        if (!allowed) return;
      } catch {
        setIsValidating(false);
        return;
      }
    }

    if (isLast) {
      onComplete?.();
      return;
    }

    const nextId = steps[currentIndex + 1];
    if (nextId) navigate(nextId);
  }, [currentStep, currentIndex, isLast, steps, onComplete, onBeforeNext, navigate]);

  const back = React.useCallback(() => {
    if (isFirst) return;
    const prevId = steps[currentIndex - 1];
    if (prevId) navigate(prevId);
  }, [currentIndex, isFirst, steps, navigate]);

  const goTo = React.useCallback(
    (stepId: string) => {
      if (steps.includes(stepId)) navigate(stepId);
    },
    [steps, navigate]
  );

  const reset = React.useCallback(() => {
    navigate(defaultValue ?? steps[0] ?? '');
  }, [defaultValue, steps, navigate]);

  const ctx = React.useMemo<StepperContextValue>(
    () => ({
      steps,
      currentStep,
      currentIndex,
      totalSteps,
      isFirst,
      isLast,
      isValidating,
      progress,
      next,
      back,
      goTo,
      reset,
    }),
    [steps, currentStep, currentIndex, totalSteps, isFirst, isLast, isValidating, progress, next, back, goTo, reset]
  );

  const Comp = asChild ? Slot : 'div';

  return (
    <StepperContext.Provider value={ctx}>
      <Comp data-slot="stepper" className={cn(className)} {...props}>
        {children}
      </Comp>
    </StepperContext.Provider>
  );
}

interface StepperContentProps extends React.ComponentProps<'div'> {
  value: string;
  forceMount?: boolean;
  asChild?: boolean;
}

function StepperContent({
  value,
  forceMount = true,
  asChild,
  className,
  children,
  ...props
}: StepperContentProps) {
  const { currentStep } = useStepper();
  const isActive = currentStep === value;

  if (!forceMount && !isActive) return null;

  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="stepper-content"
      data-state={isActive ? 'active' : 'inactive'}
      data-step={value}
      hidden={forceMount && !isActive ? true : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

interface StepperNextProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

function StepperNext({ asChild, onClick, ...props }: StepperNextProps) {
  const { next, isValidating } = useStepper();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) next();
    },
    [next, onClick]
  );

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="stepper-next"
      disabled={isValidating || props.disabled}
      onClick={handleClick}
      {...props}
    />
  );
}

interface StepperPreviousProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
}

function StepperPrevious({ asChild, onClick, ...props }: StepperPreviousProps) {
  const { back, isFirst, isValidating } = useStepper();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) back();
    },
    [back, onClick]
  );

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="stepper-previous"
      disabled={isFirst || isValidating || props.disabled}
      onClick={handleClick}
      {...props}
    />
  );
}

interface StepperTriggerProps extends React.ComponentProps<'button'> {
  value: string;
  asChild?: boolean;
}

function StepperTrigger({ value, asChild, onClick, ...props }: StepperTriggerProps) {
  const { goTo, currentStep, steps } = useStepper();
  const stepIndex = steps.indexOf(value);
  const currentIndex = steps.indexOf(currentStep);
  const isActive = currentStep === value;
  const isCompleted = stepIndex < currentIndex;

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) goTo(value);
    },
    [goTo, value, onClick]
  );

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="stepper-trigger"
      data-state={isActive ? 'active' : isCompleted ? 'completed' : 'inactive'}
      data-step={value}
      aria-current={isActive ? 'step' : undefined}
      onClick={handleClick}
      {...props}
    />
  );
}

export {
  Stepper,
  StepperContent,
  StepperNext,
  StepperPrevious,
  StepperTrigger,
  useStepper,
};

export type {
  StepperProps,
  StepperContentProps,
  StepperNextProps,
  StepperPreviousProps,
  StepperTriggerProps,
  StepperContextValue,
};
