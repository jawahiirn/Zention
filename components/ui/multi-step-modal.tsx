'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { MultiStepControls, useMultiStep } from '@/shared/hooks/use-multi-step';
import { VisuallyHidden } from '@/components/ui/visually-hidden';

interface StepConfig {
  id: string;
  title?: string;
  description?: string;
  canProceed?: () => boolean | Promise<boolean>;
}

interface MultiStepModalContextValue extends MultiStepControls {
  registerStep: (config: StepConfig) => void;
  unregisterStep: (id: string) => void;
  metadata: Map<string, StepConfig>;
}

const MultiStepModalContext = React.createContext<MultiStepModalContextValue | null>(null);

function useMultiStepModal(): MultiStepModalContextValue {
  const context = React.useContext(MultiStepModalContext);
  if (!context) {
    throw new Error('useMultiStepModal must be used within <MultiStepModal>');
  }
  return context;
}

const STEP_MARKER = Symbol.for('MultiStepModal.Step');

interface StepProps {
  id: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  canProceed?: () => boolean | Promise<boolean>;
}

function Step({ id, title, description, children, className, canProceed }: StepProps) {
  const { registerStep, unregisterStep, currentStepId } = useMultiStepModal();

  React.useEffect(() => {
    registerStep({ id, title, description, canProceed });
    return () => unregisterStep(id);
  }, [id, title, description, canProceed, registerStep, unregisterStep]);

  const isActive = currentStepId === id;

  return (
    <div
      data-slot='multi-step-content'
      style={{ display: isActive ? undefined : 'none' }}
      className={cn('flex flex-col gap-4', isActive && 'animate-in fade-in-0 duration-200', className)}
    >
      {children}
    </div>
  );
}

// Marker for filtering
(Step as unknown as Record<symbol, boolean>)[STEP_MARKER] = true;
Step.displayName = 'MultiStepModal.Step';

function isStepElement(child: React.ReactNode): child is React.ReactElement<StepProps> {
  return React.isValidElement(child) && (child.type as unknown as Record<symbol, boolean>)[STEP_MARKER];
}

/**
 * Recursively find all Step IDs in the children tree to preserve JSX order
 * even if steps are wrapped in divs, fragments, or other containers.
 */
function getStepIds(children: React.ReactNode): string[] {
  const ids: string[] = [];
  React.Children.forEach(children, (child) => {
    if (!child || !React.isValidElement(child)) return;

    if (isStepElement(child)) {
      const stepChild = child as React.ReactElement<StepProps>;
      ids.push(stepChild.props.id);
    } else if (child.props && (child.props as any).children) {
      ids.push(...getStepIds((child.props as any).children));
    }
  });
  return ids;
}

interface HeaderProps {
  className?: string;
}

function Header({ className }: HeaderProps) {
  const { currentStepId, metadata } = useMultiStepModal();
  const activeMetadata = metadata.get(currentStepId);

  if (!activeMetadata || (!activeMetadata.title && !activeMetadata.description)) return null;

  return (
    <DialogHeader className={className}>
      {activeMetadata.title && <DialogTitle>{activeMetadata.title}</DialogTitle>}
      {activeMetadata.description && <DialogDescription>{activeMetadata.description}</DialogDescription>}
    </DialogHeader>
  );
}

Header.displayName = 'MultiStepModal.Header';

interface ProgressProps {
  className?: string;
  variant?: 'bar' | 'dots';
}

function Progress({ className, variant = 'bar' }: ProgressProps) {
  const { currentStepId, stepIds, metadata } = useMultiStepModal();
  const currentIndex = stepIds.indexOf(currentStepId);

  if (stepIds.length === 0) return null;

  if (variant === 'dots') {
    return (
      <div data-slot='multi-step-progress' className={cn('flex items-center justify-center gap-2', className)}>
        {stepIds.map((id, i) => (
          <div
            key={id}
            className={cn(
              'size-2 rounded-full transition-all duration-300',
              id === currentStepId
                ? 'bg-primary scale-125'
                : i < currentIndex
                  ? 'bg-primary/60'
                  : 'bg-muted-foreground/25'
            )}
            role='presentation'
            aria-label={`Step ${i + 1} of ${stepIds.length}: ${metadata.get(id)?.title || id}`}
            aria-current={id === currentStepId ? 'step' : undefined}
          />
        ))}
      </div>
    );
  }

  return (
    <div data-slot='multi-step-progress' className={cn('flex items-center gap-1.5', className)}>
      {stepIds.map((id, i) => (
        <div
          key={id}
          className={cn(
            'h-1 flex-1 rounded-full transition-all duration-300',
            i <= currentIndex ? 'bg-primary' : 'bg-muted'
          )}
        />
      ))}
    </div>
  );
}

Progress.displayName = 'MultiStepModal.Progress';

interface NavigationProps {
  className?: string;
  backLabel?: string;
  nextLabel?: string;
  completeLabel?: string;
  showIcons?: boolean;
}

function Navigation({
  className,
  backLabel = 'Back',
  nextLabel = 'Continue',
  completeLabel = 'Complete',
  showIcons = true,
}: NavigationProps) {
  const { isFirst, isLast, next, back, stepIds, isValidating } = useMultiStepModal();

  if (stepIds.length === 0) return null;

  return (
    <DialogFooter
      data-slot='multi-step-navigation'
      className={cn('flex-row justify-between sm:justify-between', className)}
    >
      <Button
        variant='outline'
        onClick={back}
        disabled={isFirst || isValidating}
        className={cn(isFirst && 'invisible')}
      >
        {showIcons && <ArrowLeft />}
        {backLabel}
      </Button>
      <Button onClick={next} disabled={isValidating}>
        {isValidating ? <Loader2 className='animate-spin' /> : isLast ? completeLabel : nextLabel}
        {!isValidating && showIcons && (isLast ? <Check /> : <ArrowRight />)}
      </Button>
    </DialogFooter>
  );
}

Navigation.displayName = 'MultiStepModal.Navigation';

interface MultiStepModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string; // Content className
  overlayClassName?: string;
  initialStepId?: string;
  onStepChange?: (stepId: string) => void;
  onComplete?: () => void;
  showCloseButton?: boolean;
  resetOnClose?: boolean;
}

function MultiStepModalRoot({
  open,
  onOpenChange,
  children,
  className,
  overlayClassName,
  initialStepId,
  onStepChange,
  onComplete,
  showCloseButton = true,
  resetOnClose = true,
}: MultiStepModalProps) {
  const [metadata, setMetadata] = React.useState<Map<string, StepConfig>>(new Map());

  const registerStep = React.useCallback((config: StepConfig) => {
    setMetadata((prev) => {
      const nextMap = new Map(prev);
      nextMap.set(config.id, config);
      return nextMap;
    });
  }, []);

  const unregisterStep = React.useCallback((id: string) => {
    setMetadata((prev) => {
      const nextMap = new Map(prev);
      nextMap.delete(id);
      return nextMap;
    });
  }, []);

  // Guarantee order from children via recursive traversal
  const stepIds = React.useMemo(() => getStepIds(children), [children]);

  const onBeforeNext = React.useCallback(
    async (currentId: string) => {
      const config = metadata.get(currentId);
      if (config?.canProceed) {
        return config.canProceed();
      }
      return true;
    },
    [metadata]
  );

  const controls = useMultiStep({
    stepIds,
    initialStepId,
    onComplete,
    onStepChange,
    onBeforeNext,
  });

  const { reset } = controls;

  // Predictable state lifecycle
  React.useEffect(() => {
    if (!open && resetOnClose) {
      reset();
    }
  }, [open, resetOnClose, reset]);

  return (
    <MultiStepModalContext.Provider value={{ ...controls, registerStep, unregisterStep, metadata }}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn('sm:max-w-md', className)}
          overlayClassName={overlayClassName}
          showCloseButton={showCloseButton}
        >
          {/* Accessibility Title (Required by Radix Dialog) */}
          <VisuallyHidden>
            <DialogTitle>Multi-step process</DialogTitle>
          </VisuallyHidden>

          {children}
        </DialogContent>
      </Dialog>
    </MultiStepModalContext.Provider>
  );
}

MultiStepModalRoot.displayName = 'MultiStepModal';

const MultiStepModal = Object.assign(MultiStepModalRoot, {
  Step,
  Header,
  Progress,
  Navigation,
});

export { MultiStepModal, useMultiStepModal };
export type { MultiStepModalProps, StepProps, ProgressProps, NavigationProps, HeaderProps, StepConfig };
