import { useStepper } from '@/components/primitives/stepper';
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { OnboardingConfig } from '@/services/types';

const TAIL_METADATA: Record<string, { title: string; description: string }> = {
  invite: { title: 'Invite people to your Space', description: 'Collaboration is better together.' },
  'space-name': { title: 'Name your Workspace', description: 'Pick something catchy and recognizable.' },
};

interface StepHeaderProps {
  steps: OnboardingConfig['steps'];
}

export function StepHeader({ steps }: StepHeaderProps) {
  const { currentStep } = useStepper();

  const configStep = steps.find((s) => s.id === currentStep);
  const tailStep = TAIL_METADATA[currentStep];

  const title = configStep?.label ?? tailStep?.title;
  const description = configStep?.shortDescription ?? tailStep?.description;

  if (!title) return null;

  return (
    <DialogHeader className="p-6 sm:p-10">
      <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
      {description && <DialogDescription className="text-base text-accent-foreground">{description}</DialogDescription>}
    </DialogHeader>
  );
}
