'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { FormProvider, type Resolver, useForm } from 'react-hook-form';
import { Stepper, StepperContent } from '@/components/primitives/stepper';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { workspaceQueries } from '@/services/modules/workspace';
import type { OnboardingConfig, OnboardingStep } from '@/services/types';
import { buildOnboardingSchema } from '../schemas/onboarding.schema';
import type { OnboardingValues } from '../types/request';
import { StepHeader } from './step-header';
import { StepNavigation } from './step-navigation';
import { InviteStep } from './steps/invite-step';
import { SelectStep } from './steps/select-step';
import { WorkspaceNameStep } from './steps/workspace-name-step';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: (data: OnboardingValues) => Promise<void>;
  showCloseButton?: boolean;
  isPending?: boolean;
}

const TAIL_STEP_IDS = ['invite', 'space-name'] as const;

function renderStepContent(step: OnboardingStep) {
  switch (step.type) {
    case 'select':
      return <SelectStep step={step} />;
    default:
      return (
        <div className="flex items-center justify-center text-muted-foreground">
          Step type &quot;{step.type}&quot; is not yet supported.
        </div>
      );
  }
}

function OnboardingForm({
  config,
  onComplete,
  onOpenChange,
  isPending,
}: {
  config: OnboardingConfig;
  onComplete?: (data: OnboardingValues) => Promise<void>;
  onOpenChange: (open: boolean) => void;
  isPending?: boolean;
}) {
  const allStepIds = useMemo(() => [...config.steps.map((s) => s.id), ...TAIL_STEP_IDS], [config]);

  const schema = useMemo(() => buildOnboardingSchema(config.steps), [config]);

  const defaultValues = useMemo(() => {
    const vals: Record<string, string> = {};
    for (const step of config.steps) vals[step.id] = '';
    vals.inviteEmails = '';
    vals.spaceName = '';
    return vals;
  }, [config]);

  const form = useForm<OnboardingValues>({
    resolver: zodResolver(schema) as Resolver<OnboardingValues>,
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleComplete = useCallback(
    async (data: OnboardingValues) => {
      try {
        await onComplete?.(data);
        onOpenChange(false);
      } catch {
        // API call failed — keep modal open so user can retry
      }
    },
    [onComplete, onOpenChange]
  );

  return (
    <FormProvider {...form}>
      <Stepper steps={allStepIds} onComplete={form.handleSubmit(handleComplete)} className="flex flex-col h-full">
        <StepHeader steps={config.steps} />

        {config.steps.map((step) => (
          <StepperContent
            key={step.id}
            value={step.id}
            className="flex-1 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 p-6 sm:p-10"
          >
            {renderStepContent(step)}
          </StepperContent>
        ))}

        <StepperContent value="invite" className="flex-1 flex flex-col items-center justify-center w-full">
          <InviteStep />
        </StepperContent>

        <StepperContent value="space-name" className="flex-1 flex flex-col items-center justify-center">
          <WorkspaceNameStep />
        </StepperContent>

        <div className="p-3 sm:px-5 sm:py-3 border-t border-border/40">
          <StepNavigation isFormValid={form.formState.isValid} isPending={isPending} />
        </div>
      </Stepper>
    </FormProvider>
  );
}

export function OnboardingModal({
  open,
  onOpenChange,
  onComplete,
  showCloseButton = false,
  isPending,
}: OnboardingModalProps) {
  const { data: allConfigs, isLoading } = useQuery(workspaceQueries.config());
  const defaultConfigItem = allConfigs?.find((c) => c.key === 'default');
  const config = defaultConfigItem?.key === 'default' ? defaultConfigItem.config : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={showCloseButton}
        className="max-w-full md:max-w-7xl h-dvh sm:h-[70vh] sm:max-h-[70vh] rounded-2xl flex flex-col p-0 overflow-hidden"
      >
        {isLoading || !config ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <OnboardingForm config={config} onComplete={onComplete} onOpenChange={onOpenChange} isPending={isPending} />
        )}
      </DialogContent>
    </Dialog>
  );
}
