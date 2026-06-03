import { z } from 'zod';
import type { OnboardingConfig } from '@/services/types';

export function buildOnboardingSchema(steps: OnboardingConfig['steps']) {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const step of steps) {
    if (step.required) {
      shape[step.id] = z.string().min(1, `${step.label} is required`);
    } else {
      shape[step.id] = z.string().optional();
    }
  }

  const emailSchema = z.string().email();
  shape.inviteEmails = z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const emails = val.split(/[,\s]+/).filter(Boolean);
        return emails.every((email) => emailSchema.safeParse(email).success);
      },
      { message: 'One or more email addresses are invalid' }
    );
  shape.spaceName = z.string().min(1, 'Workspace name is required');

  return z.object(shape);
}
